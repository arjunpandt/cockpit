import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-credentials',
  templateUrl: './card-credentials.component.html',
  styleUrls: ['./card-credentials.component.scss']
})
export class CardCredentialsComponent implements OnInit {
  @Input() sampleData: { [key: string]: { [innerKey: string]: any } } = {};
  @Input() cardTitle: string = "";
  username: string = '';
  postUsername= {};
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  postData = {};
  showProgressBar: boolean = false;

  constructor(private router: Router, private toast: ToastrService, private service: RegisterService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.onAccountChange()
  }

  private navigateToRoute(action: string) {
    if (this.cardTitle === 'AWS')
      this.router.navigate(['home/cloud-selection/aws'], { queryParams: { action: action } });
    else if (this.cardTitle === 'Azure')
      this.router.navigate(['home/cloud-selection/azure'], { queryParams: { action: action } });
    else if (this.cardTitle === "GCP")
      this.router.navigate(['home/cloud-selection/gcp'], { queryParams: { action: action } });
  }

  onAccountChange() {
    this.showProgressBar = true;
    this.postUsername={
      username: this.username
    }
    if(this.cardTitle === 'AWS'){
      this.service.getAwsCrediantial(this.postUsername).subscribe(
        (data) => {
          this.showProgressBar = false;
          this.accountNames = data.map((item: any) => item);
          this.onAccountSelected()
        },
        (error) => {
          this.showProgressBar = false;
          this.toast.error(error.error.message)
        }
      );
    }

    else if(this.cardTitle === 'Azure'){
      this.service.getAzureCrediantial(this.postUsername).subscribe(
        (data) => {
          this.showProgressBar = false;
          this.accountNames = data.map((item: any) => item);
          this.onAccountSelected()
        },
        (error) => {
          this.showProgressBar = false;
          this.toast.error(error.error.message)
        }
      );
    }

    else if(this.cardTitle === 'GCP'){
      this.service.getGcpCrediantial(this.postUsername).subscribe(
        (data) => {
          this.showProgressBar = false;
          this.accountNames = data.map((item: any) => item);
          this.onAccountSelected()
        },
        (error) => {
          this.showProgressBar = false;
          this.toast.error(error.error.message)
        }
      );
    }
    
  }

  onAccountSelected() {
    if (this.accountName) {
      this.fetchSelectedAccountData();
    }
  }
  

  fetchSelectedAccountData() {
    this.showProgressBar = true;
    this.postData = {
      account_name: this.accountName 
    }
    if(this.cardTitle === 'AWS'){
      this.service.getAws(this.postData).subscribe((data)=>{
        this.showProgressBar = false;
        this.selectedAccountData = data;
      },
      (error) => {
        this.showProgressBar = false;
        this.toast.error(error.error.message)
      }
    );
    }
    else if(this.cardTitle === 'Azure'){
      this.service.getAzure(this.postData).subscribe((data)=>{
        this.showProgressBar = false;
        this.selectedAccountData = data;
      },
      (error) => {
        this.showProgressBar = false;
        this.toast.error(error.error.message)
      }
    );
    }

    else if(this.cardTitle === 'GCP'){
      this.service.getGcp(this.postData).subscribe((data)=>{
        this.showProgressBar = false;
        this.selectedAccountData = data;
      },
      (error) => {
        this.showProgressBar = false;
        this.toast.error(error.error.message)
      }
    );
    }
   
}

  isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  onAdd() {
    this.navigateToRoute('Add');
  }

  onUpdate() {
    this.navigateToRoute('Update');
  }

  onDelete() {
    this.navigateToRoute('Delete');
  }

  onBack() {
    location.reload();
  }
}
