import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
//import { GuardService } from '../_service/guard.service';

export const routes: Routes = [
    { path : '', redirectTo: 'usuarios', pathMatch: 'full' },
    { path : 'usuarios', component:	UsuariosComponent },
    { path  : 'categorias', component:	CategoriasComponent },
    // { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }