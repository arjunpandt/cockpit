import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
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
    if(this.currentRoute==='/home/monitoring' || this.currentRoute==='/home/monitoring/select-cloud'){
      this.router.navigate(['home/monitoring/aws-select'])
    } else {
      this.router.navigate(["/home/management/aws"]);
    }
    
  }

  onClickAzure() {
    // this.router.navigate(["/home/cloud-selection/azure/azure2"]);
    Swal.fire({
      icon: "info",
      title: "Coming Soon!",
      text: "This page is coming soon! We're excited to share it with you once it's ready.",
      confirmButtonText: "Okay",
      
    });
  }

  onClickGcp() {
    if(this.currentRoute==='/home/monitoring' || this.currentRoute==='/home/monitoring/select-cloud'){
      this.router.navigate(['home/monitoring/gcp-select'])
    }  else {
      this.router.navigate(["/home/management/gcp"]);
    }
  }

  onClickBack(){
    this.router.navigate(["/home"]);
  }
}
