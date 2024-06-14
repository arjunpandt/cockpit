import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-cluster',
  templateUrl: './my-cluster.component.html',
  styleUrls: ['./my-cluster.component.scss']
})
export class MyClusterComponent implements OnInit {
  showProgressBar: boolean = false;
  showCard:boolean = false;
    username: string='';
    cardTitle:string='';
    awsBody={};
    azureBody={};
    gcpBody={};
    sampleData = {};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: RegisterService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") ?? '';

  }
  
  onClickAzure(){
    // this.showProgressBar = true;
    this.cardTitle="Azure";
    this.showCard =true;
    this.azureBody={
      account_name: this.username
    }
    }

  onClickGcp(){
    this.cardTitle="GCP";
    this.showCard =true;
    }
    onNextEks(){
      this.cardTitle="Aws";
      this.showCard =true;
    }
  }