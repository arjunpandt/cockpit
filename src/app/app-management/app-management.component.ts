import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.scss']
})
export class AppManagementComponent implements OnInit {
  currentRoute!: string;
  faBackward=faBackward;

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentRoute= this.router.url;
  }

  applicationDeployment=()=>{
    if(this.currentRoute==='/home/management/aws'){
      this.router.navigate(['/home/app-deployment/aws'])
    } else {
      this.router.navigate(["/home/app-deployment/gcp"]);
    }
  }

  applicationManagement =()=>{
    this.router.navigate(["/home/app-management"])
  }

  onBack(){
    this.router.navigate(["/home/app-deployment/select-cloud"])
  }

}
