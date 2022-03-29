import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IGameStatistic} from "../types/game-statistic.interface";
import {IPlayer} from "../types/player.interface";

@Injectable({
  providedIn: 'root'
})
export class HomeApi {
  constructor(private http: HttpClient) {
  }

  createNewGame(): Observable<string> {
    return this.http.post('https://p-frei.de/backend/game', null, {responseType: 'text'});
  }

  getAllAvatars(): Observable<any> {
    return this.http.get<any>('https://p-frei.de/avatar');
  }

  getCurrentUserDetails(): Observable<IPlayer> {
    return this.http.get<IPlayer>('https://p-frei.de/backend/user/details');
  }

  getGameStatistics(): Observable<IGameStatistic[]> {
    return this.http.get<IGameStatistic[]>('https://p-frei.de/gameStatistic');
  }
}
