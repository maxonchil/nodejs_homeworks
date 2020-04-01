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
  @Input() assignedLoads: any;
  @Output() updatedAssign = new EventEmitter();
  errorMessage: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  arrived({ _id: loadID }) {
    const driverID = this.route.snapshot.params.id;
    this.http
      .patch(`${env.baseURL}/service`, { loadID, driverID })
      .subscribe((res: any) => {
        if (res.success) {
          return this.removeAssignedLoad();
        }
        return (this.errorMessage = res.error.message);
      });
  }

  removeAssignedLoad() {
    const userData = this.getLsItem("userData");
    userData.customData.assignedLoads = [];
    localStorage.setItem("userData", JSON.stringify(userData));

    this.assignedLoads = [];
    this.updatedAssign.emit(this.assignedLoads);
  }
}
