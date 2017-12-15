import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';
import { TopLevelWindowManager } from '../../../../shared/services/window/window.service';
import { DesktopWindow } from './desktop-window';

export enum SubwindowType {
  MailCenter,
  Filesystem,
}

@Component({
  selector: 'app-sub-window',
  templateUrl: 'subwindow.component.html',
})

export class SubwindowComponent implements AfterViewInit {

  public Type = SubwindowType;
  public dynamicHeight: number;
  public filterString = '';

  @ViewChild('myPane') pane: ElementRef;
  @ViewChild('filesystem') fsElement;
  public desktopWindow: DesktopWindow;

  private highlightPipe: HighlightPipe;
  public windowManager: TopLevelWindowManager;
  @Input('topLevelIndex') topLevelIndex: string;
  @Input('type') type: string;
  @Input('title') title: string;
  @Input('content') content?: string = null;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() OpenDoc: EventEmitter<any> = new EventEmitter();
  private windowHeight: number;
  public contents: any;
  public showback: boolean;

  constructor(windowManager: TopLevelWindowManager, highlightPipe: HighlightPipe) {
    this.showback = false;
    this.windowManager = windowManager;
    this.highlightPipe = highlightPipe;
    this.windowManager.topLevels.push(this);
    this.windowHeight = window.innerHeight;
    this.dynamicHeight = this.windowHeight * .7 - 40;
    this.contents = [];
  }

  updateBackArrow(showBack: any) {
    this.showback = (this.fsElement.folderStack[this.fsElement.folderStack.length - 1] !== null);
  }

  up() {
    this.fsElement.up();
  }

  passDocToParent(item: any) {
    this.OpenDoc.emit(item);
    this.windowManager.setFocusFor(item);
  }
  public removeChild() {
    this.notifyParent.emit(this.topLevelIndex);
  }

  public ngAfterViewInit(): void {
    this.desktopWindow = new DesktopWindow(this.pane.nativeElement);
    this.registerMouseEvents();
    this.registerTouchEvents();
    this.contents.push(this.content);
    this.windowManager.setFocusFor(this);
  }

  private registerMouseEvents(): void {
    this.pane.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMove.bind(this));
    document.addEventListener('mouseup', this.onUp.bind(this));
  }

  private registerTouchEvents(): void {
    this.pane.nativeElement.addEventListener('touchstart', this.onTouchDown.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private onTouchDown(event: TouchEvent) {
    event.preventDefault();
    this.desktopWindow.startAction(event.touches[0]);

    this.windowManager.setFocusFor(this);
  }

  private onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.desktopWindow.startAction(event);

    this.windowManager.setFocusFor(this);
  }

  private onMove(event: MouseEvent) {
    this.desktopWindow.onAction(event);
  }

  private onTouchMove(event: TouchEvent) {
    this.desktopWindow.onAction(event.touches[0]);
  }

  private onUp(event: MouseEvent) {
    event.preventDefault();
    this.desktopWindow.stopAction(event);
    this.dynamicHeight = this.desktopWindow.paneRectangle.height - 45;
  }

  private onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    if (event.touches.length === 0) {
      this.desktopWindow.stopAction(event);
    }
  }

  public filterFileContent(searchName = ''): void {
    if (searchName === '') {
      this.contents = [];
      this.contents.push(this.content);
    } else {
      let tmp: string;
      tmp = this.content;
      this.filterString = searchName;
      tmp = this.highlightPipe.transform(tmp, this.filterString);
      this.contents = [];
      this.contents.push(tmp);
    }
  }
}
