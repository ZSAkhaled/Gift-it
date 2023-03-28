    // Khaled Al-shehri 2042360
    // Saad Al-harbi 2041985
    // Abdullah Rafee 1948682

//create the server
const { request, response } = require("express");
const  express = require("express");
const  app = express();

const{check, validationResult} = require("express-validator");
let registerValidate = getRegisterValidation();
let formValidate = getformValidation();

//routing
app.use(express.urlencoded({extended:false}));
app.use("/", express.static("./Website"))
app.post("/process",registerValidate, (request, response) =>{

    const errors = validationResult(request)
    if(!errors.isEmpty()){
        //errors
        const msg = "<h1>Sorry, we found errors with your Registering </h1>" + 
                        printErrors(errors.array());
        response.send(msg)
    }else{

        //no errors
        const fname = request.body.fname;
        const lname = request.body.lname;
        const email = request.body.email;
        const username = request.body.username;
        const phoneNumber = request.body.phoneNumber;
        const password = request.body.password;

        //save to database
        addUser(fname,lname,email,username,phoneNumber,password);

        const msg = "<h1>Thank you, your Register has been saved.</h1>"
        response.send(msg)
    } 
})

//form
app.post("/processs",formValidate,(request, response)=>{

    const errors = validationResult(request)
    if(!errors.isEmpty()){
        //errors
        const msg = "<h1>Sorry, we found errors with your form </h1>" + 
                        printErrors(errors.array());
        response.send(msg)
    }else{

        const fname = request.body.fname;
        const lname = request.body.lname;
        const email = request.body.email;
        const gender = request.body.gender;
        const phoneNumber = request.body.phoneNumber;
        const birthday = request.body.dob;
        const language = request.body.language;
        const message = request.body.message;

        addForm(fname,lname,email,phoneNumber,gender,language,message);     

        const msg = "<h1>Thank you, for contact US i hope you have a good day.</h1>"
        response.send(msg)
   } 
})

//server
app.listen(4000, () => {
    console.log("sever is running")
})

       
function getRegisterValidation(){
    //roles
    return[
            check('fname').isLength({min:3,max:20}).withMessage(' should not be less than 3  or more than 20 charecters!').isAlpha().withMessage('must be a string [A-z]').trim().escape(),
            check('lname').isLength({min:3,max:20}).withMessage(' should not be less than 3  or more than 20 charecters!').isAlpha().withMessage('must be a string [A-z]').trim().escape(),
            check('email').isEmail().withMessage("Email must of format x@yz.com").trim().escape(),
            check('username').isLength({min:3,max:20}).withMessage(' should not be less than 3  or more than 20 charecters!').trim().escape(),
            check('phoneNumber').isNumeric().withMessage('Phone number must be numbers!').isLength({min:10,max:10}).withMessage('Phone number must be 10 numbers!').trim().escape(),
            check('password').isStrongPassword().withMessage('The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and have a length between 8 and 24 characters')
    ]
}

//database 
function  addUser(fname,lname,email,username,phoneNumber,password){

    //connection
    const mysql = require("mysql2");
    let db = mysql.createConnection({
            host:'127.0.0.1',
            user:'root',
            password:'root',
            port:'8889',
            database:'gifit_db' 
    });

    db.connect(function(err){
        //SQL command
        let sql = "INSERT INTO users (fname, lname, email, username, phoneNumber, password) VALUES ('"+fname+"', '"+lname+"','"+email+"', '"+username+"', '"+phoneNumber+"', '"+password+"')";

        //exeucte command
        db.query(sql, function(err,result){
            
            if(err) throw err;

            //if no errors
            console.log("1 record added");
        })
    })

}
function  addForm(fname,lname,email,phoneNumber,gender,language,message){

    //connection
    const mysql = require("mysql2");
    let db = mysql.createConnection({
            host:'172.0.0.1',
            user:'root',
            password:'root',
            port:'8889',
            database:'gifit_db'
    });

    db.connect(function(err){
        //SQL command
        let sql = "INSERT INTO form (fname, lname, email, phoneNumber ,gender, language, message) VALUES ('"+fname+"', '"+lname+"','"+email+"', '"+phoneNumber+"', '"+gender+"', '"+language+"', '"+message+"')";

        //exeucte command
         db.query(sql, function(err,result){
            
            if(err) throw err;

            //if no errors
            console.log("1 record added");
        })
    })

}

function printErrors(errArray){
    let errors = [];
    for (let index = 0; index < errArray.length; index++) {
        let err = errArray[index]["msg"];
        let msg = "<p>-"+err+"</p>";
        errors.push(msg);
    }
    return errors.join("");
}


function getformValidation(){

    return[
            check('fname').isLength({min:3,max:30}).withMessage(' should not be less than 3  or more than 30 charecters!').isAlpha().withMessage('First name must be a string [A-z]').trim().escape(),
            check('lname').isLength({min:3,max:30}).withMessage(' should not be less than 3  or more than 30 charecters!').isAlpha().withMessage('Last name must be a string [A-z]').trim().escape(),
            check('email').isEmail().withMessage("Email must of format x@yz.com").trim().escape(),
            check('phoneNumber').isNumeric().withMessage('Phone number must contain only numbers!').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 characters long!').trim().escape(),
            check('gender').custom((val) => {
                const list = ['male', 'female'];
                if (list.includes(val)) return true;
                return false;
              }).withMessage('Please choose your gender.').trim().escape(),
            check('language').custom((val) => {
                const list = ['Arabic', 'English', 'French'];
                if(list.includes(val)) return true;
                return false;
             }).withMessage('must choose language you want to commencat with').trim().escape(),
            check('message').isAlpha().withMessage('Message must be a string [A-z]').trim().escape()
             
    ]

}
//log in
app.get("/login", (request, response) => {
    const username = request.query.username;
    const password = request.query.password;
    
    // database connection
    const mysql = require("mysql2");
    let db = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root",
        port: "8889",
        database: "gifit_db"
    });
    
    db.connect(function(err) {
        if (err) {
            throw err;
        }
        
        // SQL command
        let sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        // execute command
        db.query(sql, function(err, results) {
            if (err) {
                throw err;
            }
    
            if (results.length > 0) {
                // found a match
                let user = results[0];
                response.send(`
                <html>
                <head>
                
                    <style>
                        body {
                            background-color: #333d4a;
                            color: white;
                            font-family: Arial, sans-serif;
                        }
                        table {
                            margin: 0 auto;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid white;
                            padding: 8px;
                        }
                        h1 {
                            text-align: center;
                        }
                        .btn{
                            position: fixed;
                            bottom: 20%;
                            left: 43%;
                            margin: 0 auto;
                            font-family: "Roboto", sans-serif;
                            font-size: 18px;
                            font-weight: bold;
                            background-color: #0070d1;
                            width: 160px;
                            padding: 20px;
                            text-align: center;
                            text-decoration: none;
                            text-transform: uppercase;
                            color: #fff;
                            border-radius: 5px;
                            cursor: pointer;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            -webkit-transition-duration: 0.3s;
                            transition-duration: 0.3s;
                            -webkit-transition-property: box-shadow, transform;
                            transition-property: box-shadow, transform;
                        }
                        .btn:hover, .btn:focus, .btn:active{
                            box-shadow: 0 0 20px rfba(0,0,0,0.5);
                            -webkit-transform: scale(1.1);
                            transform: scale(1.1);
                        }
                        .glass{
                            background: linear-gradient(135deg,rgba(255,255,255,0.1), rgba(255,255,255,0));
                            backdrop-filter: blur(10px);
                            -webkit-backdrop-filter: blur(10px);
                            border-radius: 15px;
                            border: 1px solid ragb(255,255,255,0.18);
                            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                            text-align: center;
                        }
                        section{
                            margin: 50px;
                            margin-left: 250px;
                            margin-right: 250px;
                            padding: 50px;
                        }
                        
                    </style>
                </head>
                <body >
                    <h1>User Information</h1>
                    <section class = 'glass'>
                    <table >
                        <tr>
                            <th>First Name</th>
                            <td>${user.fname}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>${user.lname}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${user.email}</td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <td>${user.username}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>${user.phoneNumber}</td>
                        </tr>
                    </table>
                    </section>
                    <a href="index.html" class="btn">Take me to home 
                    page</a>
                </body>
                </html>
                `);
            } else {
                // no match found
                response.send("Not found");
            }
        });
    });
});
