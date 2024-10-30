const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const express = require('express');

//schema
const schema = buildSchema(`
    type Query {
        hello : String
        welcome(name: String!) : String
    }
`);

// resolver
const root = {
    hello: () => {
        return "Hello GraphQL"
    },
    welcome: ({name}) => {
        return `welcom ${name}`
    }
}

const app = express();

app.use("/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root, 
        graphiql: true, // true이면 Ciient UI 기본제공
    })
)

app.listen(4000);