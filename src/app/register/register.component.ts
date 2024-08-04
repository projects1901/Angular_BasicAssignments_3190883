import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonserviceService } from '../services/commonservice.service';
import { IUser } from '../model';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private commonService: CommonserviceService, private route: Router) {
    
  }
  users!: IUser;
  isUserExists: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  });

  onSubmitClick() {
    this.users = {
        name : this.registerForm.value.name ?? "",
        email: this.registerForm.value.email ?? "",
        password: this.registerForm.value.password ?? "",
        userId: this.commonService.userIndex + 1
      };


    this.isUserExists = this.commonService.allUsers.find(x => x.email == this.users.email) ? true : false;
    if (this.registerForm.valid && !this.isUserExists)
    {
      this.commonService.userIndex = this.users.userId;
      this.commonService.register(this.users);
      alert("Registered Successfully.");
      this.route.navigate(['login']);
    }
    
  }
}
