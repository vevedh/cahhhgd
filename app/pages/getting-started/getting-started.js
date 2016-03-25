import {Page, Platform, Storage, SqlStorage, Alert, NavController, NavParams} from 'ionic-angular';
import {Geolocation, Device} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})
export class GettingStartedPage {
    static get parameters() {
        return [[NavController], [NavParams], [Platform]];
    }
    constructor(nav, navparams, platform){
        this.nav = nav;
        this.platform = platform;
        this.storage = new Storage(SqlStorage);
        this.initializePage();
        
        
    }
    
    initializePage() {
        this.platform.ready().then(() => {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
            Geolocation.getCurrentPosition().then(pos => {
                console.log('lat: ' + pos.coords.latitude + ', long: ' + pos.coords.longitude);
                this.vvlat = pos.coords.latitude;
                this.vvlong = pos.coords.longitude;
            });
            
            console.log(window.IonicNative);

            this.udid = Device.device.uuid;
            
            this.storage.set('uuid',this.udid);
            //+"|"+this.getKeys(Device).join(';');
        });
    }
  
  
    getStorage(){
        this.storage.get('uuid').then( (result) => {
            let msgWin = Alert.create({
                title: 'Information',
                message: 'uuid = '+result,
                buttons: [
                    'OK'
                ]
            });
            this.nav.present(msgWin);
        })
    }
  
  
  
    getKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }
    
    
    
}
