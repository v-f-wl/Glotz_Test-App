import connectDB from "../../../utils/connectMongoDB";
import TestModel from '../../../models/Test'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB()
  if (req.method === 'POST') {
    try{
      const doc = new TestModel({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        userId: req.body.userId,
        category: req.body.category,
        questions: req.body.questions,
        questionsCount: req.body.questionsCount,
        result: req.body.result,
        resultCount: req.body.countOfResult,
        countAnswer: req.body.countOfAnswer
      })
      const post = await doc.save()

      res.json({
        post: post,
        message: req.body
      })
    }catch(err) {
      console.log(err)
    }
  }
}