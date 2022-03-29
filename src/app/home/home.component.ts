import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {HomeFacade} from "../shared/services/home.facade";
import {IGameStatistic} from "../shared/types/game-statistic.interface";
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {IPlayer} from "../shared/types/player.interface";
import {IAvatar} from "../shared/types/avatar.interface";
import {Router} from "@angular/router";
import {TokenStorageService} from "../shared/services/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  form = new FormGroup({
    gameId: new FormControl('')
  });

  avatars$: Observable<IAvatar[]>;
  currentUser$: Observable<IPlayer | undefined>;
  gameStatistics$: Observable<IGameStatistic[] | undefined>;

  constructor(private homeFacade: HomeFacade, private router: Router, private tokenStorageService: TokenStorageService) {
    this.avatars$ = this.homeFacade.getAvatars$();
    this.currentUser$ = this.homeFacade.getCurrentUser$();
    this.gameStatistics$ = this.homeFacade.getGameStatistics$();
  }

  get gameId(): AbstractControl | null {
    return this.form.get('gameId');
  }

  ngOnInit(): void {
    if (!this.tokenStorageService.isLoggedIn()) {
      this.router.navigate(['login'])
    }
    this.getHomeData()
  }

  onSubmit(): void {
    if (this.gameId?.value) {
      this.homeFacade.setLoading(true);
      this.router.navigate(['game', this.gameId.value]);
    }
  }

  logout(): void {
    this.homeFacade.logout();
  }

  createNewGame(): void {
    this.homeFacade.setLoading(true);
    this.homeFacade.createGame();
  }

  getHomeData(): void {
    this.homeFacade.getHomeData();
  }
}
