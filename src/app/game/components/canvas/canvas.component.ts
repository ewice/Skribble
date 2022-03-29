import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import {fromEvent, Observable, pairwise, Subscription, switchMap, takeUntil} from 'rxjs';
import {GameFacade} from "../../../shared/services/game.facade";
import {ActionType} from "../../../shared/types/action-type.enum";
import {CanvasLineWidth} from "../../../shared/types/canvas-line-width.enum";
import {CanvasStrokeStyle} from "../../../shared/types/canvas-stroke-style.enum";
import {IPixelToDraw} from "../../../shared/types/pixel-to-draw.interface";
import {GameAdapter} from "../../../shared/adapter/game.adapter";


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container') container: ElementRef | undefined;
  @ViewChild('canvas') canvas: ElementRef | undefined;

  clearCanvas$: Observable<boolean>;
  pixelToDraw$: Observable<IPixelToDraw | undefined>;
  wordToDraw$: Observable<string | undefined>;

  private lineWidth = CanvasLineWidth.MITTEL;

  faCircle = faCircle;
  faTrash = faTrash;
  canvasLineWidth = CanvasLineWidth;
  canvasStrokeStyle = Object.values(CanvasStrokeStyle);
  isDrawer = false;
  strokeStyle: string = CanvasStrokeStyle.BLACK;
  subscription = new Subscription;

  private cx: CanvasRenderingContext2D | null | undefined;

  constructor(private gameAdapter: GameAdapter, private gameFacade: GameFacade) {
    this.clearCanvas$ = this.gameFacade.isClearCanvas$();
    this.pixelToDraw$ = this.gameFacade.getPixelToDraw$();
    this.wordToDraw$ = this.gameFacade.getWordToDraw$();
  }

  ngOnInit() {
    this.subscription.add(this.clearCanvas$.subscribe(_ => {
      const canvas: HTMLCanvasElement = this.canvas?.nativeElement;
      this.cx?.clearRect(0, 0, canvas.width, canvas.height);
    }));
    this.subscription.add(this.wordToDraw$.subscribe(wordToDraw => {
      this.isDrawer = !!wordToDraw;
    }));
    this.subscription.add(this.pixelToDraw$.subscribe(pixel => {
      if (pixel && !this.isDrawer) {
        const [prevPos, currentPos] = this.gameAdapter.extractPixelsOfPixelToDraw(pixel);
        if ( prevPos.x && prevPos.y && currentPos.x && currentPos.y) {
          this.setLineWidth((<any> CanvasLineWidth)[pixel.pencilweight]);
          this.setStrokeStyle(pixel.drawcolor);
          this.drawOnCanvas(prevPos, currentPos);
        }
      }
    }));
  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvas?.nativeElement;
    const container = this.container?.nativeElement;

    this.cx = canvas.getContext('2d');

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    if (!this.cx) throw 'Cannot get context';

    this.cx.lineWidth = this.lineWidth;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.strokeStyle;

    this.captureEvents(canvas);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((_) => {
          return fromEvent(canvasEl, 'mousemove').pipe(
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            pairwise()
          );
        })
      )
      .subscribe((res) => {
        const rect = canvasEl.getBoundingClientRect();
        const prevMouseEvent = res[0] as MouseEvent;
        const currMouseEvent = res[1] as MouseEvent;

        const prevPos = {
          x: prevMouseEvent.clientX - rect.left,
          y: prevMouseEvent.clientY - rect.top,
        };

        const currentPos = {
          x: currMouseEvent.clientX - rect.left,
          y: currMouseEvent.clientY - rect.top,
        };

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    if (!this.cx) {
      return;
    }

    if (prevPos) {
      this.cx.beginPath();
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
      if (this.isDrawer) {
        this.sendDrawing(prevPos, currentPos);
      }
    }
  }

  setStrokeStyle(color: string): void {
    this.strokeStyle = color;
    if (this.cx) {
      this.cx.strokeStyle = color;
    }
  }

  setLineWidth(lineWidth: CanvasLineWidth): void {
    this.lineWidth = lineWidth;
    if (this.cx) {
      this.cx.lineWidth = lineWidth;
    }
  }

  sendDrawing(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ): void {
    this.gameFacade.sendMessage({
      actionType: ActionType.DRAW,
      pixelToUpdate: {
        pencilweight: CanvasLineWidth[this.lineWidth],
        drawcolor: this.strokeStyle,
        yStartPosition: prevPos.y,
        yEndPosition: currentPos.y,
        xStartPosition: prevPos.x,
        xEndPosition: currentPos.x
      }
    })
  }

  clearCanvas(): void {
    const canvas: HTMLCanvasElement = this.canvas?.nativeElement;
    this.cx?.clearRect(0, 0, canvas.width, canvas.height);
    this.gameFacade.sendMessage({
      actionType: ActionType.CLEAR_CANVAS
    })
  }
}
