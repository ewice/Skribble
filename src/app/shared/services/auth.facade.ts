import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthApi} from "../api/auth.api";
import {HomeApi} from "../api/home.api";
import {AppState} from "../state/app.state";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private appState: AppState,
    private authApi: AuthApi,
    private homeApi: HomeApi,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  // Loading
  setLoading(loading: boolean): void {
    this.appState.setLoading(loading);
  }

  // Login
  login(username: string, password: string): void {
    this.setLoading(true);
    this.authApi.login(username, password).subscribe({
      next: (response) => {
        this.tokenStorageService.saveToken(response, username);
        this.router.navigate(['home']);
      },
      error: (_) => {
        this.setLoading(false);
      },
    });
  }

  // Register
  register(username: string, password: string): void {
    this.setLoading(true);
    this.authApi.register(username, password).subscribe({
      next: (_) => {
        this.router.navigate(['login']);
        this.setLoading(false);
      },
      error: (_) => {
        this.setLoading(false);
      },
    });
  }
}
