import { ActivatedRoute } from "@angular/router";
import { environment as env } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  @Input() user: any;
  @Output() updAwatar = new EventEmitter();
  avatarFile: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getImage(event) {
    this.avatarFile = event.target.files[0];
  }

  sendImage() {
    const formData = new FormData();
    formData.append("avatar", this.avatarFile, this.avatarFile.name);
    const userID = this.route.snapshot.params.id;
    const token = localStorage.getItem("JWT");
    this.http
      .post(
        `${env.baseURL}/uploads`,

        formData,
        {
          headers: {
            userID,
            token,
          },
        }
      )
      .subscribe((res: any) => {
        this.user.avatar = res.data.avatar;
        const user = JSON.parse(localStorage.getItem("userData"));
        user.avatar = res.data.avatar;
        localStorage.setItem("userData", JSON.stringify(user));
        this.updAwatar.emit(this.user.avatar);
      });
  }
}
