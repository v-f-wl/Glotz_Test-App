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
      const updatedRecord = await TestModel.findOneAndUpdate(
        { _id: id },
        { $inc: { started: 1 } },
        { new: true } 
      );

      const post = await TestModel.findById(id)
      const modifiedPosts = {...post._doc}
      delete modifiedPosts.category
      delete modifiedPosts.ratingCount
      delete modifiedPosts.createdAt
      delete modifiedPosts.started
      delete modifiedPosts.ratingResult
      delete modifiedPosts.updatedAt
      delete modifiedPosts.user
      delete modifiedPosts.userId
      delete modifiedPosts.watchings
      delete modifiedPosts._id
      delete modifiedPosts.finished
      delete modifiedPosts.title
      delete modifiedPosts.description
      delete modifiedPosts.result
      delete modifiedPosts.resultCount
      res.json(modifiedPosts)
    }catch(error){
      res.status(500).json({
        message: error
      })
    }
  }
}