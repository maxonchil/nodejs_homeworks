import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-assigned-loads",
  templateUrl: "./assigned-loads.component.html",
  styleUrls: ["./assigned-loads.component.scss"]
})
export class AssignedLoadsComponent implements OnInit {
  @Input() load: any;
  @Input() assigned_loads: any;
  @Input() userTrucks: any;
  @Output() updatedAssign = new EventEmitter();
  @Output() updatedUserTrucks = new EventEmitter();
  errorMessage: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  arrived({ _id: loadID }) {
    const driverID = this.route.snapshot.params.id;
    const token = localStorage.getItem("JWT");
    this.http
      .patch(
        `${env.baseURL}/service`,
        { loadID, driverID },
        { headers: { token } }
      )
      .subscribe((res: any) => {
        if (res.success) {
          return this.removeAssignedLoad();
        }
        return (this.errorMessage = res.error.message);
      });
  }

  removeAssignedLoad() {
    const userData = this.getLsItem("userData");
    userData.customData.assigned_loads = [];
    localStorage.setItem("userData", JSON.stringify(userData));

    this.userTrucks.map((truck: any) => {
      if (truck.status === "OL") {
        return (truck.status = "IS");
      }
      return truck;
    });

    this.assigned_loads = [];
    this.updatedAssign.emit(this.assigned_loads);
    this.updatedUserTrucks.emit(this.userTrucks);
  }
}
