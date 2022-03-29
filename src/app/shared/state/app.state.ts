import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private loading$ = new BehaviorSubject<boolean>(false)

  isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }
}
