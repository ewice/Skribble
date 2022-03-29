import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {GameFacade} from "../../../shared/services/game.facade";
import {IPlayer} from '../../../shared/types/player.interface';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  players: Observable<IPlayer[]> | undefined;

  constructor(private gameFacade: GameFacade) {
    this.players = this.gameFacade.getPlayers$();
  }
}
