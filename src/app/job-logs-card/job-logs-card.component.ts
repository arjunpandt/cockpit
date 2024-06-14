import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-job-logs-card',
  templateUrl: './job-logs-card.component.html',
  styleUrls: ['./job-logs-card.component.scss']
})
export class JobLogsCardComponent implements OnInit {

  @Input() sampleData: { [key: string]: { [innerKey: string]: any } } = {};
  @Input() cardTitle: string= "";

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }

    showProgressBar: boolean = false;
    showCard:boolean = false;
    showButton:boolean = true;
  selectedArrayValue: any;
  newObj:{}={};


  ngOnInit(): void {
  }

  createObject(): void {
    // Form your object using the selected value
    this.newObj = {
      job_id: this.selectedArrayValue,
      username: localStorage.getItem("username")
    };
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value);
  }

  isArrayWithData(item: string): boolean {
    return Array.isArray(this.sampleData[item]) && this.sampleData[item].length > 0;
  }

  isArrayWithoutData(item: string): boolean {
    return Array.isArray(this.sampleData[item]) && this.sampleData[item].length === 0;
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  getObjectValues(obj: { [key: string]: any }): any[] {
    return Object.values(obj);
  }
  
  getArray(item: string): any[] {
    return this.sampleData[item] as any[];
  }

  onBack(){
        this.showCard = !this.showCard;
      }

  onSubmit(){
        if(this.cardTitle==="AWS")
        {
          this.showProgressBar = true;
          this.service.postAwsLogs(this.newObj).subscribe((res)=>{
            this.showButton= false;
            this.showProgressBar = false;
            this.sampleData = res;
            this.cardTitle="AWS";
            this.toast.success("Success");
            this.showCard =true;
            }, (error)=>{
              this.showProgressBar = false;
              this.toast.error(error.error.error)
            })
        }

        if(this.cardTitle==="Azure")
        {
          this.showProgressBar = true;
          this.service.postAzureLogs(this.newObj).subscribe((res)=>{
            this.showButton= false;
            this.showProgressBar = false;
            this.sampleData = res;
            this.cardTitle="Azure";
            this.toast.success("Success");
            this.showCard =true;
            }, (error)=>{
              this.showProgressBar = false;
              this.toast.error(error.error.error)
            })
          
        }

        if(this.cardTitle==="GCP")
        {
          
        }

      }
  
}
