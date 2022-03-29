import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {PlayerComponent} from './game/components/player/player.component';
import {MessageComponent} from './game/components/message/message.component';
import {GameComponent} from './game/game.component';
import {CanvasComponent} from './game/components/canvas/canvas.component';
import {PlayerListComponent} from './game/containers/player-list/player-list.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {authInterceptorProviders} from "./shared/helpers/auth.interceptor";
import {HttpClientModule} from "@angular/common/http";
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from './my-rx-stomp.config';
import {LobbyComponent} from './game/components/lobby/lobby.component';
import {MessageListComponent} from './game/containers/message-list/message-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GameEndedRankingComponent} from './game/components/game-ended-ranking/game-ended-ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayerComponent,
    MessageComponent,
    GameComponent,
    CanvasComponent,
    PlayerListComponent,
    RegisterComponent,
    HomeComponent,
    LobbyComponent,
    MessageListComponent,
    GameEndedRankingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
