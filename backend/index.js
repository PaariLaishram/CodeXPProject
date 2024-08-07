const express = require("express")
const app = express();
const path = require("path")
const port = 8080;
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");




const reactBuildPath = path.join(__dirname, "../Appointment-App/build");

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

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `paarilai05@gmail.com`,
            pass: 'fslt jeuk zqgi hjtu', // add this inside .env file
        },
    });
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'appt',
    });

    const otp = Math.round(Math.random() * 10000);

    const [results, fields] = await connection.query(
        'SELECT * FROM users_otp'
    );
    console.log(results);
    await connection.query(`INSERT into users_otp(user_email, otp_code) values('${email}', ${otp})`)

    async function main() {
        const info = await transporter.sendMail({
            from: '"Paari Laishram" <paarilai05@gmail.com>',
            to: `${email}`,
            subject: "Hello Test",
            text: "Testing",
            html: "<b>Hello world?</b>",
        });
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
})

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})
