import { UserShipper } from "./../interfaces/user-shipper.inerfase copy";
import { UserDriver } from "./../interfaces/user-driver.inerfase";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent implements OnInit {
  pasRegexp: "(?=^.{6,}$)((?=.*d)(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
  showChangePass: boolean = false;
  statusOfPassChange: string;

  user: any = {};

  changePasswordForm = new FormGroup({
    newPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.pasRegexp)
    ])
  });
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  passwordToogle() {
    this.showChangePass = !this.showChangePass;
  }
  changePassword() {
    const id = this.route.snapshot.paramMap.get("id");
    const newPassword = this.changePasswordForm.get("newPassword").value;
    this.http
      .patch(`${env.baseURL}/user/${id}`, { id, newPassword })
      .subscribe((res: any) => {
        this.statusOfPassChange = res.message;
        this.showChangePass = false;
      });
  }
  deleteAccount() {
    const id: string = this.route.snapshot.paramMap.get("id");
    this.http.delete(`${env.baseURL}/user/${id}`).subscribe(() => {
      this.router.navigate(["/"]);
      localStorage.removeItem("JWT");
    });
  }

  getUserData() {
    const token = localStorage.getItem("JWT");
    const id = this.route.snapshot.paramMap.get("id");
    this.http
      .get(`${env.baseURL}/user/${id}`, {
        headers: {
          token
        }
      })
      .subscribe(
        (res: any) => (
          (this.user.name = res.data.name),
          (this.user.username = res.data.username),
          (this.user.status = res.data.status),
          (this.user.email = res.data.email)
        )
      );
  }
}
