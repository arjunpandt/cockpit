import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-deployed',
  templateUrl: './deployed.component.html',
  styleUrls: ['./deployed.component.scss']
})
export class DeployedComponent implements OnInit {
  tableData: any;
  showProgressBar: boolean = false;
  deletingApplication: boolean = false;
  noData:boolean=false;

  constructor(private service: RegisterService) { }

  ngOnInit(): void {
    this.showProgressBar = true;
    this.service.applicationManagement({ "username": "abhidevops", "account_name": "cockpit" }).subscribe(
      (res) => {
        this.showProgressBar = false;
        this.tableData = res.data
        console.log(res.data.length);
        if(res.data.length<=0) this.noData=true;
      },
      (error) => {
        this.showProgressBar = false;
        console.log(error);

      }
    )
  }

  onDelete = (row: any) => {
    this.deletingApplication = true;
    console.log(row);
    
    console.log(this.tableData);
    
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
        console.log(error);

      }
    )
  }



}
