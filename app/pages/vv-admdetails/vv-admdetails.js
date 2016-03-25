import {Page, IonicApp, Alert, NavController, NavParams} from 'ionic-angular';
import {VvServices} from '../../providers/vv-services/vv-services';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
/*
  Generated class for the VvAdmdetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-admdetails/vv-admdetails.html',
  directives: [LoadingModal],
  providers: [VvServices]
})
export class VvAdmdetailsPage {
    static get parameters() {
        return [[NavController], [IonicApp], [NavParams], [VvServices]];
    }

    constructor(nav, app, navparams, vvservices) {
        this.nav = nav;
        this.app = app;
        this.loading = this.app.getComponent('loading');
        this.navparams = navparams;
        this.vvsrv = vvservices;
        this.usrmail = "";
        this.usrprenom = "";
        this.usrnom = "";
        this.initPage();

    }

    initPage() {
        this.uuid = this.navparams.get('uuid');
        this.loading.show();
        this.vvsrv.getInfMobUser(this.uuid).subscribe((datas) => {
            this.loading.hide();
            this.usrnom = datas[0].nom;
            this.usrprenom = datas[0].prenom;
            this.usremail = datas[0].email;
            this.etat = datas[0].etat;
        }, (err) => {
            this.loading.hide();
            let msgInfo = Alert.create({
                title: "!!! ERREUR !!!",
                message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
                buttons: ['Merci'],
            });
            this.nav.present(msgInfo);
        })
    }
    
    doSetSec() {
        this.loading.show();
        this.vvsrv.setMobUserId(this.uuid,"ETAT",this.etat).subscribe((result) => {
          this.loading.hide();
          console.log("Mise à jour"+result.toString());
      }, (err) => {
         this.loading.hide();
          console.log("erreur"+err);
      })
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
  
  
}
