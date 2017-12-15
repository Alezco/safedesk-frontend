import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { FilesystemService } from './filesystem.service';

@Injectable()
export class FilesystemServiceBuilderService {
  private http: Http;
  private userService: UserService;

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  public build(folderId?: number): FilesystemService {
    return new FilesystemService(this.http, this.userService, folderId);
  }
}
