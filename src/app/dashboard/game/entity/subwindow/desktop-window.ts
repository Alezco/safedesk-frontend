export class DesktopWindow {
  private readonly MIN_RESIZABLE_WIDTH = 50;
  private readonly MIN_RESIZABLE_HEIGHT = 50;
  private readonly THRESHOLD_MARGIN = 4;

  public clicked = null;
  private onRightEdge;
  private onBottomEdge;
  private onLeftEdge;
  private onTopEdge;

  public paneRectangle;
  private x: number;
  private y: number;

  public pane: any;

  constructor(pane) {
    this.pane = pane;
  }

  public startAction(event) {
    this.calculate(event);

    const isResizing = this.onRightEdge || this.onBottomEdge || this.onTopEdge || this.onLeftEdge;

    this.clicked = {
      x: this.x,
      y: this.y,
      cx: event.clientX,
      cy: event.clientY,
      w: this.paneRectangle.width,
      h: this.paneRectangle.height,
      isResizing,
      isMoving: !isResizing && this.isDesktopWindowMovable(),
      onTopEdge: this.onTopEdge,
      onLeftEdge: this.onLeftEdge,
      onRightEdge: this.onRightEdge,
      onBottomEdge: this.onBottomEdge,
    };
  }

  public onAction(event) {
    this.calculate(event);
    this.redrawDesktopWindow(event);
  }

  public stopAction(event) {
    this.calculate(event);
    this.clicked = null;
  }

  private calculate(event: any): void {
    this.paneRectangle = this.pane.getBoundingClientRect();
    this.x = event.clientX - this.paneRectangle.left;
    this.y = event.clientY - this.paneRectangle.top;

    this.onTopEdge = this.y < this.THRESHOLD_MARGIN;
    this.onLeftEdge = this.x < this.THRESHOLD_MARGIN;
    this.onRightEdge = this.x >= this.paneRectangle.width - this.THRESHOLD_MARGIN;
    this.onBottomEdge = this.y >= this.paneRectangle.height - this.THRESHOLD_MARGIN;
  }

  private redrawDesktopWindow(event): void {
    if (this.clicked && this.clicked.isResizing) {
      this.resizeDesktopWindow(event);
    } else if (this.clicked && this.clicked.isMoving) {
      this.moveDesktopWindow(event);
    } else {
      this.updatePaneCursorStyle();
    }
  }

  private isDesktopWindowMovable(): boolean {
    return this.x > 0 && this.x < this.paneRectangle.width &&
      this.y > 0 && this.y < this.paneRectangle.height &&
      this.y < this.MIN_RESIZABLE_HEIGHT;
  }

  private resizeDesktopWindow(event: any): void {
    if (this.clicked.onRightEdge) {
      this.pane.style.width = Math.max(this.x, this.MIN_RESIZABLE_WIDTH) + 'px';
    }

    if (this.clicked.onBottomEdge) {
      this.pane.style.height = Math.max(this.y, this.MIN_RESIZABLE_HEIGHT) + 'px';
    }

    if (this.clicked.onLeftEdge) {
      const currentWidth = this.getCurrentWidth(event);
      if (currentWidth > this.MIN_RESIZABLE_WIDTH) {
        this.pane.style.width = currentWidth + 'px';
        this.pane.style.left = event.clientX + 'px';
      }
    }

    if (this.clicked.onTopEdge) {
      const currentHeight = this.getCurrentHeight(event);
      if (currentHeight > this.MIN_RESIZABLE_HEIGHT) {
        this.pane.style.height = currentHeight + 'px';
        this.pane.style.top = event.clientY + 'px';
      }
    }
  }

  private moveDesktopWindow(event): void {
    // Restrain subwindow in screen height
    if (event.clientY - this.clicked.y < 60) {
      return;
    }
    this.pane.style.top = (event.clientY - this.clicked.y) + 'px';
    this.pane.style.left = (event.clientX - this.clicked.x) + 'px';
  }

  private getCurrentWidth(event): number {
    return Math.max(this.clicked.cx - event.clientX  + this.clicked.w, this.MIN_RESIZABLE_HEIGHT);
  }

  private getCurrentHeight(event): number {
    return Math.max(this.clicked.cy - event.clientY  + this.clicked.h, this.MIN_RESIZABLE_HEIGHT);
  }

  private updatePaneCursorStyle(): void {
    if (this.onRightEdge && this.onBottomEdge || this.onLeftEdge && this.onTopEdge) {
      this.pane.style.cursor = 'nwse-resize';
    } else if (this.onRightEdge && this.onTopEdge || this.onBottomEdge && this.onLeftEdge) {
      this.pane.style.cursor = 'nesw-resize';
    } else if (this.onRightEdge || this.onLeftEdge) {
      this.pane.style.cursor = 'ew-resize';
    } else if (this.onBottomEdge || this.onTopEdge) {
      this.pane.style.cursor = 'ns-resize';
    } else if (this.isDesktopWindowMovable()) {
      this.pane.style.cursor = 'move';
    } else {
      this.pane.style.cursor = 'default';
    }
  }
}
