import {Page,IonicApp, NavController, Alert ,NavParams} from 'ionic-angular';
import {VvServices} from '../../providers/vv-services/vv-services';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
/*
  Generated class for the VvCamagasinsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

var today = new Date();

var jour = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate();
var mois = ((today.getMonth() + 1) < 10) ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
var annee = today.getFullYear();

var heures = (today.getHours() < 10) ? "0" + today.getHours() : today.getHours();
var minutes = (today.getMinutes() < 10) ? "0" + today.getMinutes() : today.getMinutes();
var secondes = (today.getSeconds() < 10) ? "0" + today.getSeconds() : today.getSeconds();

var cdate = annee + mois + jour;
var ctime = heures + ":" + minutes + ":" + secondes;

 

@Page({
  templateUrl: 'build/pages/vv-camagasins/vv-camagasins.html',
  directives: [LoadingModal],
  providers: [VvServices]
})
export class VvCamagasinsPage {
  
    
  static get parameters() {
    return [[IonicApp],[NavController],[VvServices]];
  }

  constructor(app,nav,vvservices) {
    this.app = app;
    this.nav = nav;
    this.loading = this.app.getComponent('loading');
    this.magasins = null;
    this.enseigne = null;
    this.annee = annee;
    this.mois = mois;
    this.jour = jour;
    this.vvs = vvservices;
    this.lesannees = new Array(5)
    .join().split(',')
    .map(function(item, index){ return ++index+2011;});
    this.lesmois = ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"];
    this.lesjours = new Array(31)
    .join().split(',')
    .map(function(item, index){ return ++index;});
    
    // initdate
    this.selannee= annee;
    this.selmois = Number(mois);
    this.seljour = jour;
  }
  
  doShowProgress() {
     this.loading.show();
    
  }
  
  doHideProgress() {
     this.loading.hide();      
  }
  
  
  doSelect(event){
      console.log(this.enseigne);
      this.showCA();
  }
  
  showCA() {
      if (this.enseigne === undefined) {
          let msgEns = Alert.create({
              title: "Attention!",
              message: "Veuillez renseigner l'\enseigne!",
              buttons: ["Ok"]
          });
          this.nav.present(msgEns);
      } else {
          console.log("Date sélectionnée : " + this.selannee + ":" + this.selmois + ":" + this.seljour);
          console.log("Enseigne :" + this.enseigne);
          this.doShowProgress();
          this.vvs.mob_getCaJour(this.enseigne, Number(this.selannee).toString(), "0"+Number(this.selmois).toString(), Number(this.seljour).toString()).subscribe(data => {
              this.doHideProgress();
              console.log("Resultat:" + data);
              if (data != undefined) {
                  this.magasins = data;
                  this.nbmag = data.length;
                  this.totalca = 0;
                  for (var index = 0; index < this.magasins.length; index++) {
                      this.totalca = this.totalca + Number(this.magasins[index].camag);
                      
                  }
                  
                  
              }
          }, err => {
              this.doHideProgress();
              console.log("Erreur :" + err.message + "|Chiffres impossible à récupérer!");
              
          }, () => {
              this.doHideProgress();
              console.log("Appel Get CA réussi");
          });
          
          
      }
  }
  
  
}
