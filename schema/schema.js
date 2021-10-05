const {gql} = require('apollo-server')


const typeDefs =gql`
    scalar Date

    type Message {
        id:ID
        message:String
        createdAt:Date

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
 