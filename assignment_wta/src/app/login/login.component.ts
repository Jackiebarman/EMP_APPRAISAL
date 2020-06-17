
// import { EnrollmentService } from './../enrollment.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public userModel=new User('','','','',+91,'','','');
 correct=0;
 
 
 clicked=0
 student: {username,password} = {username:"", password:""};
  constructor(public _http:HttpClient,public router:Router,private homeservice:UsersService) { }
  geturl()
  {
    return "url('assets/blur2.jpg')";
  }
  getsize()
  {
    return "120%";
  }
  onSubmit(){
    this.clicked=1;
    this._http.post<any>('http://localhost:3000/login',this.userModel)
    .subscribe((data)=>{
      console.log("success data received",data.EXIST);
      if(data.EXIST)
      {this.router.navigate(['add-employee']);
      this.correct=1;}
      },(error)=> console.log('error in loginComp',error)
    )
  }

  ngOnInit() {    
  }
  Submit()
  {
    
    this.student.username = this.userModel.username;
    this.student.password = this.userModel.password;
    console.log(this.student);
    console.log(this.userModel);
    this.homeservice.createstudent(this.student);
    this.student = {username:"", password:""};
  }

}






