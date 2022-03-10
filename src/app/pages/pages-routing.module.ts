import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegisterCustomComponent } from './register-custom/register-custom.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { UserPurchasesComponent } from './user-purchases/user-purchases.component';
import { ProductUserInfoComponent } from './product-user-info/product-user-info.component';
//import { GuardService } from '../_service/guard.service';

export const routes: Routes = [
  // { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'all-categories', component: CategoriesPageComponent },
  { path: 'all-products', component: ProductsFilterComponent },
  { path: 'user-products', component: UserProductsComponent },
  { path: 'user-purchases', component: UserPurchasesComponent },
  { path: 'user-product-edit/:id', component: ProductUserInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
