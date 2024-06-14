import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-aks-cluster',
  templateUrl: './aks-cluster.component.html',
  styleUrls: ['./aks-cluster.component.scss']
})
export class AksClusterComponent implements OnInit {
  showProgressBar: boolean = false;
  createForm= new FormGroup({
    resource_group: new FormControl('',[Validators.required]),
    Region: new FormControl('',[Validators.required]),
    availability_zones: new FormControl('',[Validators.required]),
    aks_name: new FormControl('',[Validators.required]),
    aks_version: new FormControl('',[Validators.required]),
    node_count: new FormControl('',[Validators.required]),
    cluster_type: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required]),
  });
  postUsername= {};
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  username : string = '';
  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
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

  onSubmit() {
    this.router.navigate(["/home/cloud-selection/azure/azure2/redirect"]);
    let aksVersion: number | null = null;
    const aksVersionControl = this.createForm.get('aks_version');
    if (aksVersionControl && aksVersionControl.value !== null && aksVersionControl.value !== undefined) {
      aksVersion = parseFloat(aksVersionControl.value);
    }

     const formData = {
      ...this.createForm.value,
      aks_version: aksVersion,
    };  
    this.showProgressBar = true;
    this.service.postAksCluster(formData).subscribe(
      (res) => {
        this.createForm.reset();
        setTimeout(()=>{
          this.showProgressBar = false;
          this.toast.success(res.message);
          this.router.navigate(['/home/cloud-selection/azure/azure2/redirrect']);
        },180000)
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

  get Region():FormControl{
    return this.createForm.get("Region") as FormControl;
  }

  get Availability():FormControl{
    return this.createForm.get("availability_zones") as FormControl;
  }

  get AksName():FormControl{
    return this.createForm.get("aks_name") as FormControl;
  }

  get AksVersion():FormControl{
    return this.createForm.get("aks_version") as FormControl;
  }

  get NodeCount():FormControl{
    return this.createForm.get("node_count") as FormControl;
  }

  get ClusterType():FormControl{
    return this.createForm.get("cluster_type") as FormControl;
  }
}


