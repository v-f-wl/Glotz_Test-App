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
      const posts = await TestModel.find().exec()
      const modifiedPosts = posts.map(post => {
        const modifiedPost = { ...post._doc }
        delete modifiedPost.user
        delete modifiedPost.userId
        delete modifiedPost.ratingCount
        delete modifiedPost.started
        delete modifiedPost.finished
        delete modifiedPost.questions
        delete modifiedPost.questionsCount
        delete modifiedPost.result
        delete modifiedPost.resultCount
        delete modifiedPost.countAnswer
        return modifiedPost
      });
      res.json(modifiedPosts.reverse())
    }catch(error){
      res.status(500).json({
        message: error
      })
    }
  }
}