import {IWebsocketResponse} from "./websocket-response.interface";
import {IPlayer} from "./player.interface";
import {IGameStatus} from "./game-status.interface";

export interface IUserJoined extends IWebsocketResponse{
  gameIntermediateStatus: IGameStatus;
  hasGameStarted: boolean;
  allUser: IPlayer[]
}
