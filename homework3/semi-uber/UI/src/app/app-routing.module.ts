import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegestrationPageComponent } from "./regestration-page/regestration-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "registration",
    component: RegestrationPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
