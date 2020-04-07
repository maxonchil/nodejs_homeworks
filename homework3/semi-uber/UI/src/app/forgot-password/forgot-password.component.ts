import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  resetResult = false;
  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {}

  forgotPassword() {
    const userID = this.router.snapshot.params.id;
    const token = localStorage.getItem("JWT");
    this.http
      .get(`${env.baseURL}/user/${userID}/reset-password`, {
        headers: { token },
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.resetResult = true;
        }
      });
  }
}
