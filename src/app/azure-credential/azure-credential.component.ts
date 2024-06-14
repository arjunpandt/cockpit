import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-azure-credential',
  templateUrl: './azure-credential.component.html',
  styleUrls: ['./azure-credential.component.scss']
})
export class AzureCredentialComponent implements OnInit {
  createForm= new FormGroup({
    User_name: new FormControl({value:'',disabled:true},[Validators.required]),
    subscription_id: new FormControl('',[Validators.required]),
    client_id: new FormControl('',[Validators.required]),
    client_secret: new FormControl('',[Validators.required]),
    tenant_id: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required]),
  });
  showProgressBar: boolean = false;
  action: string = '';
  username: string = '';
  postUsername= {};
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  postData = {};
  showDropDown :boolean = false;

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.action = params['action'];    
        if(this.action === undefined){
          this.action = "Next"
        }
      });
     }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.createForm.patchValue({User_name:this.username})
    this.onAccountChange();
    
  }

  onAccountChange() {
    this.postUsername = {
      username: this.username
    };
    this.service.getAzureCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
      },
      (error) => {
        this.toast.error(error.error.message)
      }
    );
  }

  onCancel(){
    this.router.navigate(["/home"]);
  }

  onNextAks(){
    this.showProgressBar = true;
    if(this.action === "Next" || this.action === "Add"){
    this.createForm.get('User_name')?.enable();
    this.service.postAzureCluster(this.createForm.value).subscribe((res)=>{
      this.createForm.get('User_name')?.disable();
      this.showProgressBar = false;
      this.toast.success(res.message);
      this.createForm.reset();
      this.action === "Next" ? this.router.navigate(["/home/cloud-selection/azure/azure2"]) : this.router.navigate(["/home"]);
    }, (error)=>{
      this.createForm.get('User_name')?.disable();
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }
  else if(this.action === "Update"){
    this.createForm.get('User_name')?.enable();
    this.service.updateAzureCred(this.createForm.value).subscribe((res)=>{
      this.createForm.get('User_name')?.disable();
      this.showProgressBar = false;
      this.toast.success(res.message);
      this.createForm.reset();
      this.router.navigate(["/home"]);
    }, (error)=>{
      this.createForm.get('User_name')?.disable();
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }
  else if(this.action === "Delete"){
    this.postData = {
      account_name: this.createForm.value.account_name
    };
    this.service.deleteAzureCred(this.postData).subscribe((res)=>{
      this.showProgressBar = false;
      this.toast.success(res.message);
      this.createForm.reset();
      this.router.navigate(["/home"]);
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }
}

  get Username():FormControl{
    return this.createForm.get("User_name") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }

  get subscriptionId():FormControl{
    return this.createForm.get("subscription_id") as FormControl;
  }

  get ClientId():FormControl{
    return this.createForm.get("client_id") as FormControl;
  }

  get ClientSecret():FormControl{
    return this.createForm.get("client_secret") as FormControl;
  }

  get TenantId():FormControl{
    return this.createForm.get("tenant_id") as FormControl;
  }

}
