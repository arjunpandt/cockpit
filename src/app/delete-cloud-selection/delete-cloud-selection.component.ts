import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-cloud-selection',
  templateUrl: './delete-cloud-selection.component.html',
  styleUrls: ['./delete-cloud-selection.component.scss']
})
export class DeleteCloudSelectionComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onClickAws(){
    this.router.navigate(["/home/delete-cloud-selection/delete-eks"]);
  }
  
  onClickAzure(){
      this.router.navigate(["/home/delete-cloud-selection/delete-aks"]);
    }

  onClickGcp(){
      this.router.navigate(["/home/delete-cloud-selection/delete-gke"]);
    }
  }