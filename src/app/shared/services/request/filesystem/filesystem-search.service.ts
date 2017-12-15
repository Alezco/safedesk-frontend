import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

export class FilesystemSearchService extends RequestService {
  constructor(http: Http, userService: UserService, pattern?: string) {
    super(http, userService, 'get', 'api/files/search' + (pattern === null ? '' : '/' + pattern));
  }
}
