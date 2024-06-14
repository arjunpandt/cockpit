import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gcp-credential',
  templateUrl: './gcp-credential.component.html',
  styleUrls: ['./gcp-credential.component.scss']
})
export class GcpCredentialComponent implements OnInit {
  createForm= new FormGroup({
    User_name: new FormControl({value:'',disabled:true},[Validators.required]),
    jsonFile: new FormControl('',[Validators.required]),
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
  files :any

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

    selectedFile: File | null = null;

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.createForm.patchValue({User_name:this.username})
    this.onAccountChange();
  }

  onAccountChange() {
    this.postUsername = {
      username: this.username
    };
    this.service.getGcpCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
      },
      (error) => {
        this.toast.error(error.error.message)
      }
    );
  }
  
  upload(event: any): void {
    this.files = event.target.files[0];
  }

  onCancel(){
    this.router.navigate(["/home"]);
  }

  onNextGke(): void {
    this.showProgressBar = true;
    if(this.action === "Next" || this.action === "Add"){

    const jsonFile = this.createForm.get('jsonFile')?.value;

    if (jsonFile) {
      const formData = new FormData();
      formData.append('jsonFile', this.files )
      formData.append('User_name', this.Username.value);
      formData.append('account_name', this.AccountName.value);

      this.service.postGcpCluster(formData).subscribe(
        (res) => {
          this.showProgressBar = false;
          this.toast.success(res.message);
          this.createForm.reset();
          this.action === "Next" ? this.router.navigate(['/home/cloud-selection/gcp/gcp2']) : this.router.navigate(["/home"]);
        },
        (error) => {
          this.showProgressBar = false;
          this.toast.error(error.error.message);
        }
      );
    }
  }
  else if(this.action === "Update"){
    const jsonFile = this.createForm.get('jsonFile')?.value;

    if (jsonFile) {
      const formData = new FormData();
      formData.append('jsonFile', this.files);
      formData.append('User_name', this.Username.value);
      formData.append('account_name', this.AccountName.value);
    this.service.updateGcpCred(formData).subscribe((res)=>{
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
  else if(this.action === "Delete"){
    const jsonFile = this.createForm.get('jsonFile')?.value;

      const formData = {
        account_name: this.AccountName.value
      }
    this.service.deleteGcpCred(formData).subscribe((res)=>{
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

  get JsonFile():FormControl{
    return this.createForm.get("jsonFile") as FormControl;
  }

  get AccountName():FormControl{
    return this.createForm.get("account_name") as FormControl;
  }

}
