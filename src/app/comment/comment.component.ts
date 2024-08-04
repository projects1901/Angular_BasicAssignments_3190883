import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { IComment } from '../model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { CommonserviceService } from '../services/commonservice.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() apartmentId: number = 0;
  comments: IComment[] = [];
  newComment: string = '';
  replyCommentId: number | null = null;
  replyText: string = '';
  isUserLogged: boolean = false;

  constructor(private commentService: CommentService, private commonService: CommonserviceService) {
    this.commentService.comments$.subscribe(comments => {
      this.comments = comments.filter(comment => comment.id === this.apartmentId);
    });
  }

  ngOnInit()
  {
    this.isUserLogged = this.commonService.isUserLoggedIn;
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const newComment: IComment = {
        id: this.comments.length + 1, // Simple ID assignment
        userId: this.commonService.currentLoggedInUser?.userId ?? 0, 
        username: this.commonService.currentLoggedInUser?.name ?? '', 
        text: this.newComment,
        createdAt: new Date(),
        replies: []
      };
      this.commentService.addComment(newComment);
      this.newComment = '';
    }
  }

  addReply(commentId: number): void {
    if (this.replyText.trim()) {
      const reply: IComment = {
        id: this.comments.length + 1, 
        userId: this.commonService.currentLoggedInUser?.userId ?? 0, 
        username: this.commonService.currentLoggedInUser?.name ?? '', 
        text: this.replyText,
        createdAt: new Date()
      };
      this.commentService.addReply(commentId, reply);
      this.replyText = '';
      this.replyCommentId = null;
    }
  }

}
