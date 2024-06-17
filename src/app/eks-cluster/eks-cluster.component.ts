import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-eks-cluster',
  templateUrl: './eks-cluster.component.html',
  styleUrls: ['./eks-cluster.component.scss']
})
export class EksClusterComponent implements OnInit {
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

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }
    job_id: any;


  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.onAccountChange();
  }

  onCancel(){
    this.router.navigate(["/home/cloud-selection/aws"]);
  }

  onAccountChange() {
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

  onNextEks(){
    localStorage.removeItem('eks_job_id')
    this.router.navigate(["/home/cloud-selection/aws/aws2/redirect"]) 
    this.showProgressBar = true;
    this.service.postEksCluster(this.createForm.value).subscribe((res)=>{
      this.createForm.reset();
      
      // setTimeout(()=>{
      //   this.showProgressBar = false;
      //   this.toast.success(res.message);
      //   this.router.navigate(["/home/cloud-selection/aws/aws2/redirect"]);
      // },300000)
      console.log(res);
      localStorage.setItem('account_name',res.account_name)
      localStorage.setItem('eks_name',res.eks_name)
      localStorage.setItem('region_code',res.region_code)
      localStorage.setItem('key_vault',res.key_vault)
      this.checkClusterStatus(res);
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })
  }

  checkClusterStatus(detials:any){
    console.log('checkClusterStatusCalled');
      // const data = {
      //   account_name: localStorage.getItem('account_name'),
      //   eks_name: localStorage.getItem('eks_name'),
      //   region_code: localStorage.getItem('region_code'),
      //   key_vault: localStorage.getItem('key_vault')
      // };
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
            clearInterval(checkStatus)
          }
        },(error)=>{
          console.log(error.error.message);
        })

      },30000)

      const dataforRecentJobCheck = {
        account_name:detials.account_name,
        cluster_name:detials.eks_name,
        username:this.username
      }
      const recentJobCheck = setInterval(()=>{
        this.service.postRedirectEksCluster(dataforRecentJobCheck).subscribe(
          (res) => {

            if(res.id==="true"){
              this.job_id = res.most_recent_job_id 
              localStorage.setItem('eks_job_id',res.most_recent_job_id)
              clearInterval(recentJobCheck)
            } 
          },(error) => {
            this.toast.error(error.error.message);
          }
        );
      },3000)

      
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
