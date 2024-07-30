import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monitoring-aws',
  templateUrl: './monitoring-aws.component.html',
  styleUrls: ['./monitoring-aws.component.scss']
})
export class MonitoringAwsComponent implements OnInit {

  clusterForm:boolean= false;
  selectedCluster:string='';
  selectedAccount:string='';

  createForm= new FormGroup({
    cluster_name: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required]),
    project_name: new FormControl('',[Validators.required]),
    app_name: new FormControl('',[Validators.required]),
    username: new FormControl('', [Validators.required])
  });

  showProgressBar: boolean = false;
  username: string='';
  awsBody={}
  apiData: any[]=[];
  postUsername= {};
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  selectCluster:string[]=[]
  endpoint:string='';
  garafanaPass:string='';
  grafanaPassBody={}
  showCredentialButton=false;
  showCrentials= false;



  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.username = localStorage.getItem("username") ?? '';

    this.fetchAccounts();
    this.createForm.patchValue({'username': this.username})
    this.awsBody={
      username: this.username
    }
  }


  fetchAccounts() {
    this.showProgressBar=true;
    this.postUsername = {
      username: this.username
    };

    this.service.getAwsCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
    this.showProgressBar=false;
      },
      (error) => {
        this.toast.error(error.error.message)
    this.showProgressBar=false;
      }
    );
  }

  onAccountChange(selectedAccount:any){
    this.showProgressBar=true;
    console.log(selectedAccount);
    this.createForm.value["account_name"]=selectedAccount;
    this.createForm.patchValue({account_name:selectedAccount})
    const body ={
      username: this.username,
      account_name:selectedAccount
    }
    this.service.getEksClusters(body).subscribe(
      (res)=>{
        this.showProgressBar=false;
        console.log(res);
        this.selectCluster = res.clusters
        
      },
      (error)=>{
        this.showProgressBar=false;
        console.log(error);
        
      }
    )
  }

  onNextEks(){
    this.showProgressBar=true;
    this.showCredentialButton= false
    this.showCrentials= false
    console.log(this.createForm.value);
    this.service.monitoring(this.createForm.value).subscribe(
      (res)=>{
        this.showProgressBar=false;
        this.showCredentialButton= true;
        console.log(res);
        this.endpoint = res.endpoint
        this.toast.success('Monitoring Deployed Successfully')
        this.grafanaPassBody = this.createForm.value;
        
      },
      (error)=>{
        this.showProgressBar=false;
        this.showCredentialButton= false
        console.log(error);
        
      }
    )
    
  }

  onCancel(){
    this.router.navigate(["/home/monitoring/select-cloud"]);
  }

  getCredentials(){
    this.router.navigate(["/home/monitoring/management"]);
    // this.showProgressBar = true;
    // this.service.grafanaPass(this.grafanaPassBody).subscribe(
    //   (res)=>{
    //     console.log(res);
        
    //     this.garafanaPass= res.password
    //     this.showProgressBar= false
    //     this.toast.success('Successfully Fetched Your Credentials!')
    //     this.showCrentials= true
    //   },
    //   (error)=>{
    //     console.log(error);
    //     this.showCrentials= true
    //     this.showProgressBar= false
    //   }

    // )
  }

  
  get ProjectName():FormControl{
    return this.createForm.get("project_name") as FormControl;
  }

  get AppName():FormControl{
    return this.createForm.get("app_name") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }
}
