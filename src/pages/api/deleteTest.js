import connectDB from "../../../utils/connectMongoDB";
import TestModel from '../../../models/Test'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req, res) {
  connectDB()
  if (req.method === 'DELETE') {
    try{
      const { id } = req.query
      TestModel.findOneAndDelete(
        {
          _id: id
        }
      )
      .then( (doc) => {
        if(!doc){
          return res.status(404).json({
            message: "Статья не найдена"
          })
        }
  
        res.json({
          message: 'Succec'
        })
      })
    }catch(err) {
      console.log(err)
    }
  }
}