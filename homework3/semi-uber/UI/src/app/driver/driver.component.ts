import { ActivatedRoute } from "@angular/router";
import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.scss"]
})
export class DriverComponent implements OnInit {
  userTrucks: any[] = this.getLsItem("userData").customData.trucks;
  assigned_loads: any[] = this.getLsItem("userData").customData.assigned_loads;

  trucks = new FormGroup({
    truck: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(2)])
  });
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  addTruck() {
    const userID = this.route.snapshot.paramMap.get("id");
    const token = localStorage.getItem("JWT");
    const truckData = {
      truckType: this.trucks.get("truck").value,
      truckName: this.trucks.get("name").value
    };
    this.http
      .post(
        `${env.baseURL}/trucks`,
        { truckData, userID },
        { headers: { token } }
      )
      .subscribe((res: any) => this.updateTrucks(res.data));
  }

  updateTrucks(newTruck: object) {
    const userData = this.getLsItem("userData");
    userData.customData.trucks.push(newTruck);
    localStorage.setItem("userData", JSON.stringify(userData));
    this.userTrucks.push(newTruck);
  }
}
