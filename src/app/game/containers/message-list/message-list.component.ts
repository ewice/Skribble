import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {GameFacade} from "../../../shared/services/game.facade";
import {IChat} from "../../../shared/types/chat.interface";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  messages$: Observable<IChat[]> | undefined;

  faChevronRight = faChevronRight;
  form = new FormGroup({
    guess: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  constructor(private gameFacade: GameFacade) {
    this.messages$ = this.gameFacade.getMessages$();
  }

  onSubmit(event?: Event): void {
    this.gameFacade.submitChatMessage(this.form.get('guess'), event);
  }
}
