import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {GameFacade} from "../../../shared/services/game.facade";
import {IGameEndedRanking} from "../../../shared/types/game-ended-ranking.interface";

@Component({
  selector: 'app-game-ended-ranking',
  templateUrl: './game-ended-ranking.component.html',
  styleUrls: ['./game-ended-ranking.component.scss']
})
export class GameEndedRankingComponent {
  gameEndedRanking$: Observable<IGameEndedRanking | undefined>;

  faChevronLeft = faChevronLeft;

  constructor(private gameFacade: GameFacade, private router: Router) {
    this.gameEndedRanking$ = this.gameFacade.getGameEndedRanking$();
  }

  navigateHome(): void {
    this.router.navigate(['home']);
  }

}
