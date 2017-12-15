import { FilesystemItemModel } from './filesystem-item';
import { UserModel } from './user';

export class MailModel {
  id: number;
  subject: string;
  content: string;
  created_at: string;
  read_at: string;
  sender: UserModel;
  file: FilesystemItemModel;
}
