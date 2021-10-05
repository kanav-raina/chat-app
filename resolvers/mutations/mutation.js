const {createMessage, updateMessage, deleteMessage}  = require('./message')


const mutation={
    createMessage,
    updateMessage, 
    deleteMessage

}

exports.mutation=mutation