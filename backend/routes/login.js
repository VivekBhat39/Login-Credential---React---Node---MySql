let express = require("express");
let mysql = require("mysql");
let router = express.Router();

let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodeapi"
});

router.get("/", (req, res)=>{
    
    let sql = "SELECT * FROM users ORDER BY name";
    con.query(sql, (err, result)=>{
        if(err){
            res.end(JSON.stringify({status:"failed", data:err}));
        }
        res.end(JSON.stringify({status:"success", data:result}));

    });


});


module.exports = router;