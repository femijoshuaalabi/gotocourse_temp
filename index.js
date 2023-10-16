import './_loadenv.js';
import app from './server.js';
import databaseConnection from './models/connection.js';

process.on('uncaughtException', (error) => {
    // using uncaughtException event
    console.log(' uncaught Exception => shutting down..... ');
    console.log(error.name, error.message);
    process.exit(1); //  emidiatly exists all from all the requests
});

//Listening to server port
var port = process.env.PORT || 8080;
const server = app.listen({ port }, async () => {
    console.log(`App is running on port ${port} on ${process.env.NODE_ENV} mode`.yellow.bold);
    databaseConnection();
});

// handle Globaly  the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on('unhandledRejection', (error) => {
    // it uses unhandledRejection event
    // using unhandledRejection event
    console.log(' Unhandled Rejection => shutting down..... ');
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1); //  emidiatly exists all from all the requests sending OR pending
    });
});
