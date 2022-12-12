import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { Component, Input, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ProviderDetailsComponent } from "../../brands/provider-details/provider-details.component";
import { UserDetailsComponent } from "../../users/user-details/user-details.component";
import { ThrowStmt } from "@angular/compiler";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() pageIndex: number;
  users: any = [];
  type: any;
  paginator = 100;
  constructor(
    private dialog: MatDialog,
    private service: GlobalService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pageIndex = 0;
    this.type = "0";
    this.getusers(2);
  }
  onPaginateChange(event) {
    this.pageIndex = event.pageIndex + 1;
    console.log(JSON.stringify(this.pageIndex), this.pageIndex);
    let status = localStorage.getItem("status_id");
    let type = localStorage.getItem("type");
  }

  getusers(type: any) {
    this.users = [];
    this.service
      .getClients(type)
      .pipe(map((res) => res["data"]))
      .subscribe((response: any) => {
        console.log("Response", type, response);
        this.users = response;
      });
  }

  manageUser(id, status = 0) {

    let body = {
      user_id: id,
      status_id: status,
    };


    this.service.manageUser(body).subscribe((res: any) => {
      // console.log('body data' , body);
      if (res.status === true) {
        if (res.data.status_id == 0) {
          Swal.fire("نجاح", "تم حظر المستخدم بنجاح", "success");
        } else {
          Swal.fire("نجاح", "تم الغاء حظر المستخدم بنجاح", "success");
        }
      }
      console.log(res);
    });
  }



  deleteApp() {
    Swal.fire("نجاح", "تم حذف التطبيق بنجاح", "success");
  }

  orderDetails(user) {
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: { data: user },
      height: "800px",
      width: "800px",
    });
  }


  userDetails(user) {
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data: user,
      height: "800px",
      width: "800px",
    });
  }
}
