import {DOM} from "./dom";
import jquery = require("jquery");
DOM.setJQuery(jquery); // TODO find a way around this hacky setup
import {UIManager} from "./uimanager";
import {Wrapper} from "./components/wrapper";
import {ControlBar} from "./components/controlbar";
import {PlaybackToggleButton} from "./components/playbacktogglebutton";
import {FullscreenToggleButton} from "./components/fullscreentogglebutton";
import {VRToggleButton} from "./components/vrtogglebutton";
import {VolumeToggleButton} from "./components/volumetogglebutton";
import {SeekBar} from "./components/seekbar";

// Build UI
var playbackToggleButton = new PlaybackToggleButton();
var fullscreenToggleButton = new FullscreenToggleButton();
var vrToggleButton = new VRToggleButton();
var volumeToggleButton = new VolumeToggleButton();
var seekBar = new SeekBar();
var controlBar = new ControlBar({components: [playbackToggleButton, fullscreenToggleButton, vrToggleButton, volumeToggleButton, seekBar]});
var ui = new Wrapper({ components: [controlBar]});
console.log(ui);

declare var window: any;
declare var bitmovin: any;
var player = window.bitmovin.player('player');

var conf = {
    key: 'YOUR KEY HERE',
    source: {
        dash: 'http://bitdash-a.akamaihd.net/content/sintel/sintel.mpd'
    },
    style: {
        ux: false
    }
};

player.setup(conf).then(function() {
    // Add UI to loaded player
    new UIManager(player, ui);
}, function() {
    // Error
});
