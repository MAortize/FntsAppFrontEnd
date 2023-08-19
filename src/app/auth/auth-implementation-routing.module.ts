import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'authpage', component: AuthCardComponent },
  { path: 'learn', loadChildren: () => import('../homepage/homepage.module').then(m => m.HomepageModule)},
  { path: '', redirectTo: 'authpage', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
