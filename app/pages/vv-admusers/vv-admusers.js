import {Page, IonicApp, Alert, NavController, NavParams} from 'ionic-angular';
import {VvServices} from '../../providers/vv-services/vv-services';
import {VvAdmdetailsPage} from '../../pages/vv-admdetails/vv-admdetails';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
/*
  Generated class for the VvAdmusersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-admusers/vv-admusers.html',
  directives: [LoadingModal],
  providers: [VvServices]
})
export class VvAdmusersPage {
  static get parameters() {
    return [[IonicApp],[NavController],[VvServices]];
  }

  constructor(app,nav,vvservices) {
    this.nav = nav;
    this.app = app;
    this.loading = this.app.getComponent('loading');
    this.vvsrv = vvservices;
    this.users = null;
    this.nav.swipeBackEnabled = false;
    this.admDetailvue = VvAdmdetailsPage;
    
  }
  
  
  changeState(userid,etat) {
      console.log("Merde herve "+userid+":"+etat);
      var setEtat="";
      if (etat.toString()=="true") {
          setEtat = "ACTIF";
      } else {
          setEtat = "INACTIF";
      }
      console.log("Etat a mettre en :"+setEtat);
      this.showWait()
      this.vvsrv.setMobUserId(userid,"ETAT",setEtat).subscribe((result) => {
          this.hideWait();
          console.log("Mise à jour"+result.toString());
      }, (err) => {
          this.hideWait();
          console.log("erreur"+err);
      })
      
  }
  
  showWait() {
      this.loading.show();
  }
  
  hideWait() {
      this.loading.hide();
  }
  
  onPageLoaded(){
      this.initPage();
  }
  
  
  goDetail(id) {
      this.nav.push(VvAdmdetailsPage,{uuid: id});
  }
  
  
  initPage(){
     this.showWait();
      this.vvsrv.getAllowCA().subscribe( (datas) => {
          this.hideWait();

          this.users = datas;
          
      },(err) => {
          this.hideWait();

          let msgInfo = Alert.create({
              title:"!!! ERREUR !!!",
              message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
              buttons: ['Merci']
          });
          this.nav.present(msgInfo);
      });
  }
}
