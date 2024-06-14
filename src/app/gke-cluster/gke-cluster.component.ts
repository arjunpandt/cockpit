import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gke-cluster',
  templateUrl: './gke-cluster.component.html',
  styleUrls: ['./gke-cluster.component.scss']
})
export class GkeClusterComponent implements OnInit {
  createForm= new FormGroup({
    project: new FormControl('',[Validators.required]),
    region: new FormControl('',[Validators.required]),
    gke_name: new FormControl('',[Validators.required]),
    gke_version: new FormControl('',[Validators.required]),
    node_count: new FormControl('',[Validators.required]),
    cluster_type: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required]),
  });
  showProgressBar: boolean = false;
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  username : string = '';
  postUsername= {};

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.onAccountChange();
  }

  onCancel(){
    this.router.navigate(["/home"]);
  }

  onAccountChange() {
    this.postUsername = {
      username: this.username
    };
    this.service.getGcpCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
      },
      (error) => {
        this.toast.error(error.error.message)
      }
    );
  }


  onSubmit(){
    this.router.navigate(["/home/cloud-selection/gcp/gcp2/redirect"])
    this.showProgressBar = true;
    this.service.postGkeCluster(this.createForm.value).subscribe((res)=>{
      this.createForm.reset();
      setTimeout(()=>{
        this.showProgressBar = false;
        this.toast.success(res.message);
        this.router.navigate(["/home/cloud-selection/gcp/gcp2/reddirect"]);
      },420000)
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }

  get Project():FormControl{
    return this.createForm.get("project") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }

  get Region():FormControl{
    return this.createForm.get("region") as FormControl;
  }

  get GkeName():FormControl{
    return this.createForm.get("gke_name") as FormControl;
  }

  get GkeVersion():FormControl{
    return this.createForm.get("gke_version") as FormControl;
  }

  get NodeCount():FormControl{
    return this.createForm.get("node_count") as FormControl;
  }

  get ClusterType():FormControl{
    return this.createForm.get("cluster_type") as FormControl;
  }
}
