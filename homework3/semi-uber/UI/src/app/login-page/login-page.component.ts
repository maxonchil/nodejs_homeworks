import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ])
  });
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const inputs = this.loginForm.value;
    const user = {
      username: inputs.username,
      password: inputs.password
    };
    this.http.post(`${env.baseURL}/login`, user).subscribe((res: any) => {
      localStorage.setItem("JWT", res.data.token);
      this.router.navigate(["/user", res.data.id]);
    });
  }
}
