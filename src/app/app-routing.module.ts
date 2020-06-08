import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//List of components
import { AgriculturistComponent } from './agriculturists/agriculturist/agriculturist.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { EntrepreneurComponent } from './entrepreneurs/entrepreneur/entrepreneur.component';


const routes: Routes = [
  {
    //Welcome page, only for tests
    path: '', 
    component: AgriculturistComponent
  },
  { path: 'agricultor', //agriculturist
    component: AgriculturistComponent
  },
  { path: 'empresario', //entrepreneur 
    component: EntrepreneurComponent
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
