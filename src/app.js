require('express-async-errors');
const express = require('express');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
require('express-async-errors');
const { NOT_FOUND } = require('http-status-codes');


const winston = require('./common/logging');
const wordRouter = require('./resources/words/word.router');
const signinRouter = require('./resources/authentication/signin.router');
const userRouter = require('./resources/users/user.router');
const userTokenRouter = require('./resources/token/token.router');
const userWordsRouter = require('./resources/userWords/userWord.router');
const aggregatedWordsRouter = require('./resources/aggregatedWords/aggregatedWord.router');
const statisticRouter = require('./resources/statistics/statistic.router');
const settingRouter = require('./resources/settings/setting.router');
const errorHandler = require('./errors/errorHandler');
const checkAuthentication = require('./resources/authentication/checkAuthentication');
const { userIdValidator } = require('./utils/validation/validator');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());


const storageConf = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/root/rslangBe/avatars')
    },
    filename: (req, file, cb) => {
      console.log(file.originalname)
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storageConf}).single('file')

app.post("/avatar", async (req, res) => {

  upload(req, res, async (err) => {
     if (err) console.log(err);

     if(err instanceof multer.MulterError) {
       console.log(multer.MulterError)
    }
    let filedata = req.file;
    res.send(filedata)
  })
});

app.use('/files', express.static(path.join(__dirname, '../files')));
app.use('/avatars', express.static(path.join(__dirname, '../avatars')));

app.use(express.json());

app.use(checkAuthentication);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/words', wordRouter);

app.use('/signin', signinRouter);

app.use('/users', userRouter);

userRouter.use('/:id/tokens', userIdValidator, userTokenRouter);

userRouter.use('/:id/words', userIdValidator, userWordsRouter);

userRouter.use('/:id/aggregatedWords', userIdValidator, aggregatedWordsRouter);

userRouter.use('/:id/statistics', userIdValidator, statisticRouter);

userRouter.use('/:id/settings', userIdValidator, settingRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

module.exports = app;
