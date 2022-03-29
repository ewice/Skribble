import {Injectable} from "@angular/core";
import {first, Observable} from "rxjs";
import {AbstractControl} from "@angular/forms";
import {HomeApi} from "../api/home.api";
import {GameState} from "../state/game.state";
import {IChat} from "../types/chat.interface";
import {ActionType} from "../types/action-type.enum";
import {IPlayer} from "../types/player.interface";
import {Router} from "@angular/router";
import {IRoundStatistic} from "../types/round-statistic.interface";
import {IGameStatistic} from "../types/game-statistic.interface";
import {TokenStorageService} from "./token-storage.service";
import {IWebsocketResponse} from "../types/websocket-response.interface";
import {INewRound} from "../types/new-round.interface";
import {IDraw} from "../types/draw.interface";
import {WebsocketApi} from "../api/websocket.api";
import {IWordToDraw} from "../types/word-to-draw.interface";
import {IUserJoined} from "../types/user-joined.interface";
import {IPixelToDraw} from "../types/pixel-to-draw.interface";
import {IGameEndedRanking} from "../types/game-ended-ranking.interface";
import {AppState} from "../state/app.state";
import {GameAdapter} from "../adapter/game.adapter";

@Injectable({
  providedIn: 'root'
})
export class GameFacade {
  private timer: any;
  private clearCanvas = false;

  constructor(
    private appState: AppState,
    private gameAdapter: GameAdapter,
    private gameState: GameState,
    private homeApi: HomeApi,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private websocketService: WebsocketApi
  ) {
  }

  // Clear Canvas
  isClearCanvas$(): Observable<boolean> {
    return this.gameState.isClearCanvas$();
  }

  setClearCanvas(clearCanvas: boolean): void {
    this.gameState.setClearCanvas(clearCanvas);
  }

  // Current Round
  getCurrentRound$(): Observable<number> {
    return this.gameState.getCurrentRound$();
  }

  setCurrentRound(currentRound: number): void {
    this.gameState.setCurrentRound(currentRound);
  }

  submitChatMessage(formControl: AbstractControl | null, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (formControl?.value) {
      this.sendMessage({
        actionType: ActionType.CHAT,
        message: formControl.value
      });
      formControl.setValue('');
    }
  }

  // Game
  isGameStarted$(): Observable<boolean> {
    return this.gameState.isGameStarted$();
  }

  setGameStarted(gameStarted: boolean): void {
    this.gameState.setGameStarted(gameStarted);
  }

  createGame(): void {
    this.homeApi.createNewGame().subscribe(gameId => {
      this.router.navigate(['game', gameId]);
    });
  }

  startGame(): void {
    this.websocketService.sendMessage({
      actionType: ActionType.START_GAME
    });
  }

  // Game ended
  getGameEndedRanking$(): Observable<IGameEndedRanking | undefined> {
    return this.gameState.getGameEndedRanking$();
  }

  setGameEndedRanking(gameEndedRanking: IGameEndedRanking | undefined): void {
    this.gameState.setGameEndedRanking(gameEndedRanking);
  }

  // GameStatistics
  getGameStatistics(): void {
    this.homeApi.getGameStatistics().subscribe(gameStatistics => {
      this.setGameStatistics(gameStatistics.reverse());
    });
  }

  getGameStatistics$(): Observable<IGameStatistic[] | undefined> {
    return this.gameState.getGameStatistics$();
  }

  setGameStatistics(gameStatistics: IGameStatistic[]): void {
    this.gameState.setGameStatistics(gameStatistics);
  }

  // Host
  private isCurrentUserHost(allUser: IPlayer[]): boolean {
    const username = this.tokenStorageService.getUsername();
    if (username) {
      return allUser.some(user => username === user.username && user.host);
    }
    return false;
  }

  isHost$(): Observable<boolean> {
    return this.gameState.isHost$();
  }

  setHost(host: boolean): void {
    this.gameState.setHost(host);
  }

  // Loading
  isLoading$(): Observable<boolean> {
    return this.appState.isLoading$();
  }

  setLoading(loading: boolean): void {
    this.appState.setLoading(loading);
  }

  // Message
  getMessages$(): Observable<IChat[]> {
    return this.gameState.getMessages$();
  }

  setMessages(messages: IChat[]): void {
    this.gameState.setMessages(messages);
  }

  addMessage(message: IChat) {
    this.gameState.addMessage(message);
  }

  sendMessage(messageObject: any): void {
    this.websocketService.sendMessage(messageObject);
  }

  // Pixel to draw
  getPixelToDraw$(): Observable<IPixelToDraw | undefined> {
    return this.gameState.getPixelToDraw$();
  }

  setPixelToDraw(pixelToDraw: IPixelToDraw | undefined): void {
    this.gameState.setPixelToDraw(pixelToDraw);
  }

  // Player
  getPlayers$(): Observable<IPlayer[]> {
    return this.gameState.getPlayers$();
  }

  setPlayers(players: IPlayer[]): void {
    this.gameState.setPlayers(players);
  }

  setPlayerRank(roundStatistic: IRoundStatistic): void {
    this.getPlayers$().pipe(first()).subscribe(players => {
      players = this.gameAdapter.extendPlayersWithRoundRanking(roundStatistic, players);
      this.setPlayers(players);
    })
  }

  // RoundStatistic
  getRoundStatistic$(): Observable<IRoundStatistic | undefined> {
    return this.gameState.getRoundStatistic$();
  }

  setRoundStatistic(roundStatistic: IRoundStatistic | undefined): void {
    this.gameState.setRoundStatistic(roundStatistic);
  }

  // Timer
  getTimer$(): Observable<number> {
    return this.gameState.getTimer$();
  }

  setTimer(timer: number): void {
    return this.gameState.setTimer(timer);
  }

  startTimer(): void {
    if (this.timer) {
      clearInterval(this.timer)
    }
    let countdown = 60;
    this.timer = setInterval(() => {
      this.setTimer(countdown);
      countdown--;
      if (countdown === 0) {
        clearInterval(this.timer)
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  // Websocket
  addUserToGame(): void {
    this.websocketService.sendMessage({
      actionType: ActionType.ADD_USER_TO_GAME
    });
  }

  handleGameMessage(response: IWebsocketResponse): void {
    switch (response.actionResponseType) {
      case ActionType.CHAT:
        this.addMessage(response as IChat);
        break;
      case ActionType.USER_JOINED:
        const userJoinedResponse = response as IUserJoined;
        this.setPlayers(userJoinedResponse.allUser);
        if (this.isCurrentUserHost(userJoinedResponse.allUser)) {
          this.setHost(true);
        }
        this.setLoading(false);
        break;
      case ActionType.START_GAME:
        this.setMessages([]);
        this.setGameStarted(true);
        break;
      case ActionType.NEW_ROUND:
        this.startTimer();
        const newRound = response as INewRound;
        this.setRoundStatistic(undefined);
        this.setCurrentRound(newRound.roundNumber);
        this.setWordCharacters(this.gameAdapter.extractArrayFromWordLength(newRound.lengthOfWord));
        break;
      case ActionType.ROUND_STATISTICS:
        this.stopTimer();
        this.setWordToDraw(undefined);
        const roundStatistic = response as IRoundStatistic;
        this.setRoundStatistic(roundStatistic);
        this.setPlayerRank(roundStatistic)
        break;
      case ActionType.DRAW:
        const drawing = response as IDraw;
        this.setPixelToDraw(drawing.pixelToUpdate);
        break;
      case ActionType.CLEAR_CANVAS:
        this.clearCanvas = !this.clearCanvas;
        this.setClearCanvas(this.clearCanvas);
        break;
      case ActionType.GAME_ENDED_RANKING:
        const gameEndedRanking = response as IGameEndedRanking;
        this.setGameEndedRanking(gameEndedRanking);
    }
  }

  handleUserMessage(response: IWebsocketResponse) {
    switch (response.actionResponseType) {
      case ActionType.DRAWER_WORD:
        const drawerWord = response as IWordToDraw;
        this.setWordToDraw(drawerWord.wordToDraw.value);
    }
  }

  // Word characters
  getWordCharacters$(): Observable<number[]> {
    return this.gameState.getWordCharacters$();
  }

  setWordCharacters(wordCharacters: number[]): void {
    return this.gameState.setWordCharacters(wordCharacters);
  }

  // Word to draw
  getWordToDraw$(): Observable<string | undefined> {
    return this.gameState.getWordToDraw$();
  }

  setWordToDraw(wordToDraw: string | undefined): void {
    return this.gameState.setWordToDraw(wordToDraw);
  }
}
