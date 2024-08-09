const express = require("express")
const app = express();
const path = require("path")
const port = 8080;
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");


const reactBuildPath = path.join(__dirname, "../frontend/build");

app.use(express.static(reactBuildPath));
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile(reactBuildPath, "index.html")
})

app.post("/register", async (req, res) => {

    //db connect info
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'appt',
    });

    const name = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const type = req.body.userType;

    // intialize transporter which is used for sending mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `paarilai05@gmail.com`,
            pass: 'fslt jeuk zqgi hjtu', // add this inside .env file
        },
    });

    //generate 4 digit OTP
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

    await connection.query(`INSERT into users_otp(user_email, otp_code) values('${email}', ${otp})`)
})

app.post("/verify", async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'appt',
    });

    const email = req.body.email;
    const otp = req.body.otp;

    const result = await connection.query(`select user_email from users_otp where user_email = '${email}' and otp_code=${otp}`)
   console.log(result);
   if(result[0][0] === 0){
    console.log("failed")
   }
})

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})
