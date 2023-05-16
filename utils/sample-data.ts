import { TemperatureSensor } from '../interfaces/sensor';


export const sampleSensorData: TemperatureSensor[] = [
  {
    id: 'tp-10001', name: 'Temp-US-West-10001', type: 'temperature', location: { lat: 34.047996, long: -118.252100 }, tags: ['tag1', 'tag2', 'tag3', 'tag4 with-space'],
    meta: {
      model: 'TS-AAA123',
      install_date: 1675266677,
      manufacture_date: 1652541704,
      temperature_range: {
        min: 0,
        max: 250,
        unit: 'C'
      },
    }
  },
  { id: 'tp-10002', name: 'Temp-US-West-10002', type: 'temperature', location: { lat: 34.047996, long: -118.252403, }, tags: ['tag1'] },
  { id: 'tp-10003', name: 'Temp-US-West-10003', type: 'temperature', location: { lat: 34.023534, long: -118.353400 }, },
  { id: 'tp-10016', name: 'Temp-US-West-10016', type: 'temperature', location: { lat: 34.353534, long: -116.353400 }, tags: ['tag2', 'tag3'] },
];
