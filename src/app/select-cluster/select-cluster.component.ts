import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-select-cluster',
  templateUrl: './select-cluster.component.html',
  styleUrls: ['./select-cluster.component.scss']
})
export class SelectClusterComponent implements OnInit {
  currentRoute!: string;
  faArrowLeft = faBackward;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.currentRoute= this.router.url;
  }
  onClickAws() {
    if(this.currentRoute==='/home/monitoring/select-cloud'){
      this.router.navigate(['home/monitoring/aws'])
    } else {
      this.router.navigate(["/home/management/aws"]);
    }
    
  }

  onClickAzure() {
    this.router.navigate(["/home/cloud-selection/azure/azure2"]);
  }

  onClickGcp() {

    this.router.navigate(["/home/cloud-selection/gcp/gcp2"]);
  }
  onClickBack(){
    this.router.navigate(["/home"]);
  }
}
