import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { isAdmin } from './admin.guard';
import { HomepageComponent } from '../homepage/components/homepage/homepage.component';


const routes: Routes = [
  {
    path: '', component: HomepageComponent, canMatch: [isAdmin], children: [
      {
        path: '',
        canActivateChild: [isAdmin],
        children: [
          { path: '', component: DashboardComponent, canMatch: [isAdmin] }
        ]
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
