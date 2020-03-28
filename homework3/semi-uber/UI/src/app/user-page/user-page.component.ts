import { UserShipper } from "./../interfaces/user-shipper.inerfase copy";
import { UserDriver } from "./../interfaces/user-driver.inerfase";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent implements OnInit {
  

  user: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserData();
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
