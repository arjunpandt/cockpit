import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-monitoring-managemnet',
  templateUrl: './monitoring-managemnet.component.html',
  styleUrls: ['./monitoring-managemnet.component.scss']
})
export class MonitoringManagemnetComponent implements OnInit {
  tableData: any;
  showProgressBar: boolean = false;
  deletingApplication: boolean = false;
  noData: boolean = false;
  username: string = '';
  currentRoute!: string;

  constructor(private service: RegisterService,
    private router: Router,
  ) { }
  faCheckCircle = faCheckCircle;


  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.username = localStorage.getItem("username") ?? '';
    this.showProgressBar = true;
    if (this.currentRoute === '/home/monitoring/management/aws') {
      this.service.monitoringManagementList({ "username": this.username }).subscribe(
        (res) => {
          this.showProgressBar = false;
          this.tableData = res.data
          if (res.data.length <= 0) this.noData = true;
        },
        (error) => {
          this.showProgressBar = false;
        }
      )
    } else {
      this.service.monitoringGcpManagementList({ "username": this.username }).subscribe(
        (res) => {
          this.showProgressBar = false;
          this.tableData = res.data;
          if (res.data.length <= 0) this.noData = true;
        },
        (error) => {
          this.showProgressBar = false;
        }
      )
    }
  }

  showPassword() {
    Swal.fire({
      title: "<strong style='font-size:30px; color:black'>Credentials</strong>",
      html: "<b >Username</b>: admin <br><br> <b>Password</b>: adminadminadminadminadminadminadminadminadminadminadminadmin ",
      showCloseButton: true,
      confirmButtonText: "Close",
    });
  }

  getCredentials(row: {}) {
    this.showProgressBar = true;
    if (this.currentRoute === '/home/monitoring/management/aws') {
      this.service.grafanaPass(row).subscribe(
        (res) => {
          // this.garafanaPass= res.password
          this.showProgressBar = false
          Swal.fire({
            title: "<strong style='font-size:30px; color:black'>Credentials</strong>",
            html: "<b >Username</b>: Admin <br><br> <b>Password</b>:" + res.password + "",
            showCloseButton: true,
            confirmButtonText: "Close",
          });
        },
        (error) => {
          this.showProgressBar = false
        }

      )
    } else {
      this.service.grafanaGcpPass(row).subscribe(
        (res) => {
          this.showProgressBar = false
          Swal.fire({
            title: "<strong style='font-size:30px; color:black'>Credentials</strong>",
            html: "<b >Username</b>: Admin <br><br> <b>Password</b>:" + res.password + "",
            showCloseButton: true,
            confirmButtonText: "Close",
          });
        },
        (error) => {
          this.showProgressBar = false
        }

      )
    }
  }

  onDelete = (row: any) => {
    this.deletingApplication = true;
    console.log(row);
    if (this.currentRoute === '/home/monitoring/management/aws') {
      this.service.postDeleteMonitoring({ "username": row.username, "account_name": row.account_name, "cluster_name": row.cluster_name, "project_name": row.project_name, "app_name": row.app_name }).subscribe(
        (res) => {
          this.deletingApplication = false;
          // this.tableData = this.tableData.filter((data:any)=>{
          //   console.log(data,row,(data==row));
          //   return data!=row;
          // })
          this.ngOnInit()
        },
        (error) => {
          this.deletingApplication = false;
        }
      )
    } else {
      this.service.postDeleteGcpMonitoring({ "username": row.username, "account_name": row.account_name, "cluster_name": row.cluster_name, "project_name": row.project_name, "app_name": row.app_name, "gcp_project_key": row.project_id }).subscribe(
        (res) => {
          this.deletingApplication = false;
          this.ngOnInit()
        },
        (error) => {
          this.deletingApplication = false;
        }
      )
    }
  }
}
