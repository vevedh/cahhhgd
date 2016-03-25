import {Page, IonicApp, Alert, NavController} from 'ionic-angular';
import {VvAdmusersPage} from '../../pages/vv-admusers/vv-admusers';
import {VvServices} from '../../providers/vv-services/vv-services';
import {LoadingModal} from '../../components/loading-modal/loading-modal';

/*
  Generated class for the VvProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-profile/vv-profile.html',
  directives: [LoadingModal],
  providers: [VvServices]
})
export class VvProfilePage {
  static get parameters() {
    return [[NavController],[IonicApp],[VvServices]];
  }

  constructor(nav,app,vvservices) {
    this.nav = nav;
    this.app = app;
    this.loading = this.app.getComponent('loading');
    this.vvsrv = vvservices;
    this.uuid = this.app.uuid;
    this.usrnom="";
    this.usrprenom="";
    this.usremail="";
    this.getInfosUser();
  }
  
  
  getInfosUser() {
      this.canGetInfos = true;
      if ( (this.uuid == "") ) {
          this.canGetInfos = false;
      }
      if  (this.uuid === undefined) {
          this.canGetInfos = false;
      }
      if ( this.canGetInfos ) {
            this.loading.show();
            this.vvsrv.getInfMobUser(this.uuid).subscribe((datas) => {
                this.loading.hide();
                this.usrnom = datas[0].nom;
                this.usrprenom = datas[0].prenom;
                this.usremail = datas[0].email;
            }, (err) => {
                this.loading.hide();
                 let msgInfo = Alert.create({ 
                  title:"!!! ERREUR !!!",
                  message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
                 buttons: ['Merci'],
                });
                this.nav.present(msgInfo);
            })
      }
      
  }
  
  
  doMemUser() {
      console.log("Resultat"+this.uuid+this.usrnom+this.usrprenom+this.usremail);
      this.loading.show();
            this.vvsrv.setInfMobUser(this.uuid,this.usrnom,this.usrprenom,this.usremail).subscribe((datas) => {
                this.loading.hide();
                console.log("Resultat"+datas);
                if (datas.toString()=="true") {
                     let msgInfo = Alert.create({ 
                      title:"Information",
                      message: "Infos mémorisées avec succès!",
                     buttons: ['Merci'],
                    });
                    this.nav.present(msgInfo);
                }
            }, (err) => {
                this.loading.hide();
                 let msgInfo = Alert.create({ 
                  title:"!!! ERREUR !!!",
                  message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
                 buttons: ['Merci'],
                });
                this.nav.present(msgInfo);
            })
  }
  
  goToAdmUsers() {
      this.nav.swipeBackEnabled = false;
      this.nav.setRoot(VvAdmusersPage);
      
  }
  /*doMemUser() {
      let shInf = Alert.create({
          title:'!! ATTENTION !!!',
          message: 'Pas encore disponible dans cette version',
          buttons:['Merci']
      })
      this.nav.present(shInf);
  }*/
}
