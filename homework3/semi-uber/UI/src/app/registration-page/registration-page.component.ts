import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { RegistrationModel } from "../interfaces/registration.inteface";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.scss"]
})
export class RegistrationPageComponent implements OnInit {
  user: RegistrationModel;
  errorFillFields = false;
  pasRegexp: "(?=^.{6,}$)((?=.*d)(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
  logRegexp: ".{5,10}";

  userData = new FormGroup({
    name: new FormControl("", [Validators.required]),
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(this.logRegexp)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.pasRegexp)
    ]),
    email: new FormControl("", [
      Validators.min(4),
      Validators.required,
      Validators.email
    ]),
    status: new FormControl("", [Validators.required])
  });
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  get password() {
    return this.userData.get("password");
  }

  get email() {
    return this.userData.get("email");
  }
  get username() {
    return this.userData.get("username");
  }

  registrateUser() {
    const inputs = this.userData.value;
    const name = inputs.name;
    const username = inputs.username;
    const password = inputs.password;
    const email = inputs.email;
    const status = inputs.status;

    const userData = [name, username, password, email, status];
    const clearField = userData.some(e => e === "");
    if (clearField) {
      console.error("All fields must be filled");
      this.errorFillFields = true;
      throw new Error();
    }
    this.errorFillFields = false;
    this.user = {
      name,
      username,
      password,
      email,
      status
    };
    this.http
      .post(env.regUrl, this.user, { observe: "response" })
      .subscribe((res: any) => {
        localStorage.setItem("JWT", res.body.token);
        this.router.navigate(["/user", res.body.id]);
      });
    // this.router.navigate(["/user/:1"]);
  }
}
