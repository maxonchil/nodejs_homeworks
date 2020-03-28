import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shipper",
  templateUrl: "./shipper.component.html",
  styleUrls: ["./shipper.component.scss"]
})
export class ShipperComponent implements OnInit {
  numberPatter = "[0-9]+";

  loadGroup = new FormGroup({
    width: new FormControl("", [
      Validators.required,
      Validators.pattern(this.numberPatter)
    ]),
    height: new FormControl("", [
      Validators.required,
      Validators.pattern(this.numberPatter)
    ]),
    length: new FormControl("", [
      Validators.required,
      Validators.pattern(this.numberPatter)
    ]),
    payload: new FormControl("", [
      Validators.required,
      Validators.pattern(this.numberPatter)
    ])
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  addLoad() {
    const loadData = {
      dimensions: {
        width: this.loadGroup.get("width").value,
        height: this.loadGroup.get("height").value,
        length: this.loadGroup.get("length").value
      },
      payload: this.loadGroup.get("payload").value
    };

    this.http
      .post(`${env.baseURL}/loads`, loadData)
      .subscribe(res => console.log(res));
  }
}
