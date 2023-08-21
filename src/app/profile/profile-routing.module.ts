import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileViewComponent, canMatch:[authGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
