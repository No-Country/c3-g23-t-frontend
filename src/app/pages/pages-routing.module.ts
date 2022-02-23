import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { GuardService } from '../_service/guard.service';

export const routes: Routes = [
    // { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }