import { Injectable } from '@angular/core';

@Injectable()
export class ShopService {
  private skyboxName: string;
  private computerName: string;

  constructor() {
    this.skyboxName = 'tsccity';
    this.computerName = 'basic';
  }

  getSkybox() {
    return this.skyboxName;
  }

  setSkybox(skyboxName: string) {
    this.skyboxName = skyboxName;
  }

  getComputerName() {
    return this.computerName;
  }

  setComputerName(computerName: string) {
    this.computerName = computerName;
  }
}
