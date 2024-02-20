const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
  })
);
app.set("view engine", ".hbs");

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/login", function (req, res) {
  res.render("login");
});

// POST route to handle form submission
app.post("/send-email", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  console.log("Received form data:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  // Create transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "insynctd435@gmail.com", // Replace with your email
      pass: "dhii lteo bvqq smti", // Replace with your password or use environment variables
    },
  });

  // Email message options
  const mailOptions = {
    from: email,
    to: "insynctd435@gmail.com", // Replace with your email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error: Something went wrong.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully.");
    }
  });
});

var port = process.env.PORT || 3030;
app.listen(port, function () {
  console.log("Express started listening on port " + port + "...");
});
