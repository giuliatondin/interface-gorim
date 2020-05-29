import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//List of components
import { AgriculturistComponent } from './agriculturists/agriculturist/agriculturist.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ParcelComponent } from './agriculturists/parcel/parcel.component';


const routes: Routes = [
  {
    //Welcome page, only for tests
    path: '', 
    component: ParcelComponent
  },
  { path: 'agriculturist',
    component: AgriculturistComponent
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
