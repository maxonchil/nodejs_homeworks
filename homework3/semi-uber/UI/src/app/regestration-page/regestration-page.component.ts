import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { RegistrationModel } from "../interfaces/registration.inteface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment as env } from "../../environments/environment";

@Component({
  selector: "app-regestration-page",
  templateUrl: "./regestration-page.component.html",
  styleUrls: ["./regestration-page.component.scss"]
})
export class RegestrationPageComponent implements OnInit {
  emailRegexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  passwordRegexp = "(?:[A-Z]+)(?:[a-z]+)(?:[0-9]+)(?:[@!#$%^&*()]+)";
  loginRegexp = ".{5,10}";

  user: RegistrationModel;
  formField = false;

  userData = new FormGroup({
    name: new FormControl(""),
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(this.loginRegexp)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.passwordRegexp)
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    status: new FormControl("")
  });
  constructor(private http: HttpClient) {}

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

  getRegForm() {
    const inputs = this.userData.value;
    const name = inputs.name;
    const username = inputs.username;
    const password = inputs.password;
    const email = inputs.email;
    const status = inputs.status;

    const userData = [name, username, password, email, status];
    userData.map(e => {
      if (e === undefined) {
        console.error("All fields must be filled");
        this.formField = true;
        return;
      }
    });

    this.user = {
      name,
      username,
      password,
      email,
      status
    };
    this.http
      .post(env.regUrl, this.user)
      .subscribe(data => console.log(data));
  }
}
