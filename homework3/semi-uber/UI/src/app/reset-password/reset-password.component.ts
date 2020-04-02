import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  pasRegexp: "(?=^.{6,}$)((?=.*d)(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
  showChangePass: boolean = false;
  statusOfPassChange: string;
  errorMessage: string;

  changePasswordForm = new FormGroup({
    newPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.pasRegexp)
    ])
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  passwordToogle() {
    this.showChangePass = !this.showChangePass;
  }
  changePassword() {
    const id = this.route.snapshot.paramMap.get("id");
    const newPassword = this.changePasswordForm.get("newPassword").value;
    const token = localStorage.getItem("JWT");
    this.http
      .patch(
        `${env.baseURL}/user/${id}`,
        { id, newPassword },
        { headers: { token } }
      )
      .subscribe((res: any) => {
        this.statusOfPassChange = res.message;
        this.showChangePass = false;
      });
  }
  deleteAccount() {
    const token = localStorage.getItem("JWT");
    const id: string = this.route.snapshot.paramMap.get("id");
    this.http
      .delete(`${env.baseURL}/user/${id}`, {
        headers: {
          token
        }
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(["/"]);
          localStorage.removeItem("JWT");
          localStorage.removeItem("userData");
        } else {
          this.errorMessage = res.error.message;
        }
      });
  }
}
