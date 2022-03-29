import {Component} from '@angular/core';
import {TokenStorageService} from './shared/services/token-storage.service';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AppFacade} from "./shared/services/app.facade";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$: Observable<boolean>;
  constructor(
    private appFacade: AppFacade,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    this.loading$ = this.appFacade.isLoading$();
  }

  ngOnInit(): void {
    if (this.tokenStorageService.isLoggedIn()) {
      this.router.navigate(['home'])
    }
  }
}
