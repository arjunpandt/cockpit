import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monitoring-gcp',
  templateUrl: './monitoring-gcp.component.html',
  styleUrls: ['./monitoring-gcp.component.scss']
})
export class MonitoringGcpComponent implements OnInit {
  clusterForm: boolean = false;
  selectedCluster: string = '';
  selectedAccount: string = '';

  createForm = new FormGroup({
    cluster_name: new FormControl('', [Validators.required]),
    account_name: new FormControl('', [Validators.required]),
    project_name: new FormControl('', [Validators.required]),
    gcp_project_key: new FormControl('', [Validators.required]),
    app_name: new FormArray([], [Validators.required]),
    username: new FormControl('', [Validators.required])
  });

  showProgressBar: boolean = false;
  username: string = '';
  awsBody = {}
  apiData: any[] = [];
  postUsername = {};
  selectedAccountData: any;
  accountNames: string[] = [];
  accountName: string = '';
  selectCluster: string[] = []
  endpoint: string = '';
  garafanaPass: string = '';
  grafanaPassBody = {}
  showCredentialButton = false;
  showCrentials = false;
  options: any[] = [];

  selectedOptions: any[] = [];
  isDropdownOpen = false;

  constructor(private router: Router,
    private service: RegisterService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';
    this.fetchAccounts();
    this.createForm.patchValue({ 'username': this.username })
    this.awsBody = {
      username: this.username
    };
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleOption(option: any) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option);
      this.AppName.push(new FormControl(option));
    } else {
      this.selectedOptions.splice(index, 1);
      const controlIndex = this.AppName.controls.findIndex((ctrl) => ctrl.value === option);
      if (controlIndex !== -1) {
        this.AppName.removeAt(controlIndex);
      }
    }
  }

  isSelected(option: any): boolean {
    return this.selectedOptions.indexOf(option) !== -1;
  }

  get displayValue(): string {
    return this.selectedOptions.length > 0
      ? this.selectedOptions.map(o => o).join(', ')
      : 'Select options';
  }

  fetchAccounts() {
    this.showProgressBar = true;
    this.postUsername = {
      username: this.username
    };
    this.service.getGcpCrediantial(this.postUsername).subscribe(
      (data) => {
        this.accountNames = data.map((item: any) => item);
        this.showProgressBar = false;
      },
      (error) => {
        this.toast.error(error.error.message)
        this.showProgressBar = false;
      }
    );
  }

  fetchAppNames(selectedAccount: any, selectedCluster: any) {
    this.showProgressBar = true;
    this.createForm.value["account_name"] = selectedAccount;
    this.createForm.patchValue({ account_name: selectedAccount })
    this.createForm.value["cluster_name"] = selectedCluster;
    this.createForm.patchValue({ cluster_name: selectedCluster })
    const body = {
      username: this.username,
      account_name: selectedAccount,
      cluster_name: selectedCluster
    }
    this.service.getGkeApps(body).subscribe(
      (data) => {
        this.options = data.apps;
        this.showProgressBar = false;
      },
      (error) => {
        this.toast.error(error.error.message);
        this.showProgressBar = false;
      }
    );
  }

  onAccountChange(selectedAccount: any) {
    this.showProgressBar = true;
    this.createForm.value["account_name"] = selectedAccount;
    this.createForm.patchValue({ account_name: selectedAccount });
    this.selectedOptions = [];
    this.AppName.clear();
    const body = {
      username: this.username,
      account_name: selectedAccount
    }
    this.service.getGkeClusters(body).subscribe(
      (res) => {
        this.showProgressBar = false;
        this.selectCluster = res.clusters;
      },
      (error) => {
        this.showProgressBar = false;
      }
    )
  }

  onNextEks() {
    this.showProgressBar = true;
    this.showCredentialButton = false
    this.showCrentials = false
    this.service.gcpMonitoring(this.createForm.value).subscribe(
      (res) => {
        this.showProgressBar = false;
        this.showCredentialButton = true;
        this.endpoint = res.endpoint
        this.toast.success('Monitoring Deployed Successfully')
        this.grafanaPassBody = this.createForm.value;
        this.resetForm();
      },
      (error) => {
        this.showProgressBar = false;
        this.showCredentialButton = false;
      }
    )
  }

  resetForm() {
    this.createForm.reset({
      username: this.username,
      account_name: '',
      cluster_name: '',
      project_name: '',
      gcp_project_key: '',
      app_name: []
    });

    this.selectedOptions = [];
    this.AppName.clear();
    this.showCredentialButton = false;
    this.showCrentials = false;
  }

  onCancel() {
    this.router.navigate(["/home/monitoring/select-cloud"]);
  }

  getCredentials() {
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


  get ProjectName(): FormControl {
    return this.createForm.get("project_name") as FormControl;
  }

  get ProjectId(): FormControl {
    return this.createForm.get("gcp_project_key") as FormControl;
  }

  get AppName(): FormArray {
    return this.createForm.get("app_name") as FormArray;
  }

  get AccountName(): FormControl {
    return this.createForm.get("account_name") as FormControl;
  }
}
