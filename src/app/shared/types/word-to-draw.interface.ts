import {IWebsocketResponse} from "./websocket-response.interface";
import {IWord} from "./word.interface";

export interface IWordToDraw extends IWebsocketResponse {
  wordToDraw: IWord;
}
