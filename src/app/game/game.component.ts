import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HomeApi} from "../shared/api/home.api";
import {GameFacade} from "../shared/services/game.facade";
import {WebsocketApi} from "../shared/api/websocket.api";
import {IWebsocketResponse} from "../shared/types/websocket-response.interface";
import {IRoundStatistic} from "../shared/types/round-statistic.interface";
import {IMessage} from "@stomp/stompjs";
import {IGameEndedRanking} from "../shared/types/game-ended-ranking.interface";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  currentRound$: Observable<number>;
  gameEndedRanking$: Observable<IGameEndedRanking | undefined>;
  gameStarted$: Observable<boolean>;
  roundStatistic$: Observable<IRoundStatistic | undefined>;
  timer$: Observable<number>;
  wordCharacters$: Observable<number[]>;
  wordToDraw$: Observable<string | undefined>

  private subscriptions = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: HomeApi,
    private gameFacade: GameFacade,
    private websocketService: WebsocketApi
  ) {
    this.currentRound$ = this.gameFacade.getCurrentRound$();
    this.gameEndedRanking$ = this.gameFacade.getGameEndedRanking$()
    this.gameStarted$ = this.gameFacade.isGameStarted$()
    this.roundStatistic$ = this.gameFacade.getRoundStatistic$();
    this.timer$ = this.gameFacade.getTimer$();
    this.wordCharacters$ = this.gameFacade.getWordCharacters$();
    this.wordToDraw$ = this.gameFacade.getWordToDraw$();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
      this.websocketService.gameId = params['id'];
    }));
    this.subscriptions.add(this.websocketService.getGame$().subscribe((message: IMessage) => {
      this.gameFacade.handleGameMessage(JSON.parse(message.body) as IWebsocketResponse);
    }));
    this.subscriptions.add(this.websocketService.getUser$().subscribe((message: IMessage) => {
      this.gameFacade.handleUserMessage(JSON.parse(message.body) as IWebsocketResponse);
    }));
    this.gameFacade.addUserToGame();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.websocketService.gameId = undefined;
  }
}
