import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"
const verifyUser = async(req, res, next) => {
try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.statuss(401).json({msg:"unautorized"})
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded){
            return res.status(401).json({msg:"invalid token"})
        }
    const user =  await UserModel.findOne({_id : decoded.id}).select('-password')

    req.user = user;
    next();

} catch (error) {
    console.log(error)
}
}

export default verifyUser;