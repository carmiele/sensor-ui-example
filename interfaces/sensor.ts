export interface Sensor {
    // alphanumeric ID to identify this particular sensor
    id: string
    name: string
    type: SensorType
    tags?: string[]
    location: Coordinates
    // misc metadata associated with sensor
    meta?: SensorMetadata
}

// fixed types for sensors
export type SensorType = 'temperature' | 'pressure';

export type Coordinates = {
    // latitude of GPS coordinate
    lat: number
    // longitude of GPS coordinate
    long: number
}

/***
 * General metadata for all sensor types
 */
export interface SensorMetadata {
    owner?: string, //???
    model?: string,
    install_date?: number, // Unix timestamp
    manufacture_date?: number,
    expiry_date?: number, // can possibly be computed?
    // average number of samples take per second, eg. 3/sec
    sampling_frequency?: number,
}

/**
 * Metadata specific to Temperature Sensors
 */
export interface TemperatureSensorMetadata extends SensorMetadata {
    temperature_range?: SensorRange,
    humidity_range?: SensorRange,
    power_supply_range?: SensorRange,
    // if sensor has it, IP rating for waterproof
    ip_rating?: number
}

export interface TemperatureSensor extends Sensor {
    meta?: TemperatureSensorMetadata
}

/**
 * General range skeleton for a
 * characteristic of a sensor
 */
export interface SensorRange {
    min?: number,
    max?: number,
    unit?: string,
}

export interface SensorMetadataBody {
    sensorId: string,
    meta: SensorMetadata
}