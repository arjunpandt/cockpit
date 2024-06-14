import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-eks',
  templateUrl: './delete-eks.component.html',
  styleUrls: ['./delete-eks.component.scss']
})
export class DeleteEksComponent implements OnInit {

  createForm= new FormGroup({
    eks_name: new FormControl('',[Validators.required]),
    region: new FormControl('',[Validators.required]),
    node: new FormControl('',[Validators.required]),
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
    this.service.getAwsClusters(this.awsBody).subscribe((res)=>{
      this.sampleData = res.eks_cluster;
    })
  }

  onAccountChange() {
    this.postUsername={
      username: this.username
    }
    this.service.getAwsCrediantial(this.postUsername).subscribe(
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

  onNextEks(){
    this.showProgressBar = true;
    this.service.postDeleteEksCluster(this.createForm.value).subscribe((res)=>{
      this.createForm.reset();
      setTimeout(()=>{
        this.showProgressBar = false;
        this.toast.success(res.message);
        this.router.navigate(["/home/delete-cloud-selection/delete-eks/eks-jobs"]);
      },30000)
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }

  get EksName():FormControl{
    return this.createForm.get("eks_name") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }

  get Region():FormControl{
    return this.createForm.get("region") as FormControl;
  }

  get NodeGroupName():FormControl{
    return this.createForm.get("node") as FormControl;
  }

}
