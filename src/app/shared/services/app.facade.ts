import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppState} from "../state/app.state";

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(private appState: AppState) {
  }

  // Loading
  isLoading$(): Observable<boolean> {
    return this.appState.isLoading$();
  }
}
