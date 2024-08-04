import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IComment } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsSubject = new BehaviorSubject<IComment[]>([]);
  comments$ = this.commentsSubject.asObservable();

  private comments: IComment[] = [];

  constructor() {
    this.commentsSubject.next(this.comments);
  }

  getComments(): IComment[] {
    return this.comments;
  }

  addComment(comment: IComment): void {
    this.comments.push(comment);
    this.commentsSubject.next(this.comments);
  }

  addReply(commentId: number, reply: IComment): void {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.push(reply);
      this.commentsSubject.next(this.comments);
    }
  }
}
