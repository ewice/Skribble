import {ICanvas} from "./canvas.interface";
import {IPlayer} from "./player.interface";

export interface IGameStatus {
  canvas: ICanvas;
  currentRound: number;
  totalRounds: number;
  lengthOfActiveWord: number;
  drawer: IPlayer;
}
