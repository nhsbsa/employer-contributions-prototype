const path = require('path');
const express = require('express');
const nunjucks = require('express-nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = require('./app/routes');

const app = express();

app.use(session({
    secret: 'a-secret',
    cookie: {}
}));

var port = (process.env.PORT || 3001);

// Application settings
app.set('view engine', 'html');
// app.set('views', [path.join(__dirname, '/app/views'), path.join(__dirname, '/lib/')])
app.set('views', [ path.join(__dirname, 'app/views') ]);

// nunjucks.configure('app/views', {
//     express: app,
//     autoescape: true,
//     watch: true,
//     noCache: true
// });

const njk = nunjucks(app, {
    autoescape: true,
    watch: true,
    noCache: true
});

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public/nhs-template')));
app.use('/public/css', express.static(path.join(__dirname, '/public/css')));

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// send assetPath to all views
app.use(function (req, res, next) {
    res.locals.asset_path = '/public/';
    next();
});

// Add variables that are available in all views
// app.use(function (req, res, next) {
//     res.locals.cookieText = config.cookieText;
//     next();
// });
const reqCtxProcessor = (req, ctx) => {
    ctx.data = req.session;
};
app.use(njk.ctxProc([ reqCtxProcessor ]));
app.use( (req, res, next) => {
    Object.keys(req.query).forEach( (k) => {
        req.session[k] = req.query[k];
    });
    Object.keys(req.body).forEach( (k) => {
        req.session[k] = req.body[k];
    });
    next();
});
app.use('/reset-session', (req, res) => {
    req.session.destroy( ( err ) => {
        res.redirect('/');
    });
});

app.use('/', routes);

app.listen(port);
console.log('=================================================================');
console.log('Listening on port ' + port);
console.log('=================================================================');
