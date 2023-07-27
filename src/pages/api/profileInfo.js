import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
import jwt from 'jsonwebtoken'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  try{
    connectDB()
    if (req.method === 'POST') {
      const tokenId = req.body.token
      const userId = req.body.user
      const decoded = jwt.verify(tokenId, process.env.JVT_SECRET)
      if(decoded._id === userId){
        const user = await UserModal.findOne({ _id: userId})
        const {createdAt, email, myResults, myTests, passwordHash, updatedAt, ...newObj} = user._doc
        res.json({
          user: newObj,
          message: true
        })
      }else{
        res.json({
          message: false
        })
      }
    }
  }catch(err) {
    res.json({
      userId: 'dfvdf',
      message: false
    })
  }
}