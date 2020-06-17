import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
 students;
 student;
 selectedstudent;
  constructor(private homeservice:UsersService) { 
    
  }
  geturl()
  {
    return "url('assets/d1.jpg')";
  }
  getsize()
  {
    return "50%";
  }
  ngOnInit() {
    this.students = this.homeservice.getstudents();
    console.log(this.students[0].username);
  }
  public selectstudent(student){
    this.selectedstudent=student;
  }

}
