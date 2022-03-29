import {IWebsocketResponse} from "./websocket-response.interface";
import {IRanking} from "./ranking.interface";

export interface IGameEndedRanking extends IWebsocketResponse{
  roundNumber: number;
  resultRanking: IRanking[];
}
