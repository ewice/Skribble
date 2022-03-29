import {IWebsocketResponse} from "./websocket-response.interface";
import {IPixelToDraw} from "./pixel-to-draw.interface";

export interface IDraw extends IWebsocketResponse{
  pixelToUpdate: IPixelToDraw;
}
