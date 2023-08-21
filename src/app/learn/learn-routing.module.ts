import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnViewComponent } from './components/learn-view/learn-view.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: LearnViewComponent, canMatch:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
