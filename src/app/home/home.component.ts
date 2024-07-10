import { Component, OnInit } from '@angular/core';

declare var Razorpay: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  successMessage:string='';
  selectedTabIndex = 0;

  tabs = ['Create Cluster', 'My Cluster', 'Account Details', 'Cluster Status', 'Application Deployment', 'Cost Optimisation', 'Delete Cluster' ];

  onTabClick(index: number): void {
    this.selectedTabIndex = index;
  }

  constructor() { }

  ngOnInit() {
  }

  payNow(){
    const RozarpayOptions = {
      description: 'Shahenvaz Shop',
      currency: 'INR',
      amount: 100000,
      name: 'Shahenvaz',
      key: 'rzp_test_iLkF88bWvWxkwp',
      image: '',
      prefill: {
        name: 'Shahenvaz',
        email: 'shahenvaz@razorpay.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  
  }
}
