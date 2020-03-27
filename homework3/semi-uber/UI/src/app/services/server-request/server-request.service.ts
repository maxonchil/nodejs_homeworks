import { Observable } from "rxjs";
import { environment as env } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ServerRequestService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  sendGetRequest(adress: string): Observable<T> {
    const token = localStorage.getItem("JWT");
    const id = this.route.snapshot.paramMap.get("id");
    this.http.get(`${env.baseURL}/${adress}/${id}`, {
      headers: {
        token
      }
    });
  }
  sendPostRequest() {}
}
