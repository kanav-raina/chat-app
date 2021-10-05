const {PubSub} =require('graphql-subscriptions')

const pubSub = new PubSub()

const subscription={
    messageAdded:{
        subscribe:()=> pubSub.asyncIterator("MESSAGE_ADDED")
    }
}

module.exports={subscription}