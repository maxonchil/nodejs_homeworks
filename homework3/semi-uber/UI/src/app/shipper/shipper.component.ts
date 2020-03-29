import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-shipper",
  templateUrl: "./shipper.component.html",
  styleUrls: ["./shipper.component.scss"]
})
export class ShipperComponent implements OnInit {
  userLoads: any[] = this.getLsItem("userData").customData.loads;
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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getLsItem(item: string) {
    return JSON.parse(localStorage.getItem(item));
  }

  deleteLoad({ _id: id }) {
    this.http
      .delete(`${env.baseURL}/loads/delete`, {
        headers: {
          load: id
        }
      })
      .subscribe(res => this.clearLoad(id));
  }

  updateLoads(newLoad: object) {
    const userData = this.getLsItem("userData");
    userData.customData.loads.push(newLoad);
    localStorage.setItem("userData", JSON.stringify(userData));
    this.userLoads.push(newLoad);
  }

  clearLoad(id: string) {
    this.userLoads.filter((load: any) => load._id !== id);
    const updatedData = this.getLsItem("userData").customData.loads.filter(
      (load: any) => load._id !== id
    );
    localStorage.set("userData", updatedData);
  }

  addLoad() {
    const id = this.route.snapshot.paramMap.get("id");
    const loadData = {
      id,
      dimensions: {
        width: this.loadGroup.get("width").value,
        height: this.loadGroup.get("height").value,
        length: this.loadGroup.get("length").value
      },
      payload: this.loadGroup.get("payload").value
    };

    this.http.post(`${env.baseURL}/loads`, loadData).subscribe((res: any) => {
      this.updateLoads(res.data);
    });
  }
}
