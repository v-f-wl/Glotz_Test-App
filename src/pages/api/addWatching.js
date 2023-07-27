import connectDB from "../../../utils/connectMongoDB";
import TestModel from '../../../models/Test'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB();
  if (req.method === 'POST') {
    try {
      const id   = req.body.id
      const updatedRecord = await TestModel.findOneAndUpdate(
        { _id: id },
        { $inc: { watchings: 1 } },
        { new: true } 
      );

      res.json(updatedRecord);
    } catch (error) {
      res.status(500).json({
        message: 'Что-то пошло не так'
      });
    }
  } else {
    return res.status(500).json({
      message: 'Что-то пошло не так'
    });
  }
}