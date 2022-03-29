import {Component, Input} from '@angular/core';
import {IPlayer} from '../../../shared/types/player.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() player: IPlayer | undefined;

  constructor() {}
}
