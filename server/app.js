
const express = require('express');
const app = express();
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

app.use(cors());

mongoose.connect(process.env.MONGO_KEY)
mongoose.connection.once('open', () => {
     console.log('MongoDB connected');
})

app.use('/graphql', graphqlHTTP({
     graphiql: true,
     schema,
}))


app.listen(4000, ()=> {
     console.log('listing on port 4000');
});

