import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-monitoring',
  templateUrl: './select-monitoring.component.html',
  styleUrls: ['./select-monitoring.component.scss']
})
export class SelectMonitoringComponent implements OnInit {
  currentRoute!: string;
  faBackward = faBackward;

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  applicationDeployment = () => {
    if (this.currentRoute === '/home/monitoring/aws-select') {
      this.router.navigate(['/home/monitoring/aws'])
    } else {
      this.router.navigate(["/home/monitoring/gcp"]);
    }
  }

  applicationManagement = () => {
    if (this.currentRoute === '/home/monitoring/aws-select') {
      this.router.navigate(['/home/monitoring/management/aws'])
    } else {
      this.router.navigate(["/home/monitoring/management/gcp"]);
    }
  }

  onBack() {
    this.router.navigate(["/home/monitoring/select-cloud"])
  }
}
