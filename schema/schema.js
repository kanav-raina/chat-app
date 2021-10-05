const {gql} = require('apollo-server-express')


const typeDefs =gql`
    scalar Date

    type Message {
        id:ID
        message:String
        createdAt:Date
        from:ID
        to:ID

    }
    
    type Subscription{
        messageAdded:Message
    }

    type Query{
        getMessageById(id:ID!):Message
        getAllMessages:[Message]
    }

    type Mutation{
        createMessage(message:String!):Message
        updateMessage(id:ID!,message:String!):Message
        deleteMessage(id:ID!):Message

    }
`

module.exports=typeDefs
 