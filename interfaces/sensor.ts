export interface Sensor {
    // alphanumeric ID to identify this particular sensor
    id: string
    name: string
    type: SensorType
    tags?: string[]
    location: Coordinates
    // misc metadata associated with sensor
    meta?: { [key: string]: string }
}

// fixed types for sensors
export type SensorType = 'temperature' | 'accelerometer' | 'pressure';

export type Coordinates = {
    // latitude of GPS coordinate
    lat: number
    // longitude of GPS coordinate
    long: number
}