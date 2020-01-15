import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {MainComponentComponent} from './main-component/main-component.component';


const routes: Routes = [
  {path: 'category/:title', component: CategoryComponent},
  {path : '', component: MainComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
