import connectDB from "../../../utils/connectMongoDB";
import TestModel from '../../../models/Test'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB()
  if(req.method === 'POST'){
    try{
      const page = parseInt(req.body.pageCount) || 1;
      const limit = 10;
      const category = req.body.category;
      const rating = parseInt(req.body.rating);
      const filters = {};
      if (category) {
        filters.category = category;
      }
      if (!isNaN(rating)) {
        filters.ratingResult = { $gte: rating }
      }


      const posts = await TestModel.find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const hasMore = posts.length === limit;
      
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
      res.json({tests: modifiedPosts.reverse(), hasMore})
    }catch(error){
      res.status(500).json({
        message: error
      })
    }
  }
}