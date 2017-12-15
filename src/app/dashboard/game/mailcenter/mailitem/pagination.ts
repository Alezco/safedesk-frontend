import { IPageChangeEvent, TdPagingBarComponent } from '@covalent/core';
export class Pagination {
  private static readonly DEFAULT_PAGE_SIZE = 5;
  private static readonly DEFAULT_PAGE_NUMBER = 1;

  private serverTotal = 0;
  private currentPageNumber = Pagination.DEFAULT_PAGE_NUMBER;
  private currentPageSize = Pagination.DEFAULT_PAGE_SIZE;
  private endpoint = null;

  private pagingBar: TdPagingBarComponent;

  public setPagingBar(pagingBar: TdPagingBarComponent): void {
    this.pagingBar = pagingBar;
  }

  public setServerTotal(total: number): void {
    this.serverTotal = total;
  }

  public getTotal(): number {
    return this.serverTotal;
  }

  public update(event: IPageChangeEvent): void {
    this.currentPageNumber = event.page;
    this.currentPageSize = event.pageSize;
  }

  public reset(): void {
    this.endpoint = null;
    this.currentPageNumber = Pagination.DEFAULT_PAGE_NUMBER;
    this.currentPageSize = Pagination.DEFAULT_PAGE_SIZE;
    this.pagingBar.navigateToPage(1);
  }

  public setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  public getEndpoint(): string {
    return this.endpoint;
  }

  public isServerRequestNeeded(elements: any[]): boolean {
    return this.currentPageSize * this.currentPageNumber > elements.length && this.endpoint !== null;
  }

  public filterData(data: any[]): any[] {
    return data.slice(this.fromRow(), this.toRow());
  }

  private fromRow(): number {
    return this.currentPageSize * (this.currentPageNumber - 1);
  }

  private toRow(): number {
    const nextMax = this.currentPageSize * this.currentPageNumber;
    return nextMax > this.serverTotal ? this.serverTotal : nextMax;
  }
}
