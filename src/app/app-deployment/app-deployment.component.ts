import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-deployment',
  templateUrl: './app-deployment.component.html',
  styleUrls: ['./app-deployment.component.scss']
})
export class AppDeploymentComponent implements OnInit {
  showProgressBar: boolean = false;
  createForm= new FormGroup({
    app_name: new FormControl('',[Validators.required]),
  });

  constructor(private service:RegisterService, private toast:ToastrService, private router: Router, private preRoute:Location) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.showProgressBar = true;
    const data= {
      "username": localStorage.getItem("username") ?? '',
      "cluster_name": localStorage.getItem("cluster_name") ?? '',
      "account_name": localStorage.getItem("account_name") ?? '',
      "app_name": this.createForm.value["app_name"],
      "project_name":localStorage.getItem("project_name")
    }

    this.service.crateDeployment(data).subscribe((res)=>{
      this.showProgressBar = false;
      console.log(res);
      this.toast.success(res.msg);
      window.open(res.endpoint,'_blank')
    },
    (error) => {
      this.showProgressBar = false;
      this.toast.error(error.error.error)
    })

  }

  onCancel(){
    console.log("test");
    // this.router.navigate(["/home/cloud-selection/aws/aws2"]);
    this.preRoute.back();
  }

  get AppName():FormControl{
    return this.createForm.get("app_name") as FormControl;
  }
}
