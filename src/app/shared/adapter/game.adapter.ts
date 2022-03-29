import {Injectable} from "@angular/core";
import {IPlayer} from "../types/player.interface";
import {IRoundStatistic} from "../types/round-statistic.interface";
import {IPixelToDraw} from "../types/pixel-to-draw.interface";
import {IPixel} from "../types/pixel.interface";

@Injectable({
  providedIn: 'root'
})
export class GameAdapter {
  constructor() {
  }

  extractPixelsOfPixelToDraw(pixelToDraw: IPixelToDraw): IPixel[] {
    return [{
      x: pixelToDraw.xStartPosition,
      y: pixelToDraw.yStartPosition
    }, {
      x: pixelToDraw.xEndPosition,
      y: pixelToDraw.yEndPosition,
    }]
  }

  extractArrayFromWordLength(lengthOfWord: number): number[] {
    return Array(lengthOfWord).fill(0).map((x, i) => i)
  }

  extendPlayersWithRoundRanking(roundStatistic: IRoundStatistic, players: IPlayer[]): IPlayer[] {
      for (const player of players) {
        const round = roundStatistic.overallRanking.find(round => round.gameUserDTO.username === player.username)
        player.rank = round?.rank;
        player.score = round?.score;
      }
      return players;
  }
}
