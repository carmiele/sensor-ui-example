import { Dispatch, SetStateAction, useEffect } from "react";
import { Sensor, SensorMetadataBody, SensorType } from "../interfaces/sensor";
import { RegisterOptions, useForm, useFormState } from "react-hook-form";
import { SensorMetaFormSchema, sensorMetaFormSchemas } from "../interfaces/sensor-schemas";
import { InputType } from "zlib";
import { formatDate } from "../utils/utils";
import FormError from "./FormError";

type Props = {
    submitted: boolean,
    setSubmitted: Dispatch<SetStateAction<boolean>>,
    setFormSuccess: Dispatch<SetStateAction<boolean>>,
    sensor: Sensor,
    // form?: 
}

const SensorMetadataForm = ({ submitted, setSubmitted, setFormSuccess, sensor }: Props) => {

    const { register, control, trigger, getValues } = useForm();

    const { isValid, errors } = useFormState({
        control
    });

    const getPrimaryDefaultValue = (baseObject: any, key: string, fieldType: InputType) => {
        if (!baseObject || !(key in baseObject)) {
            return '';
        }
        switch (fieldType) {
            case 'date':
                return formatDate(new Date(baseObject[key] * 1000).toISOString());
        }
        return baseObject[key];
    }

    const getSubDefaultValue = (primaryField, subField) => {
        if (!sensor?.meta) {
            return "";
        }
        if (!(primaryField.fieldKey in sensor?.meta)) {
            return "";
        }

        if (!(subField.fieldKey in sensor?.meta[primaryField.fieldKey])) {
            return "";
        }
        return sensor?.meta[primaryField.fieldKey][subField.fieldKey];
    }

    const getSubfieldKey = (primaryField, subField): string => `${primaryField.fieldKey}#${subField.fieldKey}`;

    const validateInput = (formName: string) => {
        trigger(formName);
    }

    const handleFormSubmission = async () => {
        if (submitted) {
            // trigger validation of all form fields
            trigger();

            console.log(errors, isValid);

            if (isValid) {
                console.log('values', getValues());

                const formValues = transformFormMeta(getValues());

                const requestBody: SensorMetadataBody = {
                    sensorId: sensor.id,
                    meta: formValues,
                };

                const requestOptions = {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                };

                // make API call
                try {
                    const response = await fetch(`/api/sensors/meta`, requestOptions);
                    if (response.ok) {
                        setFormSuccess(true);
                    }
                } catch (e) {
                    setFormSuccess(false);
                }
            }

            // reset submission state
            setSubmitted(false);
        }
    }

    // handle form submission
    useEffect(() => {
        handleFormSubmission();
    }, [submitted]);

    const transformFormMeta = (formValues: { [key: string]: any }) => {
        for (const [key, value] of Object.entries(formValues)) {
            const keyGroup = key.split("#");

            if (keyGroup.length > 1) {
                if (!(keyGroup[0] in formValues)) {
                    formValues[keyGroup[0]] = {};
                }
                // create grouped object for metadata
                formValues[keyGroup[0]][keyGroup[1]] = value;

                // remove original, concatenated form value
                delete formValues[key];
            }
        }

        return formValues;
    }

    const currentFormSchema = sensorMetaFormSchemas[sensor.type];

    return (<form>
        <h1 className="text-xl pb-3">Edit Sensor Metadata - {sensor.name}</h1>
        {
            currentFormSchema.map((field, key) => (
                (<div key={key} className="w-full py-1">
                    <label className="pr-2 py-2 w-full font-semibold"> {field.fieldName}:
                        {
                            (field?.fieldDetails as RegisterOptions)?.required && <span className="font-semibold">*</span>
                        }
                    </label>
                    <div className={"w-full " + (field.fieldType === "group" ? "flex" : "")}>
                        {field.fieldType === "group" ? (field.fieldDetails as SensorMetaFormSchema[]).map((subField, subKey) => (
                            <div key={subKey} className={"pt-1 pb-2" + (subKey > 0 ? " px-2" : " pr-2")}> {subField.fieldName}
                                <input
                                    type={subField.fieldType}
                                    defaultValue={getSubDefaultValue(field, subField)}
                                    className="text-gray-700 bg-gray-200 px-4 py-2 w-full" {...register(getSubfieldKey(field, subField), subField.fieldDetails as RegisterOptions)}
                                    onBlur={() => validateInput(getSubfieldKey(field, subField))}
                                />
                                {(getSubfieldKey(field, subField) in errors) && <FormError error={errors[getSubfieldKey(field, subField)]} />}
                            </div>
                        ))
                            : <div>
                                <input type={field.fieldType} defaultValue={getPrimaryDefaultValue(sensor?.meta, field.fieldKey, field.fieldType)} className={"text-gray-700 bg-gray-200 px-4 py-2 w-full rounded-sm" + ((field.fieldKey in errors) ? " border-2 border-red-500" : '')}
                                    {...register(field.fieldKey, field.fieldDetails as RegisterOptions)}
                                    onBlur={() => validateInput(field.fieldKey)} />
                                {
                                    (field.fieldKey in errors) && <FormError error={errors[field.fieldKey]} />
                                }
                            </div>
                        }
                    </div>
                </div>)
            ))
        }
    </form>
    )
}

export default SensorMetadataForm