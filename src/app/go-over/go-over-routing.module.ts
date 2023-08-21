import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoOverViewComponent } from './components/go-over-view/go-over-view.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: GoOverViewComponent, canMatch:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoOverRoutingModule { }
