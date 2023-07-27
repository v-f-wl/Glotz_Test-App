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
      const test = await TestModel.findById(id)
      const modifiedTest = { ...test._doc }
      delete modifiedTest.user
      delete modifiedTest.userId
      delete modifiedTest.questions
      delete modifiedTest.questionsCount
      delete modifiedTest.result
      delete modifiedTest.resultCount
      delete modifiedTest.countAnswer
      res.json(modifiedTest)
    }catch(error){
      res.status(500).json({
        message: error
      })
    }
  }
}