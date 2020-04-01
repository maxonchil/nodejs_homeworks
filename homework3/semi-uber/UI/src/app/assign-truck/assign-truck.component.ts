import { ActivatedRoute } from "@angular/router";
import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-assign-truck",
  templateUrl: "./assign-truck.component.html",
  styleUrls: ["./assign-truck.component.scss"]
})
export class AssignTruckComponent implements OnInit {
  @Input() truck: any;
  @Input() userTrucks: any;
  @Output() assigned = new EventEmitter();

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  asignTruck({ _id: id }) {
    const userID = this.route.snapshot.params.id;
    const token = localStorage.getItem("JWT");
    this.http
      .patch(
        `${env.baseURL}/trucks`,
        { truckID: id, userID },
        { headers: { token } }
      )
      .subscribe((res: any) => this.updateAssignStatus(res.data, id));
  }

  updateAssignStatus(userID: string, truckID: string) {
    this.userTrucks.map((truck: any) => {
      if (truck._id === truckID) {
        truck.assigned_to = userID;
        return truck;
      }
      return (truck.assigned_to = null);
    });

    const userData = this.getLsItem("userData");
    const { trucks } = userData.customData;
    trucks.map((truck: any) => {
      if (truck._id === truckID) {
        truck.assigned_to = userID;
        return truck;
      }
      return (truck.assigned_to = null);
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    this.assigned.emit(this.userTrucks);
  }
}
