import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isLoggedIn:boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn=localStorage.getItem('loggedIn') !== 'false';
  }

  onLogin() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      localStorage.setItem("loggedIn",String(this.isLoggedIn))
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  
   changeLinkColor(event: MouseEvent) {
      const clickedLink = event.target as HTMLElement;
  
      document.querySelectorAll('.header-list-navbar-menu-item').forEach(link => {
        link.classList.remove('.active');
      });
      clickedLink.classList.add('.active');
      clickedLink.style.color = 'white'; 
    }
   
    
}

  
    

