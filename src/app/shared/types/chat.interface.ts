import {IWebsocketResponse} from "./websocket-response.interface";

export interface IChat extends IWebsocketResponse{
  message: string;
  correct?: boolean;
  username?: string;
}
