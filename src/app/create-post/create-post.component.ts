import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../model';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  createPost = new FormGroup({
    apartment: new FormControl("", Validators.required),
    name: new FormControl("",Validators.required),
    sharedProperty: new FormControl(""),
    location: new FormControl("", Validators.required),
    squareFeet: new FormControl(""),
    leaseType: new FormControl(""),
    expectedAmount: new FormControl("", Validators.required),
    negotiable: new FormControl(false),
    priceMode: new FormControl(""),
    furnished: new FormControl(""),
    swimming: new FormControl(false),
    carPark: new FormControl(false),
    waterHeater: new FormControl(false),
    clubHouse: new FormControl(false),
    elevator: new FormControl(false),
    powerBackup: new FormControl(false),
    gym: new FormControl(false),
    title: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    description: new FormControl("", [Validators.required, Validators.maxLength(1400)]),
    photos: new FormControl("", Validators.required)
  });

  post?: IPost;

  constructor(private route: Router, private commonService: CommonserviceService) {
    
  }

  onSubmit() {    

    if (this.createPost.valid)
    {
      this.post = {
        ownerName: this.createPost.value.name ?? "",
        apartmentType: this.createPost.value.apartment ?? "",
        isSharedProperty: this.createPost.value.sharedProperty === "yes",
        location: this.createPost.value.location ?? "",
        squareFeet: this.createPost.value.squareFeet ?? "",
        leaseType: this.createPost.value.leaseType ?? "",
        expectedAmount: Number(this.createPost.value.expectedAmount) ?? 0,
        isNegotiable: this.createPost.value.negotiable ?? false,
        priceMode: this.createPost.value.priceMode ?? "",
        isFurnished: this.createPost.value.furnished === "true",
        amenities: {
          swimming: this.createPost.value.swimming ?? false,
          carPark: this.createPost.value.carPark ?? false,
          waterHeater: this.createPost.value.waterHeater ?? false,
          clubHouse: this.createPost.value.clubHouse ?? false,
          elevator: this.createPost.value.elevator ?? false,
          powerBackup: this.createPost.value.powerBackup ?? false,
          gym: this.createPost.value.gym ?? false
        },
        title: this.createPost.value.title ?? "",
        description: this.createPost.value.description ?? "",
        photosPath: this.createPost.value.photos ?? "",
        createdBy: this.commonService.currentLoggedInUser?.userId ?? 0,
        createdDate: new Date(),
        id: this.commonService.postIndex + 1
      }
      this.commonService.postIndex = this.post.id;
      this.commonService.Post(this.post);
      this.route.navigate(['home']);
    }
    else{
      alert("Please enter details");
    }
  }

}
