import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'studentlist',component:StudentlistComponent},
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'employees-list', component: EmployeesListComponent },
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }