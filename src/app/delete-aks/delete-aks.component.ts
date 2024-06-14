import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-delete-aks',
  templateUrl: './delete-aks.component.html',
  styleUrls: ['./delete-aks.component.scss']
})
export class DeleteAksComponent implements OnInit {
  createForm= new FormGroup({
    resource_group: new FormControl('',[Validators.required]),
    aks_name: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required])
  });
  showProgressBar: boolean = false;
  username: string='';
  azureBody={};
  sampleData:any;
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

  onAksNameChange(){
    this.azureBody={
      account_name: this.createForm.value.account_name
    }
    this.service.getAzureClusters(this.azureBody).subscribe((res)=>{
      this.sampleData = res.aks_cluster;
    })
  }

  onAccountChange() {
    this.postUsername={
      username: this.username
    }
    this.service.getAzureCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
        this.onAksNameChange()
      },
      (error) => {
        this.toast.error(error.error.message)
      }
    );
  }

  onCancel(){
    this.router.navigate(["/home"]);
  }

  onSubmit() { 
    this.showProgressBar = true;
    this.service.postDeleteAksCluster(this.createForm.value).subscribe(
      (res) => {
        this.createForm.reset();
        setTimeout(()=>{
          this.toast.success(res.message);
          this.showProgressBar = false;
          this.router.navigate(['/home/delete-cloud-selection/delete-aks/aks-jobs']);
        },30000)
      },
      (error) => {
        this.showProgressBar = false;
        this.toast.error(error.error.message);
      }
    );
  }

  get ResourceName():FormControl{
    return this.createForm.get("resource_group") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }

  get AksName():FormControl{
    return this.createForm.get("aks_name") as FormControl;
  }
}
