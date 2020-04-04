import { ActivatedRoute } from "@angular/router";
import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-delete-load",
  templateUrl: "./delete-load.component.html",
  styleUrls: ["./delete-load.component.scss"]
})
export class DeleteLoadComponent implements OnInit {
  @Input() userLoads: any;
  @Input() load: any;
  @Output() userLoadsChange = new EventEmitter();

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  deleteLoad({ _id: id }) {
    const userID = this.route.snapshot.params.id;
    const token = localStorage.getItem("JWT");
    this.http
      .delete(`${env.baseURL}/loads`, {
        headers: {
          load: id,
          userID,
          token
        }
      })
      .subscribe(res => this.removeLoad(id));
  }

  removeLoad(id: string) {
    const userData = this.getLsItem("userData");
    const updatedLogs = userData.customData.loads.filter(
      (load: any) => load._id !== id
    );
    userData.customData.loads = updatedLogs;
    this.userLoads = updatedLogs;
    localStorage.setItem("userData", JSON.stringify(userData));
    this.userLoadsChange.emit(this.userLoads);
  }
}
