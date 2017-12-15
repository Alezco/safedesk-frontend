import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user/user.service';
import { FilesystemSearchService } from './filesystem-search.service';

@Injectable()
export class FilesystemSearchServiceBuilderService {
  private http: Http;
  private userService: UserService;

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  public build(folderId?: string): FilesystemSearchService {
    return new FilesystemSearchService(this.http, this.userService, folderId);
  }
}
