import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployment',
  templateUrl: './app-deployment.component.html',
  styleUrls: ['./app-deployment.component.scss']
})
export class AppDeploymentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickAws=()=>{
    this.router.navigate(["/home/app-deployment/aws"]);
  }
  onClickAzure=()=>{
    this.router.navigate(["/home/app-deployment/azure"]);
  }
  onClickGcp=()=>{
    this.router.navigate(["/home/app-deployment/google"]);
  }
}
