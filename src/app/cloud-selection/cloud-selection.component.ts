import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cloud-selection',
  templateUrl: './cloud-selection.component.html',
  styleUrls: ['./cloud-selection.component.scss']
})
export class CloudSelectionComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onClickAws(){
      this.router.navigate(["/home/cloud-selection/aws/aws2"]);
    }

  onClickAzure(){
        this.router.navigate(["/home/cloud-selection/azure/azure2"]);}  

  onClickGcp(){
  
        this.router.navigate(["/home/cloud-selection/gcp/gcp2"]);}  
      }

