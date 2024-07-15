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
    username: new FormControl('',[Validators.required]),
    repo_type: new FormControl('',[Validators.required]),
    private_token: new FormControl(''),
    project_name: new FormControl('',[Validators.required]),
    branch: new FormControl('',[Validators.required])
  });

  constructor(private service:RegisterService, private toast:ToastrService, private router: Router, private preRoute:Location) { }

  ngOnInit(): void {
  }

  onSubmit(){
   
    if(this.createForm.value["repo_type"]==="private_repo"){
      const data= {
        "username": this.createForm.value["username"]?.replace(/https?:\/\//, ''),
        "private_token": this.createForm.value["private_token"],
        "project_name": this.createForm.value["project_name"],
        "branch": this.createForm.value["branch"]
      }
      console.log("private repo");
      debugger;
      this.service.clonePrivateRepositoty(data).subscribe((res)=>{
        console.log(res);
        this.toast.success(res.msg);
        this.router.navigate(["/home/app-deployment/select-cloud"])
      },
      (error) => {
        this.toast.error(error.error.error)
      })
    } else{
      const data= {
        "username": this.createForm.value["username"]?.replace(/https?:\/\//, ''),
        "project_name": this.createForm.value["project_name"],
        "branch": this.createForm.value["branch"]
      }
      console.log("public repo");
      this.service.clonePublicRepositoty(data).subscribe((res)=>{
        console.log(res);
        this.toast.success(res.msg)
        this.router.navigate(["/home/app-deployment/select-cloud"])
      },
      (error) => {
        console.log(error.error);
        
        this.toast.error(error.error.error)
      })
    }
  }

  onCancel(){
    console.log("test");
    // this.router.navigate(["/home/cloud-selection/aws/aws2"]);
    this.preRoute.back();
  }

  get UserName():FormControl{
    return this.createForm.get("username") as FormControl;
  }
  get ProjectName():FormControl{
    return this.createForm.get("project_name") as FormControl;
  }
  get AppName():FormControl{
    return this.createForm.get("branch") as FormControl;
  }
}
