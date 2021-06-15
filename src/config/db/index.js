// Tao ket noi den database
const mongoose = require('mongoose');

async function connect(params) {
    try{
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect succesfully!!')

    }
    catch{
        console.log('Connect fail!!')
    }
}

module.exports = { connect}