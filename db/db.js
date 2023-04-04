const mongoose = require('mongoose')


module.exports =() => {
    const ConnectionParams ={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB,ConnectionParams);
        console.log('success connect to MongoDB')
    } catch (error) {
        console.log(error)
        console.log(`Can't Connect to MongoDB`)
    }
}