import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
})
export class UserPageComponent implements OnInit {
  user: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const token = localStorage.getItem("JWT");
    const userID = this.route.snapshot.paramMap.get("id");
    this.http
      .get(`${env.baseURL}/user/${userID}`, {
        headers: {
          token,
          userID,
        },
      })
      .subscribe((res: any) => {
        this.user = res.data;
        localStorage.setItem("userData", JSON.stringify(this.user));
      });
  }
}
