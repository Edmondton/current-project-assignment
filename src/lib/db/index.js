import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const connection = mongoose.connect(process.env.MONGO_DB, options);

connection.then(db => {
    console.log('Successfully connected to mongodb cluster')
    return db;
}).catch(err => {
    if (err.message.code === 'ETIMEDOUT') {
        console.log('Attempting to re-establish database connection.');
        mongoose.connect(process.env.MONGO_DB, options);
    } else {
        console.error('Error while attempting to connect to database:');
        console.error(err);
    }
});

export default connection;
