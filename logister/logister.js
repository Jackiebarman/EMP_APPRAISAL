var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http');
var nodemailer = require('nodemailer');
const PORT=3000;
const app =express();

app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');
var obj;




app.get('/',function(req, res){
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
    let reg="select * from registration";

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
       
        con.query(reg,function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(result);
                console.log(result);
               
            } 
    
        });
        
    });
 });
 

app.post('/register',function(req,res){
    this.obj=req.body;
    let user = this.obj.email;
    console.log(this.obj);
    console.log("data sent successfully");
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
    let t1="create table if not exists registration(firstname varchar(30),lastname varchar(30),username varchar(30) PRIMARY KEY,email varchar(50),phone bigint,address varchar(30),password varchar(20))";
    let q1="create table if not exists score_table(Username varchar(30) PRIMARY KEY,score bigint)";
    let names={firstname:this.obj.firstname,lastname:this.obj.lastname,username:this.obj.username,email:this.obj.email,phone:this.obj.phone,address:this.obj.address,password:this.obj.password};
    let ins="insert into registration SET ?";
    let ins2="insert into score_table SET ?";
    let names2={Username:this.obj.username,score:0};
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // con.query("use angular");
        con.query(t1);
        con.query(q1);
        con.query(ins,names,function(err,result){
            if(err) res.status(404).send({"error":"user already exist"})
            else res.status(200).send(this.obj);
        });

        con.query(ins2,names2,function(err,result){
            if(err) res.status(404).send({"error":"errorrrrr"})
            else res.status(200).send(this.obj);
        });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bhajankr328@gmail.com',
              pass: 'bhajan2000'
            }
          });
          
          var mailOptions = {
            from: 'bhajankr328@gmail.com',
            to: user,
            subject: 'Sending Email using Node.js',
            text: `Hey !!! WELCOME to WTA-EMPLOYEE APPRAISAL MANAGEMENT ASSIGNMENT.
                    `,
            html: `<h1>👥 Your Registration is done successfully 👥!!!</h1><p>
                   <h3>Hey !!! WELCOME to WTA-EMPLOYEE APPRAISAL MANAGEMENT ASSIGNMENT💡💡💡 .
                   You have registered as an ADMIN ✍️✍️✍️</h3> <br/>
                   Not YOU 🤔??? please <s>ignore</s> the message then</p>`       
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
    });
});
app.post('/login',function(req,res){
    this.obj=req.body;
    console.log(this.obj);
    console.log(this.obj.username);
    console.log("data sent successfully");
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
     var username = this.obj.username;
     
     var password = this.obj.password;
     // login is view ...
     var tx="select exists(select * from login where login.username=? AND login.password=?) as EXIST";
    
    
    
     var t2="select exists(select * from registration where registration.username=? AND registration.password=?) as EXIST";
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
       
       
       
        con.query(t2,[username,password],function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(result[0]);
                console.log(result[0].EXIST);
                console.log('success',req.body.username);
               
            } 
    
        });
        
    });
});



    app.listen(PORT,function(){
        console.log("server running on localhost:"+PORT);
    });
