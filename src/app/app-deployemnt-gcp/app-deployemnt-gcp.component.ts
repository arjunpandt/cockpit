import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-deployemnt-gcp',
  templateUrl: './app-deployemnt-gcp.component.html',
  styleUrls: ['./app-deployemnt-gcp.component.scss']
})
export class AppDeployemntGcpComponent implements OnInit {
  showProgressBar: boolean = false;
  createForm = new FormGroup({
  githuburl: new FormControl('', [Validators.required]),
  repo_type: new FormControl('', [Validators.required]),
  private_token: new FormControl(''),
  project_name: new FormControl('', [Validators.required]),
  project_id: new FormControl('', [Validators.required]),
  branch: new FormControl('', [Validators.required])
});

  constructor(private service: RegisterService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // this.router.navigate(["/home/app-deployment/select-cloud"])
    localStorage.setItem('project_id', this.createForm.value["project_id"] ?? '')
    localStorage.setItem('project_name', this.createForm.value["project_name"] ?? '')
    if (this.createForm.value["repo_type"] === "private_repo") {
      const data = {
        "githuburl": this.createForm.value["githuburl"]?.replace(/https?:\/\//, ''),
        "private_token": this.createForm.value["private_token"],
        "project_name": this.createForm.value["project_name"],
        "project_id": this.createForm.value["project_id"],
        "branch": this.createForm.value["branch"]
      }
      this.service.clonePrivateRepositoty(data).subscribe((res) => {
        this.toast.success(res.msg);
        this.router.navigate(["/home/app-deployment/deploy/gcp"])
      },
        (error) => {
          this.toast.error(error.error.error)
        })
    } else {
      const data = {
        "githuburl": this.createForm.value["githuburl"]?.replace(/https?:\/\//, ''),
        "project_name": this.createForm.value["project_name"],
        "project_id": this.createForm.value["project_id"],
        "branch": this.createForm.value["branch"]
      }
      this.service.clonePublicGcpRepositoty(data).subscribe((res) => {
        this.toast.success(res.msg)
        this.router.navigate(["/home/app-deployment/deploy/gcp"])
      },
        (error) => {
          console.log(error.error);
          this.toast.error(error.error.error)
        })
    }
  }

  onCancel() {
    this.router.navigate(["/home/app-deployment/gcp"]);
  }

  get GithubURL(): FormControl {
    return this.createForm.get("githuburl") as FormControl;
  }
  get RepoType(): FormControl {
    return this.createForm.get("repo_type") as FormControl;
  }
  get PrivateToken(): FormControl {
    return this.createForm.get("private_token") as FormControl;
  }
  get ProjectName(): FormControl {
    return this.createForm.get("project_name") as FormControl;
  }
  get ProjectId(): FormControl {
    return this.createForm.get("project_id") as FormControl;
  }
  get Branch(): FormControl {
    return this.createForm.get("branch") as FormControl;
  }
}
