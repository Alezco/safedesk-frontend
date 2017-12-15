import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { RequestService } from '../request.service';

export class PaginationService extends RequestService {
  constructor(http: Http, userService: UserService, pageUrl: string) {
    super(http, userService, 'get', pageUrl);
  }
}
