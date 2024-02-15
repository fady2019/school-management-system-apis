const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.BD_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    connectToDB,
};
