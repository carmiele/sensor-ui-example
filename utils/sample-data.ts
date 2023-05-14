import { Sensor } from '../interfaces/sensor';


export const sampleSensorData: Sensor[] = [
  { id: 'tp-10001', name: 'Temp-US-West-10001', type: 'temperature', location: { lat: 34.047996, long: -118.252100 }, tags: ['tag1', 'tag2', 'tag3', 'tag4 with-space'], meta: { testKey: 'test value', proximity: '2343' } },
  { id: 'tp-10002', name: 'Temp-US-West-10002', type: 'temperature', location: { lat: 34.047996, long: -118.252403, }, tags: ['tag1'] },
  { id: 'tp-10003', name: 'Temp-US-West-10003', type: 'temperature', location: { lat: 34.023534, long: -118.353400 }, },
  { id: 'tp-10016', name: 'Temp-US-West-10016', type: 'temperature', location: { lat: 34.353534, long: -116.353400 }, tags: ['tag2', 'tag3'] },
];