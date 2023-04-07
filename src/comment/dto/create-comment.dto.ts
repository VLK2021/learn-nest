export class CreateCommentDto {
  public text: string;
  public published: boolean;
  public authorId: number;
  public postId: number;
}