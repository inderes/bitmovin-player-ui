import {ListBox} from './listbox';
import {UIInstanceManager} from '../uimanager';
import {SubtitleSwitchHandler} from '../subtitleutils';

/**
 * A element that is similar to a select box where the user can select a subtitle
 */
export class SubtitleListBox extends ListBox {

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    new SubtitleSwitchHandler(player, this);
  }
}
