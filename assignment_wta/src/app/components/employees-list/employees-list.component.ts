import { Employee } from './../../shared/employee';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {HostListener} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  EmployeeData: any = [];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'employee_name', 'employee_email','gender', 'section','dept','empcode','sp','punc','or','action'];
  geturl()
   {
     return "url('assets/blur1.jpg')";
   }
   geturl2()
   {
     return "url('assets/blur1.jpg')";
   }
   getsize()
   {
     return "90%";
   }
  constructor(private employeeApi: ApiService) {
    this.employeeApi.GetEmployees().subscribe(data => {
      this.EmployeeData = data;
      this.dataSource = new MatTableDataSource<Employee>(this.EmployeeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
   }

   @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  deleteEmployee(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.employeeApi.DeleteEmployee(e._id).subscribe()
    }
  }

}