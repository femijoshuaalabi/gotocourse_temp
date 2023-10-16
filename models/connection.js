import mongoose from 'mongoose';
import colors from 'colors';

const DBLocal = process.env.DATABASE_LOCAL;

export default () => {
    console.log('connecting to DB...');
    mongoose
        .connect(DBLocal, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log(`DB connection successful!`.blue.bold))
        .catch((err) => {
            console.log('DB Connection Failed !');
            console.log(`err`, err);
        });
};
