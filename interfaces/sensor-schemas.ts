import { RegisterOptions } from "react-hook-form";
import { SensorType } from "./sensor";

// list of available input types
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
    // CUSTOM: special type for groups of inputs
    "group";


export interface SensorMetaFormSchema {
    // key to use from structure
    fieldKey: string,
    // user-friendly name to dislay for input label
    fieldName: string,
    fieldType: FormInputType,
    fieldDetails?: RegisterOptions | SensorMetaFormSchema[]
}

/**
 * Each sensor type will have a form schema,
 * detailed in a list of form input options
 */
export type SensorMetaFormSchemas = {
    [key in SensorType]: SensorMetaFormSchema[]
}

export const sensorMetaFormSchemas: SensorMetaFormSchemas = {
    "temperature": [
        {
            fieldKey: "model",
            fieldName: "Model",
            fieldType: "text",
            fieldDetails: { required: "This is required." }
        },
        {
            fieldKey: "owner",
            fieldName: "Owner",
            fieldType: "text",
        },
        {
            fieldKey: "install_date",
            fieldName: "Installation Date",
            fieldType: "date",
            fieldDetails: { required: "This is required." }
        }, {
            fieldKey: "manufacture_date",
            fieldName: "Manufacture Date",
            fieldType: "date",
            fieldDetails: { required: "This is required." }
        }, {
            fieldKey: "expiry_date",
            fieldName: "Expiration Date",
            fieldType: "date",
        }, {
            fieldKey: "sampling_frequency",
            fieldName: "Sampling Frequency",
            fieldType: "number",
        }, {
            fieldKey: "temperature_range",
            fieldName: "Temperature Range",
            fieldType: "group",
            fieldDetails: [{
                fieldKey: "min",
                fieldName: "Min",
                fieldType: "number",
            }, {
                fieldKey: "max",
                fieldName: "Max",
                fieldType: "number",
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
            }, {
                fieldKey: "max",
                fieldName: "Max",
                fieldType: "number",
            }, {
                fieldKey: "unit",
                fieldName: "Unit",
                fieldType: "text",
            }]
        }, {
            fieldKey: "power_supply_range",
            fieldName: "Power Supply Range",
            fieldType: "group",
            fieldDetails: [{
                fieldKey: "min",
                fieldName: "Min",
                fieldType: "number",
            }, {
                fieldKey: "max",
                fieldName: "Max",
                fieldType: "number",
            }, {
                fieldKey: "unit",
                fieldName: "Unit",
                fieldType: "text",
            }]
        },{
            fieldKey: "ip_rating",
            fieldName: "IP Rating",
            fieldType: "number",
        }],
    "pressure": [
        // add in details here
    ]
};