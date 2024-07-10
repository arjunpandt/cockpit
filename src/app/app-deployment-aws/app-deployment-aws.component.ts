import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-deployment-aws',
  templateUrl: './app-deployment-aws.component.html',
  styleUrls: ['./app-deployment-aws.component.scss']
})
export class AppDeploymentAwsComponent implements OnInit {
  showProgressBar: boolean = false;
  createForm= new FormGroup({
    githuburl: new FormControl('',[Validators.required]),
    repo_type: new FormControl('',[Validators.required]),
    private_token: new FormControl(''),
    project_name: new FormControl('',[Validators.required]),
    branch: new FormControl('',[Validators.required])
  });

  constructor(private service:RegisterService, private toast:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(){
   
    if(this.createForm.value["repo_type"]==="private_repo"){
      const data= {
        "githuburl": this.createForm.value["githuburl"]?.replace(/https?:\/\//, ''),
        "private_token": this.createForm.value["private_token"],
        "project_name": this.createForm.value["project_name"],
        "branch": this.createForm.value["branch"]
      }
      console.log("private repo");
      debugger;
      this.service.clonePrivateRepositoty(data).subscribe((res)=>{
        console.log(res);
        this.toast.success(res.msg);
      },
      (error) => {
        this.toast.error(error.error.error)
      })
    } else{
      const data= {
        "githuburl": this.createForm.value["githuburl"]?.replace(/https?:\/\//, ''),
        "project_name": this.createForm.value["project_name"],
        "branch": this.createForm.value["branch"]
      }
      console.log("public repo");
      this.service.clonePublicRepositoty(data).subscribe((res)=>{
        console.log(res);
        this.toast.success(res.msg)
      },
      (error) => {
        console.log(error.error);
        
        this.toast.error(error.error.error)
      })
    }
  }

  get GithubURL():FormControl{
    return this.createForm.get("githuburl") as FormControl;
  }
  get RepoType():FormControl{
    return this.createForm.get("repo_type") as FormControl;
  }
  get PrivateToken():FormControl{
    return this.createForm.get("private_token") as FormControl;
  }
  get ProjectName():FormControl{
    return this.createForm.get("project_name") as FormControl;
  }
  get Branch():FormControl{
    return this.createForm.get("branch") as FormControl;
  }
}
