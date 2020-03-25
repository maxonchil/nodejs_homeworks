import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-regestration-page",
  templateUrl: "./regestration-page.component.html",
  styleUrls: ["./regestration-page.component.scss"]
})
export class RegestrationPageComponent implements OnInit {
  emailRegexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  passwordRegexp = "(?:[A-Z]+)(?:[a-z]+)(?:[0-9]+)(?:[@!#$%^&*()]+)";
  loginRegexp = ".{5,10}";

  userData = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(this.loginRegexp)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.passwordRegexp)
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(this.emailRegexp)
    ])
  });
  constructor() {}

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
}
