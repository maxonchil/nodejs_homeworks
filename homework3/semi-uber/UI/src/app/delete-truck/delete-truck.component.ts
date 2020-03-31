import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-delete-truck",
  templateUrl: "./delete-truck.component.html",
  styleUrls: ["./delete-truck.component.scss"]
})
export class DeleteTruckComponent implements OnInit {
  @Input() userTrucks: any;
  @Input() truck: any;
  @Output() updateUserTrucks = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  deleteTruck({ _id: id }) {
    this.http
      .delete(`${env.baseURL}/trucks`, {
        headers: {
          truck: id
        }
      })
      .subscribe(res => this.removeTruck(id));
  }

  removeTruck(id: string) {
    const userData = this.getLsItem("userData");
    const updatedTrucks = userData.customData.trucks.filter(
      (truck: any) => truck._id !== id
    );
    userData.customData.trucks = updatedTrucks;
    localStorage.setItem("userData", JSON.stringify(userData));

    this.userTrucks = updatedTrucks;
    this.updateUserTrucks.emit(this.userTrucks);
  }
}
