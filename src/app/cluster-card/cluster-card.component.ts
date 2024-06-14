import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cluster-card',
  templateUrl: './cluster-card.component.html',
  styleUrls: ['./cluster-card.component.scss']
})
export class ClusterCardComponent implements OnInit {

  @Input() sampleData: { [key: string]: { [innerKey: string]: any } } = {};
  @Input() cardTitle: string= "";
  awsModal:boolean=false;
  azureModal: boolean = false;
  gcpModal:boolean=false;
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  username: string = '';
  postUsername= {};
  azureBody={};
  showProgressBar: boolean = false;
  azureModal1 = false;
  gcpModal1 = false;
  awsModal1 = false;
  showGcloudModal = true;
  showAcloudModal = true;
  showAwscloudModal = true;


  constructor(private router: Router, private service: RegisterService, private toast: ToastrService,) { }

  ngOnInit(): void {
    
    this.username = localStorage.getItem("username") ?? '';
    this.onAccountChange()
  }

  onAccountChange() {
    this.showProgressBar = true;
    this.postUsername={
      username: this.username
    }
    if(this.cardTitle === 'Aws'){
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

  fetchSelectedAccountData(){
    this.showProgressBar = true;
    this.azureBody={
      account_name : this.accountName
    }
    if(this.cardTitle === 'Aws'){
      this.service.getAwsClusters(this.azureBody).subscribe((res)=>{
        this.showProgressBar = false;
        this.sampleData = res;
      }, (error)=>{
        this.showProgressBar = false;
        this.toast.error(error.error.message)
      })
    }
    else if(this.cardTitle === 'Azure'){
      this.service.getAzureClusters(this.azureBody).subscribe((res)=>{
        this.showProgressBar = false;
        this.sampleData = res;
      }, (error)=>{
        this.showProgressBar = false;
        this.toast.error(error.error.message)
      })
    }

    else if(this.cardTitle === 'GCP'){
      this.service.getGcpClusters(this.azureBody).subscribe((res)=>{
        this.showProgressBar = false;
        this.sampleData = res;
      }, (error)=>{
        this.showProgressBar = false;
        this.toast.error(error.error.message)
      })
    }

       
    }
  

  closeModal(): void {
    this.azureModal = false;
    this.awsModal=false;
    this.gcpModal=false;
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

  onBack() {
    location.reload();
  }

  onConnect() {
    if(this.cardTitle ==='Aws'){
    this.awsModal1 = true;
    }

    if(this.cardTitle ==='Azure'){
      this.azureModal1 = true;
      }

      if(this.cardTitle ==='GCP'){
        this.gcpModal1 = true;
      }

  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  toggleModal(modal:string){
    this.showGcloudModal = modal === 'gcloud';
  }

  toggleModall(modal: string): void {
    this.showAcloudModal = modal === 'acloud';
  }
  toggleModalll(modal: string): void {
    this.showAwscloudModal = modal === 'awscloud';
  }

}





