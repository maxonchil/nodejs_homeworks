import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-update-truck",
  templateUrl: "./update-truck.component.html",
  styleUrls: ["./update-truck.component.scss"]
})
export class UpdateTruckComponent implements OnInit {
  @Input() userTrucks: any;
  @Input() truck: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  updateTruck({ name: updatedName, _id: truckID }) {
    this.http
      .put(`${env.baseURL}/trucks`, { updatedName, truckID })
      .subscribe();
  }
}
