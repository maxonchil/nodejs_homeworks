import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ShipperComponent } from "./shipper/shipper.component";
import { DeleteLoadComponent } from "./delete-load/delete-load.component";
import { PostLoadComponent } from "./post-load/post-load.component";
import { UpdateLoadComponent } from "./update-load/update-load.component";
import { DriverComponent } from "./driver/driver.component";
import { AssignTruckComponent } from "./assign-truck/assign-truck.component";
import { DeleteTruckComponent } from './delete-truck/delete-truck.component';
import { UpdateTruckComponent } from './update-truck/update-truck.component';
import { AssignedLoadsComponent } from './assigned-loads/assigned-loads.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    UserPageComponent,
    ResetPasswordComponent,
    ShipperComponent,
    DeleteLoadComponent,
    PostLoadComponent,
    UpdateLoadComponent,
    DriverComponent,
    AssignTruckComponent,
    DeleteTruckComponent,
    UpdateTruckComponent,
    AssignedLoadsComponent,
    AvatarComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
