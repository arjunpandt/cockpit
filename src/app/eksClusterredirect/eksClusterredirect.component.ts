import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eks-clusterredirect',
  templateUrl: './eksClusterredirect.component.html',
  styleUrls: ['./eksClusterredirect.component.scss']
})
export class EksClusterredirectComponent implements OnInit {
  responseString: any;
  loading: boolean = false
  constructor(
    private RegisterService: RegisterService,
    private service: RegisterService,
    private toast: ToastrService,
  ) { }
  job_id: any;
  required_job_id: any;
  ngOnInit(): void {
    // this.onClick();
  }
  postDataaws() {
    console.log(localStorage.getItem("eks_job_id"));
    
    this.loading = true; 
    setTimeout(() => {
      this.loading = false; 
    }, 15000); 
    const data = {  
      username: localStorage.getItem("username") ?? '',
      job_id: localStorage.getItem("eks_job_id") 
    };
    this.RegisterService.postDataaws(data.job_id,data).subscribe(
      (response) => {
        this.responseString = JSON.stringify(response);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
    this.onSave();
  }


  onClick() {
    const cluster = {
      username: localStorage.getItem("username") ?? '',
      cluster_name:localStorage.getItem('eks_name'),
      account_name:localStorage.getItem('account_name')
    };
    
    // this.service.postRedirectEksCluster(cluster).subscribe(
    //   (res) => {
    //     this.job_id = res.most_recent_job_id
    //   }, (error) => {
    //     this.toast.error(error.error.message);
    //   }
    // );
    this.job_id = localStorage.getItem("eks_job_id");
  }
  onSave() {
    const jobid = {
      username: localStorage.getItem("username") ?? '',
      job_id: localStorage.getItem("eks_job_id")
    }
    this.service.postRedirectlogEksCluster(jobid.job_id, jobid).subscribe(
      (res) => {
        const _res = res.logs;
        this.responseString = _res;
      },
      (error) => {
        this.toast.error(error.error.message);
      }
    );

  }

}
