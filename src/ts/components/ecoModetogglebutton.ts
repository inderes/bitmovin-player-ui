import { ToggleButton, ToggleButtonConfig } from './togglebutton';
import { UIInstanceManager } from '../uimanager';
import { DynamicAdaptationConfig, PlayerAPI, VideoQualityChangedEvent } from 'bitmovin-player';
import { i18n } from '../localization/i18n';



let adaptationConfig: DynamicAdaptationConfig;
export class EcoModeToggle extends ToggleButton<ToggleButtonConfig> {
  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    const defaultConfig: ToggleButtonConfig = {
      text: i18n.getLocalizer('ecoMode'),
      cssClass: 'ui-ecoModetogglebutton',
      onClass: 'on',
      offClass: 'off',
      ariaLabel: i18n.getLocalizer('ecoMode'),
    };

    this.config = this.mergeConfig(config, defaultConfig, this.config);
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    this.onClick.subscribe(() => {
      this.toggle();
    });

    this.onToggleOn.subscribe(() => {
        ecoModeOnConfig(player);
        player.setVideoQuality('auto')
      
    });

    this.onToggleOff.subscribe(() => {
      ecoModeOffConfig(player);
    })

    player.on(player.exports.PlayerEvent.VideoQualityChanged, (quality: VideoQualityChangedEvent) => {
      if (quality.targetQuality.height !== null) {
        this.off();
        ecoModeOffConfig(player);
      }
    });
  }
}

function ecoModeOnConfig(player: PlayerAPI) {
  adaptationConfig = player.adaptation.getConfig();

  if (player.getAvailableVideoQualities()[0].codec.includes('avc')) {
    player.adaptation.setConfig({
      resolution: { maxSelectableVideoHeight: 720 },
    } as DynamicAdaptationConfig);
  }
  if (
    player.getAvailableVideoQualities()[0].codec.includes('hvc') ||
    player.getAvailableVideoQualities()[0].codec.includes('hev')
  ) {
    player.adaptation.setConfig({
      resolution: { maxSelectableVideoHeight: 1080 },
    } as DynamicAdaptationConfig);
  }
  if (
    player.getAvailableVideoQualities()[0].codec.includes('av1') ||
    player.getAvailableVideoQualities()[0].codec.includes('av01')
  ) {
    player.adaptation.setConfig({
      resolution: { maxSelectableVideoHeight: 1440 },
    } as DynamicAdaptationConfig);
  }
}

function ecoModeOffConfig(player: PlayerAPI) {
  player.adaptation.setConfig(adaptationConfig);
}
