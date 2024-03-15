// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/Home', (req, res) => {
    res.render('Home');
});
app.get('/Booking', (req, res) => {
    res.render('Booking');
});
app.get('/Cancel', (req, res) => {
    res.render('Cancel');
});
app.get('/Help', (req, res) => {
    res.render('Help');
});
app.get('/logout', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    exec(`python validate_user.py ${username} ${password}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stdout.trim() === 'success') {
            res.redirect('/Home')
        } else {
            res.send('Invalid username or password');
        }
    });
});
app.post('/logout', (req, res) => {
    // Clear session, cookies, or any authentication tokens if needed
    // For example:
    // req.session.destroy();
    // res.clearCookie('sessionCookie');

    // Redirect to the login page
    res.redirect('/login');
});
app.post('/validateRegistration', (req, res) => {
    const { location , eventtype,
        themeofevent,
        Closedoropen,
        startdate,
        enddate,
        participentslimit,
        participentsDL } = req.body;

    // Call your Python script for validation
    const pythonProcess = spawn('python', ['script.py', location , eventtype, themeofevent, Closedoropen, startdate,enddate, participentslimit,
                                                participentsDL]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if (data.toString().trim() === 'valid') {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.sendStatus(500);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
