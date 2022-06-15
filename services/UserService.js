const UserModel = require('../models/UserModel')
// username:{type:String, unique:true, required:true},
// chatId:{type:String, unique:true, required:true},
// role:{type:String,required: true },
// isActive:{type:Boolean, required: true, default:true},
// description:{type:String},

class UserService{

    async addUser(username,chatId,role,isActive){
        try{
            await UserModel.create({username,chatId,role,isActive})
            return true
        }catch (e) {
            return false
        }
    }

    async getUserByTelegramId(chatId){
        try{
            const user = await UserModel.findOne({chatId})
            return user
        }catch (e) {
            return false
        }
    }

    async getAdminUsers(){
        try{
            const users = await UserModel.find({role:'admin'})
            return users
        }catch (e) {
            return false
        }
    }

}

module.exports = new UserService()