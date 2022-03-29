import {Injectable} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Observable} from "rxjs";
import {IMessage} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketApi {
  private _gameId: string | undefined;

  get gameId(): string | undefined {
    return this._gameId;
  }

  set gameId(value: string | undefined) {
    this._gameId = value;
  }

  constructor(private rxStompService: RxStompService) {}

  sendMessage(body: any): void {
    this.rxStompService.publish({
      destination: '/app/game/' + this._gameId,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(body)
    });
  }

  getGame$(): Observable<IMessage> {
    return this.rxStompService.watch('/updates/' + this.gameId)
  }

  getUser$(): Observable<IMessage> {
    return this.rxStompService.watch('/updates/' + this.gameId + '/user/' + localStorage.getItem('username'))
  }
}
