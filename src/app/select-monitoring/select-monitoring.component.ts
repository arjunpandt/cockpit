import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-monitoring',
  templateUrl: './select-monitoring.component.html',
  styleUrls: ['./select-monitoring.component.scss']
})
export class SelectMonitoringComponent implements OnInit {

  faBackward=faBackward;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  applicationDeployment=()=>{
    this.router.navigate(["/home/monitoring/aws"]);
  }

  applicationManagement =()=>{
    this.router.navigate(["/home/monitoring/management"])
  }

  onBack(){
    this.router.navigate(["/home/monitoring/select-cloud"])
  }

}
