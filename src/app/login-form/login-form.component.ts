import { Component } from '@angular/core';
import { CommonserviceService } from '../services/commonservice.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor(private commonService: CommonserviceService, private route: Router) {

  }


  ngOnInit() {
  }

  loginForm = new FormGroup(
    {
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    }
  )

  onLoginClick() {
    const email = this.loginForm.value.email;
    const psd = this.loginForm.value.password;
    let user = this.commonService.allUsers.find(x => x.email == email && x.password == psd);


    if (this.loginForm.valid && user) {
      this.commonService.Login(true);
      this.commonService.currentLoggedInUser = user;
      alert('Login Successful');
      this.route.navigate(['home']);
    }
    else {
      alert("Invalid Credentials: Please enter valid credentials.");
    }
  }

}
