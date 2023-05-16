import { Dispatch, SetStateAction, useEffect } from "react";
import { Sensor, SensorType } from "../interfaces/sensor";
import { RegisterOptions, useForm } from "react-hook-form";
import { SensorMetaFormSchema, sensorMetaFormSchemas } from "../interfaces/sensor-schemas";
import { InputType } from "zlib";
import { formatDate } from "../utils/utils";

type Props = {
    submitted: boolean,
    setSubmitted: Dispatch<SetStateAction<boolean>>,
    setFormSuccess: Dispatch<SetStateAction<boolean>>,
    sensor: Sensor,
    // form?: 
}

const SensorMetadataForm = ({ submitted, setSubmitted, setFormSuccess, sensor }: Props) => {

    const { register, handleSubmit } = useForm();

    const getDefaultValue = (baseObject: any, key: string, fieldType: InputType) => {
        if (!(key in baseObject)) {
            return '';
        }
        switch (fieldType) {
            case 'date':
                return formatDate(new Date(baseObject[key] * 1000).toISOString());
        }
        return baseObject[key];
    }

    const getSubfieldDefaultValue = (primaryField, subField) => {
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

    useEffect(() => {
        if (submitted) {
            console.log('submitted');
            setFormSuccess(true);

            // reset submission state
            setSubmitted(false);
        }
    }, [submitted]);

    const currentFormSchema = sensorMetaFormSchemas[sensor.type];

    return (<form>
        <h1 className="text-xl pb-3">Edit Sensor Metadata - {sensor.name}</h1>
        {
            currentFormSchema.map((field, key) => (
                (<div key={key} className="w-full py-1">
                    <label className="pr-2 py-2 w-full font-semibold"> {field.fieldName}:</label>
                    <div className={"w-full " + (field.fieldType === "group" ? "flex" : "")}>
                        {field.fieldType === "group" ? (field.fieldDetails as SensorMetaFormSchema[]).map((subField, subKey) => (
                            <div key={subKey} className={"py-2 " + (subKey > 0 && "px-2")}> {subField.fieldName}
                                <input
                                    type={subField.fieldType}
                                    defaultValue={getSubfieldDefaultValue(field, subField) }
                                    className="text-gray-700 bg-gray-200 px-4 py-2 w-full" {...register(`${field.fieldKey} ${subField.fieldKey}`, subField.fieldDetails as RegisterOptions)} />
                            </div>
                        ))
                            : <input type={field.fieldType} defaultValue={getDefaultValue(sensor?.meta, field.fieldKey, field.fieldType)} className="text-gray-700 bg-gray-200 px-4 py-2 w-full" {...register(field.fieldKey, field.fieldDetails as RegisterOptions)} />
                        }
                    </div>
                </div>)
            ))
        }
        {/* { sensor?.meta && Object.entries(sensor?.meta).map((value, key) => (
        <div key={key} className="flex w-full py-1">
            <label className="pr-2 py-2 w-2/5">{ value[0] }:</label> <input type="text" className="text-gray-700 bg-gray-200 px-4 py-2 w-3/5" value={value[1]} onChange={(event)=>inputChangedHandler(event)}/>
        </div>
       ))} */}
    </form>
    )
}

export default SensorMetadataForm