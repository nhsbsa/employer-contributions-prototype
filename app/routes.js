const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/docs', (req, res) => {
    res.render('docs.html');
});

router.get('/form-example', (req, res) => {
    res.render('form-example.html');
});

router.post('/form-example', (req, res) => {
    console.log('The following variables are now available in session:');
    console.log('First Name', req.session.firstName);
    console.log('Last Name', req.session.lastName);

    res.redirect('/form-example-success');
});

router.get('/form-example-success', (req, res) => {
    res.render('form-example-success.html');
});

// router.get('/nhsbsa/financial-information-collection/login', (req, res) => {
//     res.render('nhsbsa/financial-information-collection/login.html');
// });

router.get('/start', (req, res) => {
    res.render('start.html');
});

router.get('/login', (req, res) => {
    res.render('login.html');
});

router.get('/previous-payments', (req, res) => {
    res.render('previous-payments.html');
});

router.get('/make-payment', (req, res) => {
    res.render('make-payment.html');
});

router.get('/contributions-and-payment', (req, res) => {
    res.render('contributions-and-payment.html');
});

router.get('/summary', (req, res) => {
    res.render('summary.html');
});

router.get('/thank-you', (req, res) => {
    res.render('thank-you.html');
});

module.exports = router;
