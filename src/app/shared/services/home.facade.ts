import {Injectable} from "@angular/core";
import {forkJoin, Observable} from "rxjs";
import {HomeApi} from "../api/home.api";
import {GameState} from "../state/game.state";
import {Router} from "@angular/router";
import {IGameStatistic} from "../types/game-statistic.interface";
import {TokenStorageService} from "./token-storage.service";
import {HomeState} from "../state/home.state";
import {IPlayer} from "../types/player.interface";
import {IAvatar} from "../types/avatar.interface";
import {AppState} from "../state/app.state";

@Injectable({
  providedIn: 'root'
})
export class HomeFacade {
  constructor(
    private appState: AppState,
    private gameState: GameState,
    private homeApi: HomeApi,
    private homeState: HomeState,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
  }

  // Avatars
  getAvatars$(): Observable<IAvatar[]> {
    return this.homeState.getAvatars$();
  }

  setAvatars(avatars: IAvatar[]): void {
    this.homeState.setAvatars(avatars);
  }

  // CurrentUser
  getCurrentUser$(): Observable<IPlayer | undefined> {
    return this.homeState.getCurrentUser$();
  }

  setCurrentUser(currentUser: IPlayer | undefined): void {
    this.homeState.setCurrentUser(currentUser);
  }

  // GameStatistics
  getHomeData(): void {
    forkJoin([
      this.homeApi.getAllAvatars(),
      this.homeApi.getCurrentUserDetails(),
      this.homeApi.getGameStatistics(),
    ]).subscribe(response => {
      const avatars = Object.keys(response[0]).map(key => ({
        name: key,
        imagePath: response[0][key]
      }))
      this.setAvatars(avatars);
      this.setCurrentUser(response[1]);
      this.setGameStatistics(response[2].reverse());
      this.setLoading(false);
    });
  }

  getGameStatistics$(): Observable<IGameStatistic[] | undefined> {
    return this.gameState.getGameStatistics$();
  }

  setGameStatistics(gameStatistics: IGameStatistic[]): void {
    return this.gameState.setGameStatistics(gameStatistics);
  }

  // Game
  createGame(): void {
    this.homeApi.createNewGame().subscribe(gameId => {
      this.router.navigate(['game', gameId]);
    });
  }

  // Loading
  setLoading(loading: boolean): void {
    this.appState.setLoading(loading);
  }

  // Sonstiges
  logout(): void {
    this.tokenStorageService.clearToken();
    this.router.navigate(['login']);
  }
}
