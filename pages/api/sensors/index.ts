import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jsonDirectory = path.join(process.cwd(), "json");
    const file = await fs.readFile( jsonDirectory + "/sensor-data.json", "utf8");

    if (!file) {
      throw new Error("Cannot find sensor data")
    }

    const sampleSensorData = JSON.parse(file);

    res.status(200).json(sampleSensorData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
