import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.scss']
})
export class AwsComponent implements OnInit {
  clusterForm:boolean= false;
  selectedCluster:string='';
  selectedAccount:string='';

  createForm= new FormGroup({
    eks_name: new FormControl('',[Validators.required]),
    region: new FormControl('',[Validators.required]),
    instance_type: new FormControl('',[Validators.required]),
    eks_version: new FormControl('',[Validators.required]),
    desired_size: new FormControl('',[Validators.required]),
    max_size: new FormControl('',[Validators.required]),
    min_size: new FormControl('',[Validators.required]),
    cluster_type: new FormControl('',[Validators.required]),
    account_name: new FormControl('',[Validators.required]),
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

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }
    job_id: any;


  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.fetchAccounts();
    this.awsBody={
      username: this.username
    }
    // this.service.postAwsCreationStatus(this.awsBody).subscribe((res)=>{
    //   console.log(res.job_ids);
    //   this.selectCluster=res.job_ids
      
    // })
  }

  onCancel(){
    this.router.navigate(["/home/app-deployment/select-cloud"]);
  }

  fetchAccounts() {
    this.postUsername = {
      username: this.username
    };
    this.service.getAwsCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
      },
      (error) => {
        this.toast.error(error.error.message)
      }
    );
  }

  onAccountChange(selectedAccount:string){
    console.log(selectedAccount);
    this.createForm.value["account_name"]=selectedAccount;
    this.createForm.patchValue({account_name:selectedAccount})
    const body ={
      username: this.username,
      account_name:selectedAccount
    }
    this.service.getEksClusters(body).subscribe(
      (res)=>{
        console.log(res);
        this.selectCluster = res.clusters
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  onClusterChange(){
    
  }

  // onClick() {
  //   const cluster = {
  //     username: localStorage.getItem('username') ?? ''
  //   };
  //   this.service.postRedirectEksCluster(cluster).subscribe(
  //     (res) => {
  //       this.job_id = res.most_recent_job_id  
  //     },(error) => {
  //       this.toast.error(error.error.message);
  //     }
  //   );
  // }
  addCluster(){
    console.log("test");
    this.clusterForm=!this.clusterForm;
    
  }

  onAddAccount(){
    const newTab = this.router.createUrlTree(['home/cloud-selection/aws'], { queryParams: { action: 'Add' } }).toString();
    window.open(newTab,'_blank')
    console.log(newTab);
    
  }

  onNextEks(){
    this.router.navigate(["/home/app-deployment"])
  }

  onSaveCluster(){
    localStorage.removeItem('eks_job_id')
    // this.router.navigate(["/home/app-deployment"]) 
    this.showProgressBar = true;
    this.service.postEksCluster(this.createForm.value).subscribe((res)=>{
      this.createForm.reset();

      console.log(res);
      localStorage.setItem('account_name',res.account_name)
      localStorage.setItem('eks_name',res.eks_name)
      localStorage.setItem('region_code',res.region_code)
      localStorage.setItem('key_vault',res.key_vault)
      this.checkClusterStatus(res);
      // this.showProgressBar = false;
      // this.toast.success(res.message)
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }

  checkClusterStatus(detials:any){
    
      const data = {
        account_name: detials.account_name,
        eks_name: detials.eks_name,
        region_code: detials.region_code,
        key_vault: detials.key_vault
      };

      const checkStatus = setInterval(()=>{
        this.service.postAksClusterStatus(data).subscribe((res)=>{
          console.log('Data sent successfully', res);
          if(res.created==="true"){
            this.showProgressBar = false;
            this.toast.success(res.message)
            this.router.navigate(["/home/app-deployment"]) 
            clearInterval(checkStatus)
            // clearInterval(recentJobCheck)
          }
        },(error)=>{
          clearInterval(checkStatus)
          console.log(error.error.message);
          this.toast.error(error.error.message)
          this.showProgressBar = false;
        })
      },30000)

      // const dataforRecentJobCheck = {
      //   account_name:detials.account_name,
      //   cluster_name:detials.eks_name,
      //   username:this.username
      // }
      // const recentJobCheck = setInterval(()=>{
      //   this.service.postRedirectEksCluster(dataforRecentJobCheck).subscribe(
      //     (res) => {

      //       if(res.id==="true"){
      //         this.job_id = res.most_recent_job_id 
      //         localStorage.setItem('eks_job_id',res.most_recent_job_id)
      //         clearInterval(recentJobCheck)
      //       } 
      //     },(error) => {
      //       this.toast.error(error.error.message);
      //     }
      //   );
      // },3000)

      
  }

  

  get ClusterName():FormControl{
    return this.createForm.get("eks_name") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }

  get Region():FormControl{
    return this.createForm.get("region") as FormControl;
  }

  get InstanceType():FormControl{
    return this.createForm.get("instance_type") as FormControl;
  }

  get EksVersion():FormControl{
    return this.createForm.get("eks_version") as FormControl;
  }

  get DesiredSize():FormControl{
    return this.createForm.get("desired_size") as FormControl;
  }

  get MaxSize():FormControl{
    return this.createForm.get("max_size") as FormControl;
  }

  get MinSize():FormControl{
    return this.createForm.get("min_size") as FormControl;
  }

  get ClusterType():FormControl{
    return this.createForm.get("cluster_type") as FormControl;
  }


}
