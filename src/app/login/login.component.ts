import { Component, OnInit, ElementRef, Renderer2  } from '@angular/core';
import { faAt, faUser, faLock,faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailIcon = faAt
  passwordIcon = faLock
  userIcon = faUser
  arrowIcon = faArrowUp
  repeatPassword: string= 'none';
  showProgressBar: boolean = false;

  createForm= new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(2)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(2)]),
    confirm_password: new FormControl('',[Validators.required])
  });

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(private elementRef: ElementRef, 
    private renderer: Renderer2, 
    private service: RegisterService,
    private router: Router,
    private toast: ToastrService) {
  }

  ngAfterViewInit(): void {
    const signUpButton = this.elementRef.nativeElement.querySelector('#signUp');
    const signInButton = this.elementRef.nativeElement.querySelector('#signIn');
    const container = this.elementRef.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () =>
      this.renderer.addClass(container, 'right-panel-active')
    );

    signInButton.addEventListener('click', () =>
      this.renderer.removeClass(container, 'right-panel-active')
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.Password.value === this.ConfirmPassword.value){
    this.service.postRegister(this.createForm.value).subscribe((res)=>{
      this.router.navigate(['/login']);
      this.createForm.reset();
      this.repeatPassword='none';
      location.reload();
    }, (error)=>{
      this.toast.error(error.error.message)
    })
  }
  else{
    this.repeatPassword = 'inline'
  }
  }

  onLoginSubmit(){
    this.showProgressBar = true;
    this.service.login(this.loginForm.value).subscribe((res)=>{
      this.showProgressBar = false;
      localStorage.setItem('loggedIn','true');
      localStorage.setItem('username',res.username);
      this.toast.success(res.message)
      this.router.navigate(['/dashboard']);
    }, (error)=>{
      this.showProgressBar = false;
      this.toast.error(error.error.message)
    })

  }

  get Username():FormControl{
    return this.createForm.get("username") as FormControl;
  }

  get Email():FormControl{
    return this.createForm.get("email") as FormControl;
  }

  get Password():FormControl{
    return this.createForm.get("password") as FormControl;
  }

  get ConfirmPassword():FormControl{
    return this.createForm.get("confirm_password") as FormControl;
  }

  get LoginEmail():FormControl{
    return this.loginForm.get("email") as FormControl;
  }

  get LoginPassword():FormControl{
    return this.loginForm.get("password") as FormControl;
  }
}
