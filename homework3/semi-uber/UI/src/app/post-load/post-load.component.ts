import { ActivatedRoute } from "@angular/router";
import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-load",
  templateUrl: "./post-load.component.html",
  styleUrls: ["./post-load.component.scss"]
})
export class PostLoadComponent implements OnInit {
  @Input() userLoads: any;
  @Input() load: any;

  responseText;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  postLoad({ _id: id, created_by: userID }) {
    const token = localStorage.getItem("JWT");
    this.http
      .put(
        `${env.baseURL}/service`,
        { loadID: id, userID },
        { headers: { token } }
      )
      .subscribe((res: any) => {
        if (res.success) {
          return this.changeLoadStatus(res, id);
        } else {
          console.log("False: ", res);
          return (this.responseText = res.error.message);
        }
      });
  }

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  changeLoadStatus(res: any, id: string) {
    this.userLoads.map(load => {
      if (load._id === id) {
        load.status = res.data.status;
        load.state = res.data.state;
        load.assigned_to = res.data.assigned_to;
        return load;
      }
      return load;
    });
    console.log("LOCALE OBJ:\n", this.userLoads);
    const userData = this.getLsItem("userData");
    const { loads } = userData.customData;
    loads.map((load: any) => {
      if (load._id === id) {
        load.status = res.data.status;
        load.state = res.data.state;
        load.assigned_to = res.data.assigned_to;
        return load;
      }
      return load;
    });
    localStorage.setItem("userData", JSON.stringify(userData));
  }
}
