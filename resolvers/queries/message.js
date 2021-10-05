const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getMessageById=async(_,args)=>{
    console.log(args.id)
        try{
            var message = await prisma.messages.findUnique({
                where: {
                  id: args.id
                },
              })
        }catch(e){
            console.log(e)
        }
      return message
    }

const getAllMessages=async(_,args,ctx)=>{//later make it only for userid
    try{
      var messages = await prisma.messages.findMany()
    }catch(e){
      console.log(e)
    }
    return messages
}    

module.exports = {getMessageById,getAllMessages}