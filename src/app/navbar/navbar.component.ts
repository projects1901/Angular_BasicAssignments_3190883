import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RegisterComponent, LoginFormComponent, NgIf, RouterModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  userName?: string;

  constructor(private commonService: CommonserviceService) {
    
  }
  
  ngOnInit() {
    this.isLoggedIn = this.commonService.isUserLoggedIn;
    if(this.isLoggedIn)
    {
      this.userName = this.commonService.currentLoggedInUser?.name;
    }
  }

  OnLogout()
  {
    this.isLoggedIn = false;
    this.commonService.isUserLoggedIn = false;
  }


}
