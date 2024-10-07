import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployed',
  templateUrl: './deployed.component.html',
  styleUrls: ['./deployed.component.scss']
})
export class DeployedComponent implements OnInit {
  tableData: any;
  showProgressBar: boolean = false;
  deletingApplication: boolean = false;
  noData: boolean = false;
  username: string = '';
  currentRoute!: string;

  constructor(private service: RegisterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.showProgressBar = true;
    this.username = localStorage.getItem("username") ?? '';
    if (this.currentRoute === '/home/app-management/aws') {
      this.service.applicationManagement({ "username": this.username }).subscribe(
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
      this.service.applicationGcpManagement({ "username": this.username }).subscribe(
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

  onDelete = (row: any) => {
    this.deletingApplication = true;
    if (this.currentRoute === '/home/app-management/aws') {
      this.service.postDeleteDeployment({ "username": row.username, "account_name": row.account_name, "cluster_name": row.cluster_name, "project_name": row.project_name, "app_name": row.app_name }).subscribe(
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
      this.service.postDeleteGcpDeployment({ "username": row.username, "account_name": row.account_name, "cluster_name": row.cluster_name, "project_name": row.project_name, "app_name": row.app_name, "gcp_project_key": row.project_id }).subscribe(
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
    }
  }
}
