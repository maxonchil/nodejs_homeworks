import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-update-load",
  templateUrl: "./update-load.component.html",
  styleUrls: ["./update-load.component.scss"]
})
export class UpdateLoadComponent implements OnInit {
  @Input() userLoads: any;
  @Input() load: any;
  @Input() loadGroup: any;

  updateStatus: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  updateLoad({ _id: id }) {
    const { dimensions, payload } = this.userLoads.find(e => e._id === id);
    dimensions.width = Number(dimensions.width);
    dimensions.height = Number(dimensions.height);
    dimensions.length = Number(dimensions.length);
    const postBody = { dimensions, payload, id };
    this.http
      .put(`${env.baseURL}/loads`, postBody)
      .subscribe((res: any) => (this.updateStatus = res.data.status));
  }
}
