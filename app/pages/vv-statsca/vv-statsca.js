import {Page, IonicApp, Alert, NavController} from 'ionic-angular';
import {VvServices} from '../../providers/vv-services/vv-services';
import {Vvcharts} from '../../components/vvcharts/vvcharts';
import {LoadingModal} from '../../components/loading-modal/loading-modal';
/*
  Generated class for the VvStatscaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-statsca/vv-statsca.html',
  providers: [VvServices],
  directives: [Vvcharts,LoadingModal]
})
export class VvStatscaPage {
  static get parameters() {
    return [[NavController],[IonicApp],[VvServices]];
  }

  constructor(nav,app,vvservices) {
    this.nav = nav;
    this.app = app;
    this.srv = vvservices;
    //this.doEnsGraph('GEANT');
     this.options = {
            title: { text: "Enseigne" },
            series: []
           };
  }
  
  doSelect() {
      this.doEnsGraph(this.enseigne);
  }
  
  doEnsGraph(ensnom) {
     
      this.options = undefined;     
      this.srv.mob_getCaEvoMois(ensnom).subscribe((datas) => {
          this.options = {
            title: { text: ensnom },
            series: []
           };
           

          console.log("Les données :" + JSON.stringify(datas));

          console.log(datas);
          console.log(datas[1].caevo);
          console.log(eval(datas[1].caevo));
          var lstmois = ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"];
          //var lstmois=[Date.UTC(2015,1,1), Date.UTC(2015,2,1), Date.UTC(2015,3,1), Date.UTC(2015,4,1),Date.UTC(2015,5,1), Date.UTC(2015,6,1), Date.UTC(2015,7,1), Date.UTC(2015,8,1), Date.UTC(2015,9,1), Date.UTC(2015,10,1), Date.UTC(2015,11,1), Date.UTC(2015,12,1)];
          var series = [];

          for (var i = 0; i < Object.keys(datas).length; i++) {
              var rcaevo = [];
              var caevo = eval(datas[i].caevo);
              for (var j = 0; j < caevo.length; j++) {
                  rcaevo[j] = [lstmois[j], caevo[j]];
              }

              this.options.series.push({
                  name: 'Chiffres ' + datas[i].nommag,
                  data: rcaevo
              });

          }

          var sumevo = [];

          var caevo = eval(datas[0].caevo);
          for (var j = 0; j < caevo.length; j++) {
              var tot = 0;
              for (var i = 0; i < Object.keys(datas).length; i++) {
                  var caevo = eval(datas[i].caevo);
                  tot = tot + parseFloat(caevo[j]);

              }
              sumevo[j] = [lstmois[j], tot];
          }

          this.options.series.push({
              name: 'Chiffre TOTAL',
              data: sumevo
          });

     
          
         
      }, (err) => { 
             let msgInfo = Alert.create({ 
              title:"!!! ERREUR !!!",
              message: "Erreur de communication avec le backoffice! Contater l\'administrateur!",
              buttons: ['Merci']
            });
            this.nav.present(msgInfo);
      })
  }
}
