const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const fs = require('file-system');
const mongoose = require('mongoose');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/upload', (req, res, next) => {
    // console.log(req);
    let file = req.files.file;

    file.mv(`${__dirname}/public/${req.body.filename}.mp4`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        ffprobe(`public/${req.body.filename}.mp4`, {path: ffprobeStatic.path})
            .then(function (info) {

                res.json({
                    file: `public/${req.body.filename}.mp4`,
                    filename: req.body.filename,
                    duration: info.streams[0].duration
                });

            });
    });
});


app.get('/delete/:id', (req, res, next) => {

    const fileTitle = req.params.id;
    var filePath = `${__dirname}/public/${fileTitle}.mp4`;
    fs.unlink(filePath, (err) => {
        if (err) throw err;
        res.json({title: fileTitle})
    });

});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8000, () => {
    console.log('8000');
});

module.exports = app;
