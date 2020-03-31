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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  postLoad({ _id: id }) {
    this.http
      .patch(`${env.baseURL}/loads`, { loadID: id, status: "POSTED" })
      .subscribe((res: any) => {
        if (res.status) {
          this.changeLoadStatus(res, id);
        } else {
          this.responseText = res.data.message;
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
        return load;
      }
      return load;
    });
    const userData = this.getLsItem("userData");
    const { loads } = userData.customData;
    loads.map((load: any) => {
      if (load._id === id) {
        load.status = res.data.status;
        return load;
      }
      return load;
    });
    localStorage.setItem("userData", JSON.stringify(userData));
  }
}
