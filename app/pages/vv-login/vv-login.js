import {Page, IonicApp, Platform, Storage, SqlStorage, Alert, NavController, NavParams} from 'ionic-angular';
import {VvCamagasinsPage} from '../../pages/vv-camagasins/vv-camagasins';
import {VvSlidesPage} from '../../pages/vv-slides/vv-slides';
import {VvServices} from '../../providers/vv-services/vv-services';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
import {safeJSONStringify} from '../../util';
/*
  Generated class for the VvLoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/



@Page({
  templateUrl: 'build/pages/vv-login/vv-login.html',
  directives: [LoadingModal],
  providers: [VvServices]
})
export class VvLoginPage {
    
    
    
  static get parameters() {
    return [[IonicApp],[NavController],[NavParams],[Platform],[VvServices]];
  }

  constructor(app,nav, navparams, platform, vvservices) {
      this.app = app;
      this.nav = nav;
      this.loading = this.app.getComponent('loading');
      this.platform = platform;
      this.vvsrv = vvservices;
      this.uuid = null;
      this.storage = new Storage(SqlStorage);
      this.isNotOk = true;
      this.regMode = false;
      this.initPageLogin();
      //console.log(safeJSONStringify(this.app.pages));
      
  }
  
  showProgress(){
      this.loading.show();
  }
  
  hideProgress(){
      this.loading.hide();   
  }
  
  
  initPageLogin(){
      this.platform.ready().then(() => {
          
          // Vérification existance ionic-uuid
          this.storage.get('ionic-uuid').then((valuuid) => {
              this.isNotOk = false;
              if ((valuuid === undefined) || (valuuid == null)) {
                  this.shMsg = Alert.create({
                      title: 'Première utilisation',
                      message: 'Bienvenue, processus d\'identification...',
                      enableBackdropDismiss: false,
                      buttons: [{
                            text: 'Continuer',
                            role: 'ok',
                            handler: () => {
                              this.firstConnect=true;
                          }
                      }]
                  });
                  this.nav.present(this.shMsg);
              } else {
                  // l'application à déjà été exécutée
                  // information uuid
                  this.uuid = valuuid;
                  this.firstConnect=false;
                  // verification de l'uuid en base
                  this.verifications();    
              }
          }); 
           
      });
  }
  
  verifications(){
      //verification en base de ionic-uuid
      this.showProgress();
      this.vvsrv.getAllowCA().subscribe( (datas) => {
          this.hideProgress();
          // cherche une correspondance de uuid en base table vvbas/vvmobca
          for (var i = 0; i < datas.length; i++) {
              //console.log("Resultats : "+datas[i].guid);
              if (this.uuid == datas[i].guid) {
                  this.hasAuuid = true;
                  this.app.uuid = this.uuid;
                  break;
              }
          }
          
          if ((this.hasAuuid) && (datas[i].etat == 'ACTIF')) {
              // il y a une correspondance et son etat est ACTIF
              // aller ou activer le menu des chiffre d'affaires
              this.app.usermode = 'ca';
              // la page de demarrage deviens la page des Chiffres d'affaires magasins
              this.nav.setRoot(VvCamagasinsPage);
          } else if ((this.hasAuuid) && (datas[i].etat == 'INACTIF')) {
              // il y a une correspondance et son etat est INACTIF
              // aller à la page presentation succinte du groupe HHHGD
              this.app.usermode = 'invite';
              this.nav.setRoot(VvSlidesPage);
          } else if ((this.hasAuuid) && (datas[i].etat == 'ADMIN')) {
              // il y a une correspondance et son etat est ADMIN
              // autoriser ca et maintenance magasins
              this.app.usermode = 'admin';
              this.nav.setRoot(VvSlidesPage);
              // aller à la page de dépannage
          } else if ((this.hasAuuid) && (datas[i].etat == 'SECOFF')) {
              // il y a une correspondance et son etat est ADMIN
              // autoriser ca et maintenance magasins
              this.app.usermode = 'secoff';
              this.nav.setRoot(VvSlidesPage);
              // aller à la page de dépannage
          } else {
              // aller à la page profile 
              // avec paramettre noregister
              // this.nav.push(vv-profile,{'noregister':true});
              this.app.usermode = 'none';
              this.regMode = true;
              //faire apparaitre le bouton d'enregistrement
              this.nav.setRoot(VvSlidesPage);
          }
          //console.log("Mode utilisateur :"+this.app.usermode);*/
      }, (err) => {
          this.hideProgress();
          let msgInfo = Alert.create({
              title:"!!! ERREUR !!!",
              message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
              buttons: ['Merci']
          });
          this.nav.present(msgInfo);
      });
  }
  
  
  doGenUuid(){
       this.uuid = this.generateGuid();
       this.storage.set('ionic-uuid',this.uuid).then( (succesId) => {
           
          let shMsg = Alert.create({
                  title: 'Information à retenir',
                  message: 'GUID : '+this.uuid,
                  buttons: [{
                      text: 'continuer',
                      handler: () => {
                         // apres generation d'un GUID
                         // stocker cette information en base de donnée AS400
                          this.doRegisterUser();
                      }
                  }]
              });
         this.nav.present(shMsg);
      });
  }
  
  
  doRegisterUser(){
      //Stock l'info du GUID dans la base AS400
      this.showProgress();
      this.vvsrv.regDeviceId(this.uuid).subscribe( (data) => {
         this.hideProgress();
         let shMsg = Alert.create({
                  title: 'Information Enregistrement',
                  message: 'Enregistrement reussi !',
                  buttons: [{
                      text: 'Merci',
                      handler: () => {
                          this.hasAuuid = true;
                          this.app.uuid = this.uuid;
                          this.firstConnect=false;
                          this.verifications();
                      }
                  }]
              });
         this.nav.present(shMsg); 
      });
     
      
  }
  
  
  
  
  // generation d'un GUID
  generateGuid() {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    let radix = chars.length;
      // rfc4122, version 4 form
      let r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    return uuid.join('');
  }
  
  
  getKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }
    
    
    
}
