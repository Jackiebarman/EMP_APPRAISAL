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


var pool =  mysql.createPool({
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
     
    function push_response(username,set_ID,ids,res, cb) { 
        var students = [];
        var pending = ids.length;
        //[ ids[i] ]
        for(var i in ids) {
            pool.query('INSERT INTO response (Username, set_ID, Q_no,user_response,Datetime) VALUE (?,?,?,?,CURRENT_TIMESTAMP())', [username,set_ID,ids[i],res[i] ], function(err, stu){
                students.push(stu);
                if( 0 === --pending ) {
                    cb(students); //callback if all queries are processed
                }
            });
        }
    }

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
 app.get('/history',function(req, res){

    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });

    var t2="select * from history order by DateTime desc";

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");  
           
            con.query(t2,function(err,result){
                if(!result) {res.status(404).send("error in mysql");console.log(err);}
                else{
                    res.status(200).send(result);
                    console.log("Here is the history:",result);
                   
                } 
        
            });
                 
                
    });
});

 app.get('/score',function(req, res){

    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
    let t1="select * from score_table order by score desc";

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
       
        con.query(t1,function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(result);
                console.log(result);
               
            } 
    
        });
        
    });
 });

 app.get('/answerkey',function(req, res){

    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
    let t1="select * from questions";

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
       
        con.query(t1,function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(result);
                console.log(result);
               
            } 
    
        });
        
    });
 });

 app.get('/hiistory',function(req, res){

    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
    const dropQuery = 'DROP PROCEDURE IF EXISTS `historyOfuser`';
    const createQuery = `CREATE PROCEDURE \`historyOfuser\`(
        )
    BEGIN
    select * from history order by DateTime desc;
    
    END`;

    var t2="call historyOfuser()";
    
    //var hello = "select * from history order by DateTime desc;";

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        con.query(dropQuery);
            
        con.query(createQuery);   
           
            con.query(t2,function(err,result){
                if(!result) {res.status(404).send("error in mysql");console.log(err);}
                else{
                    res.status(200).send(result);
                    console.log("Here is the history:",result);
                   
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
            text: `Hey !!! WELCOME to EXAMMANIA - The best platform to learn.
                    Attend the exams , earn score and build yourself for competitive exams.`,
            html: `<h1>👥 Your Registration is done successfully 👥!!!</h1><p>
                   <h3>Hey !!! WELCOME to EXAMMANIA💡💡💡  - The best platform to learn.
                   Attend the exams , earn score and build yourself for competitive exams ✍️✍️✍️</h3> <br/>
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

app.post('/login2',function(req,res){
    this.obj=req.body;
    console.log("login2:",this.obj);
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
     var username = this.obj.username;
     var score = this.obj.score;
    var t2="update score_table set score_table.score=? where score_table.username=?";
   con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(t2,[score,username],function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(this.obj);
                
                console.log('success');
               
            } 
    
        });
        
    });
});

app.post('/login3',function(req,res){
    this.obj=req.body;
    console.log("login3:",this.obj);
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
     
    var hiss = "create table if not exists history(Username varchar(30),score bigint,DateTime DATETIME(6))";
    //let insert="insert into history SET ?";
    let insert="INSERT INTO history (Username, score, DateTime) VALUE (?,?,CURRENT_TIMESTAMP())";
    //let naming={Username:this.obj.username,score:this.obj.score,DateTime:STR_TO_DATE(this.obj.date)};
    var username = this.obj.username;
    var score = this.obj.score;
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(hiss);
        con.query(insert,[username,score],function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(this.obj);
                
                console.log('success');
               
            } 
    
        });
        
    });
});

app.post('/login4',function(req,res){
    this.obj=req.body;
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
     
    var u_res = "create table if not exists response(Username varchar(30),set_ID int,Q_no varchar(10),user_response int,Datetime DATETIME(6))";
    //let insert="insert into history SET ?";
    let insert="INSERT INTO response (Username, set_ID, Q_no,user_response,Datetime) VALUE (?,?,?,?,CURRENT_TIMESTAMP())";
    //let naming={Username:this.obj.username,score:this.obj.score,DateTime:STR_TO_DATE(this.obj.date)};
    var username = this.obj.username;
    var set_ID = this.obj.q_id;
     var res1 = this.obj.res1;
     var res2 = this.obj.res2;
     var res3 = this.obj.res3;
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(u_res);
        //for loop
        var ids = [1,2,3];
        var ress = new Array();
        ress.push(res1);
        ress.push(res2);
        ress.push(res3);
        for(var i in ids) {
            con.query(insert,[username,set_ID,ids[i],ress[i] ]);
                     
                     console.log('success');      
                } 
        
            });
       // var res = [1,1,1];
        // res[0]=this.obj.q1;
        // res[1]=this.obj.q2;
        // res[2]=this.obj.q3;
        // push_response(username,set_ID,ids,res, function(students){
        // console.log("let's check",students);
        // console.log("Type",typeof this.obj.q1);
        // console.log("TypeId",typeof this.obj.q_id);
        // //console.log("A number:",bhajan);
        // });
        // con.query(insert,[username,set_ID],function(err,result){
        //     if(!result) {res.status(404).send("error in mysql");console.log(err);}
        //     else{
        //         res.status(200).send(this.obj);
                
        //         console.log('success');
               
        //     } 
    
        // });
        
    });




app.post('/updatescore',function(req,res){
    this.obj=req.body;
    console.log("update score",this.obj);
    
    var con = mysql.createConnection({
        
        host: "localhost",
        user: "root",
        password: "bhajan2000",
        database:'Angular_project'
    });
     var username = this.obj.username;
     
     var score = this.obj.score;
    var t2="update score_table set score_table.score=? where score_table.username=?";
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
       
        con.query(t2,[score,username],function(err,result){
            if(!result) {res.status(404).send("error in mysql");console.log(err);}
            else{
                res.status(200).send(this.obj);
                
                console.log('success');
               
            } 
    
        });
        
    });
});

    app.listen(PORT,function(){
        console.log("server running on localhost:"+PORT);
    });
