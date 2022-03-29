import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {IChat} from "../types/chat.interface";
import {IPlayer} from "../types/player.interface";
import {IRoundStatistic} from "../types/round-statistic.interface";
import {IPixelToDraw} from "../types/pixel-to-draw.interface";
import {IGameStatistic} from "../types/game-statistic.interface";
import {IGameEndedRanking} from "../types/game-ended-ranking.interface";

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private clearCanvas$ = new BehaviorSubject<boolean>(false);
  private currentRound$ = new BehaviorSubject<number>(1);
  private gameEndedRanking$ = new BehaviorSubject<IGameEndedRanking | undefined>(undefined);
  private gameStarted$ = new BehaviorSubject<boolean>(false);
  private gameStatistics$ = new BehaviorSubject<IGameStatistic[] | undefined>(undefined);
  private host$ = new BehaviorSubject<boolean>(false);
  private messages$ = new BehaviorSubject<IChat[]>([]);
  private pixelToDraw$ = new BehaviorSubject<IPixelToDraw | undefined>(undefined);
  private players$ = new BehaviorSubject<IPlayer[]>([]);
  private roundStatistic$ = new BehaviorSubject<IRoundStatistic | undefined>(undefined);
  private timer$ = new BehaviorSubject<number>(60);
  private wordCharacters$ = new BehaviorSubject<number[]>([]);
  private wordToDraw$ = new BehaviorSubject<string | undefined>(undefined);

  isClearCanvas$(): Observable<boolean> {
    return this.clearCanvas$.asObservable();
  }

  setClearCanvas(clearCanvas: boolean): void {
    this.clearCanvas$.next(clearCanvas);
  }

  getCurrentRound$(): Observable<number> {
    return this.currentRound$.asObservable();
  }

  setCurrentRound(currentRound: number): void {
    this.currentRound$.next(currentRound);
  }

  getGameEndedRanking$(): Observable<IGameEndedRanking | undefined> {
    return this.gameEndedRanking$.asObservable();
  }

  setGameEndedRanking(gameEndedRanking: IGameEndedRanking | undefined): void {
    this.gameEndedRanking$.next(gameEndedRanking);
  }

  isGameStarted$(): Observable<boolean> {
    return this.gameStarted$.asObservable();
  }

  setGameStarted(gameStarted: boolean): void {
    this.gameStarted$.next(gameStarted);
  }

  getGameStatistics$(): Observable<IGameStatistic[] | undefined> {
    return this.gameStatistics$.asObservable();
  }

  setGameStatistics(gameStatistics: IGameStatistic[]): void {
    this.gameStatistics$.next(gameStatistics);
  }

  isHost$(): Observable<boolean> {
    return this.host$.asObservable();
  }

  setHost(host: boolean): void {
    this.host$.next(host);
  }

  getMessages$(): Observable<IChat[]> {
    return this.messages$.asObservable();
  }

  setMessages(messages: IChat[]): void {
    this.messages$.next(messages);
  }

  addMessage(message: IChat) {
    const currentMessages = this.messages$.getValue();
    this.messages$.next([...currentMessages, message]);
  }

  getPixelToDraw$(): Observable<IPixelToDraw | undefined> {
    return this.pixelToDraw$.asObservable();
  }

  setPixelToDraw(pixelToDraw: IPixelToDraw | undefined): void {
    this.pixelToDraw$.next(pixelToDraw);
  }

  getPlayers$(): Observable<IPlayer[]> {
    return this.players$.asObservable();
  }

  setPlayers(players: IPlayer[]): void {
    this.players$.next(players);
  }

  getRoundStatistic$(): Observable<IRoundStatistic | undefined> {
    return this.roundStatistic$.asObservable();
  }

  setRoundStatistic(roundStatistic: IRoundStatistic | undefined): void {
    this.roundStatistic$.next(roundStatistic);
  }

  getTimer$(): Observable<number> {
    return this.timer$.asObservable();
  }

  setTimer(timer: number): void {
    this.timer$.next(timer);
  }

  getWordCharacters$(): Observable<number[]> {
    return this.wordCharacters$.asObservable();
  }

  setWordCharacters(wordCharacters: number[]): void {
    this.wordCharacters$.next(wordCharacters);
  }

  getWordToDraw$(): Observable<string | undefined> {
    return this.wordToDraw$.asObservable();
  }

  setWordToDraw(wordToDraw: string | undefined): void {
    this.wordToDraw$.next(wordToDraw);
  }
}
