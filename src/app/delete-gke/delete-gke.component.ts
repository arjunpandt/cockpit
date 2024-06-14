import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-gke',
  templateUrl: './delete-gke.component.html',
  styleUrls: ['./delete-gke.component.scss']
})
export class DeleteGkeComponent implements OnInit {
  createForm= new FormGroup({
    project_id: new FormControl('',[Validators.required]),
    region: new FormControl('',[Validators.required]),
    gke_name: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required])
  });
  showProgressBar: boolean = false;
  username: string='';
  awsBody={};
  sampleData:any= [];
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  postUsername= {};

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.onAccountChange();
  }

  onEksNameChange(){
    this.awsBody={
      account_name: this.createForm.value.account_name
    }
    this.service.getGcpClusters(this.awsBody).subscribe((res)=>{
      this.sampleData = res.gke_cluster;
    })
  }

  onAccountChange() {
    this.postUsername={
      username: this.username
    }
    this.service.getGcpCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
        this.onEksNameChange()
      },
      (error) => {
        this.toast.error(error.error.message)
      }
    );
  }


  onCancel(){
    this.router.navigate(["/home"]);
  }

  onSubmit(){
    this.showProgressBar = true;
    this.service.postDeleteGkeCluster(this.createForm.value).subscribe((res)=>{
      this.createForm.reset();
      setTimeout(()=>{
        this.showProgressBar = false;
        this.toast.success(res.message);
        this.router.navigate(["/home/delete-cloud-selection/delete-gke/gke-jobs"]);
      },120000)
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }

  get ProjectId():FormControl{
    return this.createForm.get("project_id") as FormControl;
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
}
