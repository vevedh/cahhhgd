import {Component,Input,Output, Attribute} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {CHART_DIRECTIVES, Highcharts} from 'angular2-highcharts';
import {VvServices} from '../../providers/vv-services/vv-services';
/*
  Generated class for the Vvcharts component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'vvcharts',
  templateUrl: 'build/components/vvcharts/vvcharts.html',
  inputs: ['text','options'],
  providers:[VvServices],
  directives: [IONIC_DIRECTIVES,CHART_DIRECTIVES],
  styles: [`
      chart {
        display: block;
      }
    `] // makes all Ionic directives available to your component //  
})





export class Vvcharts {
    
     
    
     
    
    
    /*static get parameters() {
        return [[VvServices]];
    }*/
    
    constructor() {
        
        this.text = "toto";
        
        this.options = {
            title: { text: 'simple chart' },
            series: [{
                data: [0.9, 0.5, 0.4, 129.2],
            }]
        }; 
        
    }
    
    
    
    
    
    
    
}
