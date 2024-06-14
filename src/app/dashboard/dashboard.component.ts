import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn=localStorage.getItem('loggedIn') !== 'false';
  }


  onLogin() {
    if(this.isLoggedIn){
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate(['/login']);
    }
}

}
