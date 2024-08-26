let express = require("express");
let mysql = require("mysql");
let bodyParser = require("body-parser");
var cors = require('cors');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "intern"
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database.");
});

let app = express();

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.end("Server running");
});

app.post("/login", (req, res) => {
    // Extract userId and password from the request body
    const { userId, password } = req.body;
    console.log(req.body); // Log the body to see what is being received

    // Check if userId and password are provided
    if (!userId || !password) {
        return res.send("userId and password are required.");
    }

    // Query to check if userId and password exist in the users table
    let sql = "SELECT * FROM users WHERE userId = ? AND password = ?";
    con.query(sql, [userId, password], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.send("Internal server error.");
        }

        if (results.length > 0) {
            res.send("Login successful.");
        } else {
            res.send("Invalid credentials.");
        }
    });
});

app.listen(8081, () => {
    console.log("APIs running on http://localhost:8081/");
});
