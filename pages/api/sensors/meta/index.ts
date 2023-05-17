import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { Sensor, SensorMetadataBody } from "../../../../interfaces/sensor";


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === 'PUT' || _req.method === 'POST') {
    try {
      const jsonDirectory = path.join(process.cwd(), 'json');
      const filePath = jsonDirectory + '/sensor-data.json';
      const file = await fs.readFile(filePath, 'utf8');

      if (!file) {
        throw new Error('Cannot find sensor data');
      }

      const allSensors: { [id: string]: Sensor } = JSON.parse(file);

      const body: SensorMetadataBody = _req.body;

      if (!(body.sensorId in allSensors)) {
        res.status(404).json({ message: 'cannot find content'});
      }

      allSensors[body.sensorId].meta = body.meta;

      fs.writeFile(filePath, JSON.stringify(allSensors));

      res.status(200).json({ ok: true });
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  }
}

export default handler
