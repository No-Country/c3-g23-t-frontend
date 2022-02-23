import  {NgModule} from '@angular/core';


import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        PagesRoutingModule
    ],
    exports: [],
    declarations: [
        CategoriasComponent,
        UsuariosComponent,
        LayoutComponent
    ],
    providers: [],

})

export class PagesModule { }