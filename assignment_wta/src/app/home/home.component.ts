import { Component, OnInit } from '@angular/core';
declare const myfun:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  callfun(){
    myfun();
  }
  constructor() { }
  geturl()
  {
    return "url('assets/green.jpg')";
  }
  getsize()
  {
    return "95%";
  }
  ngOnInit() {
  }

}
