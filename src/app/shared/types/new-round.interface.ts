import {IPlayer} from "./player.interface";
import {IWebsocketResponse} from "./websocket-response.interface";

export interface INewRound extends IWebsocketResponse {
  drawer: IPlayer;
  lengthOfWord: number;
  roundNumber: number;
}
