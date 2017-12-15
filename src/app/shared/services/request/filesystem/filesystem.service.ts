import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

export class FilesystemService extends RequestService {
  constructor(http: Http, userService: UserService, folderId?: number) {
    super(http, userService, 'get', 'api/files' + (folderId === null ? '' : '/' + folderId));
  }
}
