import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.scss']
})
export class AppManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  applicationDeployment=()=>{
    this.router.navigate(["/home/app-deployment/aws"]);
  }

  applicationManagement =()=>{
    this.router.navigate(["/home/app-management"])
  }

  onBack(){
    this.router.navigate(["/home/app-deployment/select-cloud"])
  }

}
