import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {IPlayer} from "../types/player.interface";
import {IAvatar} from "../types/avatar.interface";

@Injectable({
  providedIn: 'root',
})
export class HomeState {
  private currentUser$ = new BehaviorSubject<IPlayer | undefined>(undefined);
  private avatars$ = new BehaviorSubject<IAvatar[]>([]);

  getCurrentUser$(): Observable<IPlayer | undefined> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser(currentUser: IPlayer | undefined): void {
    this.currentUser$.next(currentUser);
  }

  getAvatars$(): Observable<IAvatar[]> {
    return this.avatars$.asObservable();
  }

  setAvatars(avatars: IAvatar[]): void {
    this.avatars$.next(avatars);
  }
}
