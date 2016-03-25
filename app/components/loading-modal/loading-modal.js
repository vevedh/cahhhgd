import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

/*
  Generated class for the LoadingModal component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'loading-modal',
  templateUrl: 'build/components/loading-modal/loading-modal.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class LoadingModal {
  constructor() {
    //this.text = 'Hello World';
    this.isBusy = false;
  }
  
  show() {
      this.isBusy = true;
      
  }
  
  hide() {
      this.isBusy = false;
  }
}
