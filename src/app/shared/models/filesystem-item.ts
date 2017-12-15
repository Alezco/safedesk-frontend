export class FilesystemItemModel {
  public id: number;
  public filename: string;
  public extension: string;
  public type: string;
  public parent_id?: number;
  public content?: string;
  public origin: string;
}
