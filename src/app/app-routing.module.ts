import { UsersModule } from './components/users/users.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CategoryModule } from './components/category/category.module';
import { OrdersModule } from './components/orders/orders.module';
import { ProviderModule } from './components/brands/provider.module';
import { CountryModule } from './components/country/country.module';
import { CityModule } from './components/city/city.module';
import { SubcategoriesModule } from './components/subcategories/subcategories.module';
import { ProductsModule } from './components/car_models/products.module';
import { BannersModule } from './components/banners/banners.module';
import { SizesModule } from './components/complaints/sizes.module';
import { OccasionsModule } from './components/yearofcreation/occasions.module';
import { TagsModule } from './components/questions/tags.module';
import { MaintainersModule } from './components/maintainers/maintainers.module';
import { DeliveryModule } from './components/deliveries/deliveries.module';
import {ColorsModule} from './components/colors/colors.module';
import {TermsModule} from './components/terms-and-conditions/terms.module'
import { TaxesModule } from './components/taxes/taxes.module';
import { PricesModule } from './components/prices/prices.modules';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'auth/login',component:LoginComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      {path:'home',component:HomeComponent, data: { title: 'الصفحة الرئيسية' }},
    ]
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      {path:'users',loadChildren:()=>UsersModule},
      {path:'maintainer',loadChildren:()=>MaintainersModule},
      {path:'deliveries',loadChildren:()=>DeliveryModule},
      {path:'brands',loadChildren:()=>ProviderModule},
      {path:'orders',loadChildren:()=>OrdersModule},
      {path:'country',loadChildren:()=>CountryModule},
      {path:'city',loadChildren:()=>CityModule},
      {path:'services',loadChildren:()=>CategoryModule},
      {path:'sub',loadChildren:()=>SubcategoriesModule},
      {path:'car-models',loadChildren:()=>ProductsModule},
      {path:'banners',loadChildren:()=>BannersModule},
      {path:'complaints',loadChildren:()=>SizesModule},
      {path:'yearofcreation',loadChildren:()=>OccasionsModule},
      {path:'question',loadChildren:()=>TagsModule},
      {path:'colors',loadChildren:()=>ColorsModule},
      {path:'terms',loadChildren:()=>TermsModule},
      {path:'taxes',loadChildren:()=>TaxesModule},
      {path:'prices',loadChildren:()=>PricesModule},
      
      
    ]
  },
  {
    path        : '**',
    pathMatch   : 'full',
    component   : WrongRouteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
