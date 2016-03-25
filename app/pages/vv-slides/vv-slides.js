import {Page, IonicApp, NavController} from 'ionic-angular';

/*
  Generated class for the VvSlidesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/vv-slides/vv-slides.html',
})
export class VvSlidesPage {
  static get parameters() {
    return [[NavController],[IonicApp]];
  }

  constructor(nav,app) {
    this.nav = nav;
    this.app = app;
    this.slides = [
      {
        title: "DISTRIBUTION TRADITIONELLE",
        description: "Affilié au groupe de Distribution Casino France depuis 1997, nous développons les formats hypermarché et supermarché sous les enseignes Géant Casino et Casino en Martinique, Guadeloupe et Guyane.",
        image: "build/pages/vv-slides/img/arton8.jpg",
      },
      {
        title: "HARD DISCOUNT",
        description: "Sous une enseigne locale, Ecomax, développe via un réseau de proximité, une offre courte et volontairement qualitative répondant aux besoins alimentaires quotidiens des familles sur les 3 départements Martinique, Guadeloupe et Guyane.",
        image: "build/pages/vv-slides/img/arton9.jpg",
      },
      {
        title: "NÉGOCE ALIMENTAIRE",
        description: "Dédiant une partie de nos plateformes logistiques à l’activité de négoce alimentaire, nous servons aussi bien la petite distribution que la restauration en Martinique et en Guyane.",
        image: "build/pages/vv-slides/img/arton10.jpg",
      }
    ];
  }
}
