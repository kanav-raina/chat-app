const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cuid=require('cuid')

const createMessage=async(_,args,__,___)=>{
      let message_data={
        id:cuid(),
        from:cuid(),//args.user_id,
        to:cuid(),//args.to_user_id,
        message:args.message,
        createdAt:new Date()
      }
      try{
        var message= await prisma.messages.create({ data: message_data })
      }catch(e){
          console.log(e)
      }
      return message
  }

const updateMessage =async(_,args,__,___)=>{

    const updatedMessage = await prisma.messages.update({
      where: {
        id: args.id,
      },
      data:{message:args.message},
    })
  
    return updatedMessage 
  }

const deleteMessage =async(_,args,__,___)=>{

    const deletedMessage = await prisma.messages.delete({
        where: {
          id: args.id
        },
      })
      
  
    return deletedMessage 
  }  


module.exports = {createMessage , updateMessage , deleteMessage }


