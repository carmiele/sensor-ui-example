import { NextApiRequest, NextApiResponse } from 'next'
import { sampleSensorData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleSensorData)) {
      throw new Error('Cannot find sensor data')
    }

    res.status(200).json(sampleSensorData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
