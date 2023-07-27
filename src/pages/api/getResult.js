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
  if (req.method === 'POST') {
    try{
      const id = req.body.idTest
      const score = req.body.resultScore
      const userId = req.body.idUser
      const posts = await TestModel.findById(id)

      const updatedRecord = await TestModel.findOneAndUpdate(
        { _id: id },
        { $inc: { finished: 1 } },
        { new: true } 
      );

      const modifiedPost = { ...posts._doc.result}
      function findMatchingResult(userScore) {
        let matchingResult = null;
      
        for (const key in modifiedPost) {
          if (modifiedPost.hasOwnProperty(key)) {
            const currentResult = modifiedPost[key];
            if (userScore >= currentResult.score) {
              if (!matchingResult || currentResult.score > matchingResult.score) {
                matchingResult = currentResult;
              }
            }
          }
        }
      
        return matchingResult;
      }
      const result = findMatchingResult(score)
      result.userId = posts._doc.userId
      if(userId !== undefined){
        const user = await UserModal.findOneAndUpdate(
          { _id: userId },
          { $set: { [`resultsOfTest.${id}`]:  result} },
          { new: true }
        );
      }
      res.json(result)
      
    }catch(error){
      res.status(500).json({
        message: 'Не удалось зарегестироваться'
      })
    }
  }else{
    return res.status(500).json({
      message: 'Что-то пошло не так '
    })
  }
  
}