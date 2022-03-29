import {Component, Input} from '@angular/core';
import {IChat} from "../../../shared/types/chat.interface";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message: IChat | undefined;

  constructor() {}
}
