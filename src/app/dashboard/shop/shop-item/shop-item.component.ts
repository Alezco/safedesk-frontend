import { Component, Input } from '@angular/core';
import { ShopService } from '../../../shared/services/request/shop/shop.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: 'shop-item.component.html',
})

export class ShopItemComponent {
  @Input('reference') reference: string;

  shopService: ShopService;
  public shopsItems: any[] = [];
  public workPlaces: any[] = [
    {
      id: 0,
      description: 'Regular office located on the second floor of the company headquarter in New York City',
      img: '../../../../assets/scenes/ny_1.jpeg',
      selected: true,
      locked: false,
      type: 'skybox',
      resource: 'tsccity',
    },
    {
      id: 1,
      description: 'Sub manager office located on the 25th floor of the company headquarter in New York City',
      img: '../../../../assets/scenes/ny_2.jpg',
      selected: false,
      locked: false,
      type: 'skybox',
      resource: 'ny',
    },
    {
      id: 2,
      description: 'Manager position in the heart of Sydney in Australia',
      img: '../../../../assets/scenes/sydney.jpg',
      selected: false,
      locked: true,
      type: 'skybox',
      resource: 'null',
    },
  ];
  public furniture: any[] = [
    {
      id: 0,
      description: 'Basic cathodic computer. Can takes up to 1 minutes to start',
      img: '../../../../assets/scenes/pc_1.jpg',
      selected: true,
      locked: false,
      type: 'computer',
      resource: 'basic',
    },
    {
      id: 1,
      description: 'Flat Screen monitor, HD display',
      img: '../../../../assets/scenes/pc_2.jpg',
      selected: false,
      locked: false,
      type: 'computer',
      resource: 'null',
    },
    {
      id: 2,
      description: 'Hight resolution OLED monitor',
      img: '../../../../assets/scenes/pc_3.jpg',
      selected: false,
      locked: true,
      type: 'computer',
      resource: 'null',
    },
  ];

  constructor(shopService: ShopService) {
    this.shopService = shopService;
    this.shopsItems = this.workPlaces;
    this.initSelection();
  }

  initSelection() {
    const computer = this.shopService.getComputerName();
    const skybox = this.shopService.getSkybox();
    for (const item of this.shopsItems) {
      if (item.resource === computer
        || item.resource === skybox) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    }
  }

  selectedItem(shopItem: any): void {
    for (const item of this.shopsItems) {
      if (item.id === shopItem.id) {
        if (!item.locked) {
          item.selected = true;
          if (item.type === 'skybox') {
            this.shopService.setSkybox(item.resource);
          } else if (item.type === 'computer') {
            this.shopService.setComputerName(item.resource);
          }
        }
      } else {
        item.selected = false;
      }
    }
  }

  loadWorkPlace() {
    this.shopsItems = this.workPlaces;
  }

  loadFurniture() {
    this.shopsItems = this.furniture;
  }
}
