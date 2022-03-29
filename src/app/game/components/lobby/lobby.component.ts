import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {faChevronLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {GameFacade} from "../../../shared/services/game.facade";
import {IPlayer} from "../../../shared/types/player.interface";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  host$: Observable<boolean>;
  players$: Observable<IPlayer[]> | undefined;

  faChevronLeft = faChevronLeft;
  faPlay = faPlay;

  constructor(private gameFacade: GameFacade, private router: Router) {
    this.host$ = this.gameFacade.isHost$();
    this.players$ = this.gameFacade.getPlayers$();
  }

  onStartGameClicked(): void {
    this.gameFacade.startGame();
  }

  navigateHome(): void {
    this.router.navigate(['home']);
  }
}
