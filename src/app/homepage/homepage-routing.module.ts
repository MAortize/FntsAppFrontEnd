import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { authGuard } from '../auth/auth.guard';



const routes: Routes = [
  {
    path: '', component: HomepageComponent, canMatch: [authGuard], children: [
      {
        path: '',
        canActivateChild: [authGuard],
        children: [
          { path: '', loadChildren: () => import('../learn/learn.module').then(m => m.LearnModule) },
          { path: 'go-over', loadChildren: () => import('../go-over/go-over.module').then(m => m.GoOverModule) },
          { path: 'ranking', loadChildren: () => import('../ranking/ranking.module').then(m => m.RankingModule) },
          { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
