import {Page,  Alert, IonicApp, Events, NavController} from 'ionic-angular';
import {VvServices} from '../../providers/vv-services/vv-services';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
/*
  Generated class for the VvOs400Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-os-400/vv-os-400.html',
  directives: [LoadingModal],
  providers:[VvServices]
})
export class VvOs400Page {
  static get parameters() {
    return [[IonicApp],[NavController],[VvServices]];
  }

  constructor(app,nav,vvservices) {
    this.nav = nav;
    this.app = app;
    this.vvsrv = vvservices;
    this.loading = this.app.getComponent('loading');
    this.showDev = true;
    this.showPrint = false;
    this.items = [];
  }
  
  doDblqUsr() {
      this.vvsrv.debloqUser(this.devusr).subscribe( (datas) => {
           let msgInfo = Alert.create({ 
            title:"information",
            message: (datas.toString()=="true")?"Utilisateur débloquer":"Echec du déblocage",
           buttons: ['Terminer'],
          });
          this.nav.present(msgInfo);
      }, (err) => {
           let msgInfo = Alert.create({ 
            title:"!!! ERREUR !!!",
            message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
           buttons: ['Merci'],
          });
          this.nav.present(msgInfo);
      })
  }
  
  doDblqDev() {
     this.vvsrv.debloqDevice(this.devusr).subscribe( (datas) => {
           let msgInfo = Alert.create({ 
            title:"information",
            message: (datas.toString()=="true")?"Ecran/terminal débloquer":"Echec du déblocage",
           buttons: ['Terminer'],
          });
          this.nav.present(msgInfo);
      }, (err) => {
           let msgInfo = Alert.create({ 
            title:"!!! ERREUR !!!",
            message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
           buttons: ['Merci'],
          });
          this.nav.present(msgInfo);
      }) 
  }
  
  doShowPrinter() {
      /*let msgInfo = Alert.create({ 
            title:"!!! ATTENTION !!!",
            message: "Disponible dans la prochaine version!",
           buttons: ['Merci'],
          });
          this.nav.present(msgInfo);
          */
          this.showDev = false;
          this.showPrint = true;
          
  }
  
  doLstPrinter() {
      this.loading.show();
      this.vvsrv.getPrinters(this.prtname).subscribe((datas) => {
          this.loading.hide();
          this.items = datas;
          
      }, (err) => {
           let msgInfo = Alert.create({ 
            title:"!!! ERREUR !!!",
            message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
           buttons: ['Merci'],
          });
          this.nav.present(msgInfo);
      })
  }
  
  
  
}
