const logger = require('./common/logging');
// var https = require( "https" );
var fs = require( "fs" );

process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');

//Unix path
// const httpsOptions = {
//     cert: fs.readFileSync('/etc/ssl/certs/rslang.crt'), 
//     key: fs.readFileSync('/etc/ssl/certs/rslang.key')
// };

// Windows path
// const httpsOptions = {
//     cert: fs.readFileSync('/react2021/rslang/rslangbe/src/cert/rslang-cert.crt'), 
//     key: fs.readFileSync('/react2021/rslang/rslangbe/src/cert/rslang-key.key')
// };

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error:')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    //    app.listen(PORT, () => {
    //    logger.info(`App is running on http://localhost:${PORT}`)
    // })
    https.createServer(httpsOptions, app).listen(443)
    logger.info(`App is running on https://localhost:${PORT}`)
  });
