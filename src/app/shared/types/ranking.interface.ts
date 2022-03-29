import {IPlayer} from "./player.interface";
import {IWebsocketResponse} from "./websocket-response.interface";

export interface IRanking extends IWebsocketResponse {
  rank: number;
  gameUserDTO: IPlayer;
  score: number;
}
