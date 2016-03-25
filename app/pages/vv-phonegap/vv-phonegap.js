import {Page, IonicApp, Alert, NavController} from 'ionic-angular';
import {VvServices} from '../../providers/vv-services/vv-services';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
/*
  Generated class for the VvPhonegapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-phonegap/vv-phonegap.html',
  directives: [LoadingModal],
  providers: [VvServices]
})
export class VvPhonegapPage {
  static get parameters() {
    return [[NavController],[VvServices],[IonicApp]];
  }

  constructor(nav,vvservices,app) {
    this.nav = nav;
    this.app = app;
    this.loading = this.app.getComponent('loading');
    this.vvsrv = vvservices;
    this.pgpath = "https://build.phonegap.com";
    this.token = "kKeKAxVug4C2ggQ9PzKB";
    this.pgapps = null;
    this.pgemail = null;
    this.pgid = null;
    
  }
  
  onPageLoaded() {
      //this.getCode();
      this.pgAuth();
  }
  
  getCode() {
      this.vvsrv.reqPhoneGapCode().subscribe( (datas) => {
          this.pgcode = datas;
          console.log("Code : "+datas)
          this.getToken();
      },(err) => {
          let errMsg = Alert.create({
              title: '!!! ERREUR !!!',
              message: 'API PhoneGap Build Inaccessible'+err,
              buttons: ['Dommage']
          })
          this.nav.present(errMsg)
      })
  }
  
  getToken() {
     this.vvsrv.reqPhoneGapToken("d@nZel77").subscribe( (datas) => {
          this.token = datas;
          console.log("Token : "+datas)
          //this.getToken();
      },(err) => {
          let errMsg = Alert.create({
              title: '!!! ERREUR !!!',
              message: 'API PhoneGap Build Inaccessible'+err,
              buttons: ['Dommage']
          })
          this.nav.present(errMsg)
      }) 
  }
  
  pgAuth() {
      this.loading.show();
      this.vvsrv.getPhoneGapInfos(this.token).subscribe( (datas) => {
          this.loading.hide();
          this.pgemail = datas.email;
          this.pgid = datas.id;
          this.getApps();
      },(err) => {
          this.loading.hide();
          let errMsg = Alert.create({
              title: '!!! ERREUR !!!',
              message: 'API PhoneGap Build Inaccessible',
              buttons: ['Dommage']
          })
          this.nav.present(errMsg)
      })
  }
  
  getApps() {
      this.loading.show();
      this.vvsrv.getPhoneGapApps(this.token).subscribe( (datas) => {
          this.loading.hide();
          
          this.pgapps = datas.apps;
         
          //this.pgemail = datas.email;
          this.pgid = datas.id;
          
      },(err) => {
          this.loading.hide();
          let errMsg = Alert.create({
              title: '!!! ERREUR !!!',
              message: 'API PhoneGap Build Inaccessible :'+err,
              buttons: ['Dommage']
          })
          this.nav.present(errMsg)
      })
  }
  
  downLoad(tourl) {
      window.location.href=tourl;
  }
  
  
}
