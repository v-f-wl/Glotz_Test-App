import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
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
      const userInfo = await UserModal.findById(id)
      delete userInfo.createdAt
      delete userInfo.email
      delete userInfo.passwordHash

      const testInfo = await TestModel.find({ userId: id }).exec()
      const testData = []
      for(let i in testInfo){
        testData.push(testInfo[i]._id)
      }
      res.json({
        userInfo, 
        testData
      })
    }catch(error){
      res.status(500).json({
        message: error
      })
    }
  }
}