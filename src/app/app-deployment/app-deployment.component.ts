import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deployment',
  templateUrl: './app-deployment.component.html',
  styleUrls: ['./app-deployment.component.scss']
})
export class AppDeploymentComponent implements OnInit {
  showProgressBar: boolean = false;
  deployedURl: string = '';
  currentRoute!: string;
  createForm = new FormGroup({
    app_name: new FormControl('', [Validators.required]),
  });

  constructor(private service: RegisterService, private toast: ToastrService, private router: Router, private preRoute: Location) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  onSubmit() {
    this.showProgressBar = true;
    if (this.currentRoute === '/home/app-deployment/deploy/aws') {
      const data = {
        "username": localStorage.getItem("username") ?? '',
        "cluster_name": localStorage.getItem("cluster_name") ?? '',
        "account_name": localStorage.getItem("account_name") ?? '',
        "app_name": this.createForm.value["app_name"],
        "project_name": localStorage.getItem("project_name")
      }

      this.service.createDeployment(data).subscribe((res) => {
        this.showProgressBar = false;
        this.deployedURl = res.endpoint
        this.toast.success("Apllication Deployed Succesfully!, Here is the URL");
      },
        (error) => {
          this.showProgressBar = false;
          this.toast.error(error.error.error)
        })

    } else {
      const data = {
        "username": localStorage.getItem("username") ?? '',
        "cluster_name": localStorage.getItem("cluster_name") ?? '',
        "account_name": localStorage.getItem("account_name") ?? '',
        "gcp_project_key": localStorage.getItem("project_id"),
        "app_name": this.createForm.value["app_name"],
        "project_name": localStorage.getItem("project_name")
      }

      this.service.createGcpDeployment(data).subscribe((res) => {
        this.showProgressBar = false;
        this.deployedURl = res.endpoint
        this.toast.success("Apllication Deployed Succesfully!, Here is the URL");
      },
        (error) => {
          this.showProgressBar = false;
          this.toast.error(error.error.error)
        })
    }
  }

  onCancel() {
    this.preRoute.back();
  }

  get AppName(): FormControl {
    return this.createForm.get("app_name") as FormControl;
  }
}
