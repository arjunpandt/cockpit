import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aks-clusterredirect',
  templateUrl: './aksClusterredirect.component.html',
  styleUrls: ['./aksClusterredirect.component.scss']
})
export class AksClusterredirectComponent implements OnInit {
  responseString: any;
  loading: boolean = false; 

  constructor(
    private RegisterService: RegisterService,
    private service: RegisterService,
    private toast: ToastrService
  ) { }

  job_id: any;

  ngOnInit(): void {
    this.onClick();
 
  }

  postData() {
    this.loading = true; 
    setTimeout(() => {
      this.loading = false; 
    }, 15000); 

    const data = { /* your data */ };
    this.RegisterService.postData(data).subscribe(
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
      username: localStorage.getItem("username") ?? ''
    };
    this.service.postRedirectAksCluster(cluster).subscribe(
      (res) => {
        this.job_id = res.most_recent_job_id;
      },
      (error) => {
        this.toast.error(error.error.message);
      }
    );
  }

  onSave() {
    const jobid = {
      username: localStorage.getItem("username") ?? '',
    }
    this.service.postRedirectlogAksCluster(this.job_id, jobid).subscribe(
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
