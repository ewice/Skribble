import {IAvatar} from "./avatar.interface";

export interface IPlayer {
  avatar: IAvatar;
  host: boolean;
  username: string;
  rank?: number;
  score?: number;
}
