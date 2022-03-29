import {IWebsocketResponse} from "./websocket-response.interface";
import {IRanking} from "./ranking.interface";

export interface IRoundStatistic extends IWebsocketResponse{
  roundNumber: number;
  correctWord: string;
  roundPoints: any;
  overallRanking: IRanking[];
}
