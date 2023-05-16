import { RegisterOptions } from "react-hook-form";
import { SensorType } from './sensor';

export type FormInputType =
    "button" |
    "checkbox" |
    "color" |
    "date" |
    "datetime-local" |
    "email" |
    "file" |
    "hidden" |
    "image" |
    "month" |
    "number" |
    "password" |
    "radio" |
    "range" |
    "reset" |
    "search" |
    "submit" |
    "tel" |
    "text" |
    "time" |
    "url" |
    "week" |
    // special typing for groups of inputs
    "group";


export interface SensorMetaFormSchema {
    // key to use from structure
    fieldKey: string,
    // user-friendly name that goes along with the key
    fieldName: string,
    fieldType: FormInputType,
    fieldDetails?: RegisterOptions | SensorMetaFormSchema[]
}

export type SensorMetaFormSchemas = {
    [key in SensorType]: SensorMetaFormSchema[]
}

export const sensorMetaFormSchemas: SensorMetaFormSchemas = {
    "temperature": [
        {
            fieldKey: "install_date",
            fieldName: "Installation Date",
            fieldType: "date",
            fieldDetails: { required: true }
        }, {
            fieldKey: "temperature_range",
            fieldName: "Temperature Range",
            fieldType: "group",
            fieldDetails: [{
                fieldKey: "min",
                fieldName: "Min",
                fieldType: "number",
                fieldDetails: { valueAsNumber: true, }
            }, {
                fieldKey: "max",
                fieldName: "Max",
                fieldType: "number",
                fieldDetails: { valueAsNumber: true, }
            }, {
                fieldKey: "unit",
                fieldName: "Unit",
                fieldType: "text",
            }]
        }, {
            fieldKey: "humidity_range",
            fieldName: "Humidity Range",
            fieldType: "group",
            fieldDetails: [{
                fieldKey: "min",
                fieldName: "Min",
                fieldType: "number",
                fieldDetails: { valueAsNumber: true, }
            }, {
                fieldKey: "max",
                fieldName: "Max",
                fieldType: "number",
                fieldDetails: { valueAsNumber: true, }
            }, {
                fieldKey: "unit",
                fieldName: "Unit",
                fieldType: "text",
            }]
        }],
    "pressure": []
};