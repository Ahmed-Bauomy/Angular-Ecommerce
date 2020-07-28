import { ErrorComponent } from './../Components/error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'Dashboard',outlet:'Dashboard',component:DashboardComponent},
  {path:'',outlet:'Dashboard',component:DashboardComponent},
  {path:'**',outlet:'Dashboard',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
