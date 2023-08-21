import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingViewComponent } from './components/ranking-view/ranking-view.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: RankingViewComponent, canMatch:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingRoutingModule { }
