import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthService } from '../auth/services/auth.service';
import { authGuard } from '../auth/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LearnComponent } from './components/learn/learn.component';
import { GoOverComponent } from './components/go-over/go-over.component';
import { ShopComponent } from './components/shop/shop.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, canMatch:[authGuard], children: [
    {
      path: '',
      canActivateChild: [authGuard],
      children: [
        { path: '', component: LearnComponent },
        { path: 'go-over', component: GoOverComponent },
        { path: 'shop', component: ShopComponent },
        { path: 'profile', component: ProfileComponent },
      ]
    }

  ]
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
