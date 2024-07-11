import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickAppDeployment=()=>{
    this.router.navigate(["/home/app-deployment"]);
  }
  onClickClusterManagement=()=>{
    console.log("test");
    this.router.navigate(["/home/cluster-management"]);
  }
}
