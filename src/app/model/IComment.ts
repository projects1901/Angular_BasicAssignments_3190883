export interface IComment {
  id: number;
  userId: number;
  username: string;
  text: string;
  createdAt: Date;
  replies?: IComment[]; // Nested replies
}
