const express = require("express")
const app = express();
const path = require("path")
const port = 8080;
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");
const pg = require('pg');
const { Client } = pg;

//connect to db
const client = new Client({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'Appt'
})

client.connect();

const reactBuildPath = path.join(__dirname, "../frontend/build");

app.use(express.static(reactBuildPath));
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile(reactBuildPath, "index.html")
})

app.post("/register", async (req, res) => {

    const name = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const type = req.body.userType;

    try {
        // intialize transporter which is used for sending mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `paarilai05@gmail.com`,
                pass: 'fslt jeuk zqgi hjtu', // add this inside .env file
            },
        });

        //generate 4 digit OTP 
        //TODO: use a while loop to make sure digit count is not less than 4; eg if 0 is in front reroll
        const otp = Math.round(Math.random() * 10000);

        //code to send mail to users to verify OTP
        async function main() {
            const info = await transporter.sendMail({
                from: '"Paari Laishram" <paarilai05@gmail.com>',
                to: `${email}`,
                subject: `OTP Verification ${name}`,
                html: `<h1>Please find the OTP below for verficitation</h1><h2>${otp}</h2>`,
            });
            console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);

        const result = await client.query(`INSERT into users_otp(user_email, otp_code) values('${email}', ${otp}) returning user_email`)

        if (result.rows != 0) {
            res.status(200).json({ message: 'user registered in db' });
        }
        else {
            res.status(500).json({ messageL: 'unable to register user in db' })
        }
    }
    catch (error) {
        console.error('error registering user:', error);
    }
})

app.post("/login", async (req, res) => {
  
    const email = req.body.userEmail;
    const password = req.body.userPwd;
    const type = req.body.userType;

    if (type) {
        const doctorLoginQuery = await client.query(`select * from users where user_email='${email}' and (
user_password='${password}' and user_type='doctor');`)
        if (doctorLoginQuery.rows != 0) {
            res.status(200).json({message: 'User logged in successfully'})
        } else {
            res.status(401).json({message: 'Credentials did not match'})
        }
    }
    else {
        const patientLoginQuery = await client.query(`select * from users where user_email='${email}' and (
            user_password='${password}' and user_type='patient');`)

        if (patientLoginQuery.rows != 0) {
            res.status(200).json({message: 'User logged in successfully'})
        } else {
            res.status(401).json({message: 'Credentials did not match'})
        }
    }
})

app.post("/verify", async (req, res) => {
    const email = req.body.userEmail;
    const otp = req.body.otp;
    const name = req.body.userName;
    const password = req.body.userPassword;
    const userType = req.body.userType;

    console.log(req.body);
    const result = await client.query(`select user_email from users_otp where user_email = '${email}' and otp_code=${otp}`)
    console.log(result.rows);
    if (result.rows != 0) {

        const addUser = await client.query(`insert into users(user_name, user_email, user_password, user_type) values('${name}','${email}','${password}','${userType}') returning user_email`);
        if (addUser.rows != 0) {
            console.log('user added successfully')
            res.status(200).json({ message: "user successfully added" })
        } else {
            console.log('Error adding user');
        }
    }
    else {
        res.status(401).json({ message: 'Unable to add user' });
    }
})

app.get("/topDoctors", async (req,res) => {
    const query = await client.query('select * from doctors order by rating limit 3');
    res.status(200).json({result: query.rows})
})

app.get("/topHospitals", async(req,res) => {
    const query = await client.query('select * from hospitals order by hospitalrating limit 3');
    console.log(query.rows)
    res.status(200).json({result:query.rows});
})

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})
