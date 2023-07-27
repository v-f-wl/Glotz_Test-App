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
      const rating = req.body.rating
      const test = await TestModel.findById(id)
      test.ratingCount.push(rating)
      let count = 0
      for(let i = 0; i < test.ratingCount.length; i++){
        count = count + test.ratingCount[i]
      }
      test.ratingResult = Math.floor(count / test.ratingCount.length)
      await test.save()
      res.json(test);
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