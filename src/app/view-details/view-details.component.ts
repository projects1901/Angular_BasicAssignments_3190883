import { Component } from '@angular/core';
import { IPost } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, CommentComponent],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {

  apartment: IPost | any;

  constructor(private route: ActivatedRoute, private commonService: CommonserviceService, private router: Router, private commentService: CommentService) {
    
  }
  ngOnInit()
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // Fetch the apartment details
      this.apartment = this.commonService.allListing.find(a => a.id === id);
    }
  }
  goBack(): void {
    this.router.navigate(['home']);
  }

}
