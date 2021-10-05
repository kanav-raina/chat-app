const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getMessageById=async(_,args)=>{
    console.log(args.id)
        try{
            var note = await prisma.notes.findUnique({
                where: {
                  id: args.id
                },
              })
        }catch(e){
            console.log(e)
        }
      return note
    }

const getAllMessages=async(_,args,ctx)=>{//later make it only for userid
    try{
      var notes = await prisma.notes.findMany()
    }catch(e){
      console.log(e)
    }
    return notes
}    

module.exports = {getMessageById,getAllMessages}