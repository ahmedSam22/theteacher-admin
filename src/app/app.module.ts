import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './components/home/home.component';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import { ConnectionServiceModule } from 'ng-connection-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { EditProductComponent } from './components/products/edit-product/edit-product.component';
// import { AddProductComponent } from './components/products/add-product/add-product.component';
// import { DetailsProductComponent } from './components/products/details-product/details-product.component';
// import { ListProductsComponent } from './components/products/list-product/list-product.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    LoginComponent,
    HomeComponent,
    WrongRouteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ConnectionServiceModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
