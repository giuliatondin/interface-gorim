import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//List of components
import { HomeComponent } from './home/home.component';
import { AgriculturistComponent } from './agriculturists/agriculturist/agriculturist.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { EntrepreneurComponent } from './entrepreneurs/entrepreneur/entrepreneur.component';
import { AgriculturistHistoryComponent } from './agriculturists/agriculturist-history/agriculturist-history.component';
import { EntrepreneurHistoryComponent } from './entrepreneurs/entrepreneur-history/entrepreneur-history.component';
import { MasterComponent } from './master/master.component';
import { WaitingPageComponent } from './waiting-page/waiting-page.component';
import { AlternativeSecondStagePageComponent } from './alternative-second-stage-page/alertnative-second-stage-page.component';

const routes: Routes = [
    {
        //Welcome page
        path: '', 
        component: HomeComponent
    },
    {
        path: ':idJogo/agricultor/:idAgr', //agriculturist
        component: AgriculturistComponent
    },
    {
        path: 'historico-agricultor', //history-agriculturist
        component: AgriculturistHistoryComponent
    },
    {
        path: ':idJogo/empresario/:idEmp', //entrepreneur 
        component: EntrepreneurComponent
    },
    {
        path: 'historico-empresario', //history-entrepreneur
        component: EntrepreneurHistoryComponent
    },
    {
        path: ':idJogo/mestre', //master
        component: MasterComponent
    },
    {
        path: ':idJogo/waitingPage/:idPessoa', //history-entrepreneur
        component: WaitingPageComponent
    },
    {
        path: ':idJogo/segundaEtapa/:idPessoa', //alternative-second-stage-page
        component: AlternativeSecondStagePageComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
