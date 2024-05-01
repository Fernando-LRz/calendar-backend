const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Database connection successful');
        
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to database');
    }
}

module.exports = {
    dbConnection
}