import {IWebsocketResponse} from "./websocket-response.interface";

export interface IPixelToDraw extends IWebsocketResponse {
  pencilweight: string;
  drawcolor: string;
  yStartPosition: number;
  yEndPosition: number;
  xStartPosition: number;
  xEndPosition: number;
}
