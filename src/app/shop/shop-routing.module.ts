import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ShopViewComponent, canMatch:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
