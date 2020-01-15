import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {MainComponentComponent} from './main-component/main-component.component';
import {SingleProductComponent} from './single-product/single-product.component';


const routes: Routes = [
  {path: 'category/:title', component: CategoryComponent},
  {path: '', component: MainComponentComponent},
  {path: 'products/:id', component: SingleProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
