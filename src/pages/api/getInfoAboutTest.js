import connectDB from "../../../utils/connectMongoDB";
import TestModel from '../../../models/Test'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB()
  if(req.method === 'GET'){
    try{
      const { id } = req.query
      const posts = await TestModel.findById(id)
      const modifiedPost = { ...posts._doc }
      delete modifiedPost.ratingCount
      delete modifiedPost.started
      delete modifiedPost.finished
      delete modifiedPost.questions
      delete modifiedPost.result
      delete modifiedPost.resultCount
      delete modifiedPost.countAnswer
      res.json(modifiedPost)
    }catch(error){
      res.status(500).json({
        message: error
      })
    }
  }
}