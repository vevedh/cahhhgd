import {Injectable, Inject, enableProdMode} from 'angular2/core';
enableProdMode();
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Platform, Events} from 'ionic-angular';
import {SERVICES_URL,SERVICES_URL_LOCAL} from '../config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
/*
  Generated class for the VvServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VvServices {
    
    static get parameters() {
        return [[Http],[Platform]];
    }

    constructor (http,platform) {
        this.http = http;
        this.platform = platform;
        this.servicesURL = SERVICES_URL;
        this.onDevice = this.platform.is('ios') || this.platform.is('android');
        //this.setLocaleCnx();
    }



    setLocaleCnx() {
        this.http.get("https://httpbin.org/ip")
        .subscribe(data => {
            console.log(data.json().origin);
            if (data.json().origin.indexOf('10.21')>0) {
                this.servicesURL = SERVICES_URL_LOCAL;
                console.log("Service url local ");
            } else {
                console.log("Service url public");
            }
        }, error => {
            this.servicesURL = SERVICES_URL;
            console.log("Error :Service url public : ");
        });
    }



    reqPhoneGapCode() {
        let callData = null;   
        let headers = null;
        //new Headers({'auth_token':'kKeKAxVug4C2ggQ9PzKB'}); 
        let options = new RequestOptions({ headers: headers });
        //?auth_token=kKeKAxVug4C2ggQ9PzKB
        return this.http.get('https://build.phonegap.com/cahhhgd/authorize?client_id=d93485f4ad1691492dc7', options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    reqPhoneGapToken(code) {
        let callData = null;
        let headers = null;
        let options = new RequestOptions({ headers: headers });
        return this.http.post('https://build.phonegap.com/cahhhgd/authorize?client_id=d93485f4ad1691492dc7&client_secret=49dc871a01fb428c9f98c58e76466901567d8e67&code='+code,callData, options)
            .map(res => res.json().data)
            .catch(this.handleError);
    }  
     
    getPhoneGapInfos(token){
        
        let callData = null;   
        let headers = null;
        //new Headers({'auth_token':'kKeKAxVug4C2ggQ9PzKB'}); 
        let options = null;
        //new RequestOptions({ headers: headers });
        //?auth_token=kKeKAxVug4C2ggQ9PzKB
        return this.http.get('https://build.phonegap.com/api/v1/me?auth_token='+token, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    getPhoneGapApps(token){
        
        let callData = null;   
        let headers = null;
        //new Headers({'auth_token':'kKeKAxVug4C2ggQ9PzKB'}); 
        let options = null;
        //new RequestOptions({ headers: headers });
        //?auth_token=kKeKAxVug4C2ggQ9PzKB
        return this.http.get('https://build.phonegap.com/api/v1/apps?auth_token='+token, options)
            .map(res => res.json())
            .catch(this.handleError);
    }


    ioApiTest() {
        /*var callData = JSON.stringify({
                'serviceName': 'auth',
                'methodName': 'test',
                'parameters': []
            });*/
        let callData = null;   
        let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmVjOTQzZi00Y2JlLTRmNjMtOTEwZS0xMzcyNGYwYTFhNzMifQ.68jUB_lU2V30DzrK7hOfOXcxeYagE98QY3hW2VyLGaE'}); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get('https://api.ionic.io/auth/test', options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    ioApiUserCreate(appid,email,pass) {
        let callData = JSON.stringify({
                'app_id': appid,
                'email': email,
                'password': pass
            });
          
        let headers = new Headers({ 

            'Content-Type': 'application/json'}); //,'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmVjOTQzZi00Y2JlLTRmNjMtOTEwZS0xMzcyNGYwYTFhNzMifQ.68jUB_lU2V30DzrK7hOfOXcxeYagE98QY3hW2VyLGaE'
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post('https://api.ionic.io/users',callData, options)
            .map(res => res.json().data)
            .catch(this.handleError);
    }
    
    ioApiUserAuth(appid,email,pass) {
        let callData = JSON.stringify({
                'app_id': appid,
                'email': email,
                'password': pass
            });
          
        let headers = new Headers({ 'Content-Type': 'application/json'}); //,'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmVjOTQzZi00Y2JlLTRmNjMtOTEwZS0xMzcyNGYwYTFhNzMifQ.68jUB_lU2V30DzrK7hOfOXcxeYagE98QY3hW2VyLGaE'
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post('https://api.ionic.io/auth/login',callData, options)
            .map(res => res.json().data)
            .catch(this.handleError);
    }
    
    
    ioApiGetUser(uuid) {
        /*var callData = JSON.stringify({
                'serviceName': 'auth',
                'methodName': 'test',
                'parameters': []
            });*/
        let callData = null;   
        let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmVjOTQzZi00Y2JlLTRmNjMtOTEwZS0xMzcyNGYwYTFhNzMifQ.68jUB_lU2V30DzrK7hOfOXcxeYagE98QY3hW2VyLGaE'}); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(' https://api.ionic.io/users/'+uuid, options)
            .map(res => res.json().data)
            .catch(this.handleError);
    }
    
    isOnline() {
        if(this.onDevice && navigator.connection){
    
        let networkState = navigator.connection.type;
    
        return networkState !== Connection.NONE;
    
        } else {
        return navigator.onLine;      
        }
    }
    
    isOffline(){
        if(this.onDevice && navigator.connection){
    
        let networkState = navigator.connection.type;
    
        return networkState === Connection.NONE;
    
        } else {
        return !navigator.onLine;     
        }
    }

    getFavorites() {
        return this.http.get(favoritesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    getPrinters(imp) {
        var impquery = '';
            if (String(imp).length >= 10 ) {
                impquery = String(imp).substr(0,9) + '*';
            } else {
                impquery = String(imp).replace('*','') + '*';
            }
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'lstOutqArr',
                'parameters': [impquery]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        console.log("Appel "+this.servicesURL);
        return this.http.post(this.servicesURL, callData, options)
            .map(res => JSON.parse(res._body))
            .catch(this.handleError);    
            
    }
    
    
    doMemDevice(uid,nom,prenom,dev,cdate,ctime) {
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'mob_connect',
                'parameters': [uid,nom,prenom,dev,cdate,ctime]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    mob_getInfos(guid) {
        
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'mob_getInfos',
                'parameters': [guid]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
            
    }
    
    mob_getCaJourSec(guid,ensnom,annee,mois,jour) {
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'ork_ca_sec',
                'parameters': [guid,ensnom,annee,mois,jour]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);    
        
    }
    
    mob_getCaJour(ensnom,annee,mois,jour) {
        let callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'ork_ca',
                'parameters': [ensnom,annee,mois,jour]
            });
            console.log(callData);
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        console.log(this.servicesURL);
        
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    mob_getCaEvoMois(ensnom) {
        
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'ork_ca_evo_mois',
                'parameters': [ensnom]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);   
            
    }
    
    doAutoEdtMsgw() {
        
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'autoEdtMsgw',
                'parameters': []
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);    
        
    }
    
    
    getIpImp(imp){
        let callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'getIpImp',
                'parameters': [imp]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            //.toPromise()
            //.then(res => res.json(), err => console.log("Attention : "+err));
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    debloqUser(user){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'debloqUser',
                'parameters': [user]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    dblqPrtEcomax(prtn){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'dblqPrtEcomax',
                'parameters': [prtn]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    debloqEcomax(){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'debloqEcomax',
                'parameters': []
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);    
    }
    
    debloqDevice(dev){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'debloqDevice',
                'parameters': [dev]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    chkIp(ipval){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'chkIp',
                'parameters': [ipval]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    testIp(ipvall){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'chkIp',
                'parameters': [ipvall]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    startEditeur(imp){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'startEditeur',
                'parameters': [imp]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);    
    }
    
    stopEditeur(imp){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'stopEditeur',
                'parameters': [imp]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    getAllowCA(){
      var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_AS400JSON',
                'parameters': ["select * from vvbase/vvmobca"]
            });
       let headers = new Headers({'Content-Type': 'application/json'}); 
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);  
        
    }
    
    regDeviceId(uuid){
      var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_update',
                'parameters': ["insert into vvbase/vvmobca (GUID) values ('"+uuid+"')"]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);  
        
    }
    
    
    setMobUserId(numid,chp,valdata){
       var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_update',
                'parameters': ["update  vvbase/vvmobca set "+chp+" = '"+valdata+"' where GUID = '"+numid+"'"]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    
    getInfosMag(num) {
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_AS400JSON',
                'parameters': ["select * from vvbase/vvinfmag where NUMMAG='"+num+"' "]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
        
    }
    
    
    getInfMobUser(guid) {
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_AS400JSON',
                'parameters': ["select * from vvbase/vvmobca where GUID='"+guid+"' "]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
        
    }
    
    
    setInfMobUser(guid,nom,prenom,email) {
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_update',
                'parameters': ["update  vvbase/vvmobca set NOM='"+nom+"', PRENOM='"+prenom+"' , EMAIL='"+email+"' where  GUID='"+guid+"' "]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
        
    }
    
    
    setInitMag(nummag,ipcaisse){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_update',
                'parameters': ["insert into vvbase/vvinfmag (nummag,ipork) values ('"+nummag+"','"+ipcaisse+"')"]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    setInfMag(nummag,chp,valdata){
       var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_update',
                'parameters': ["update  vvbase/vvinfmag  set "+chp+"='"+valdata+"' where nummag='"+nummag+"'"]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    
    getnIpImp(nmimp){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'getIpImp',
                'parameters': [nmimp]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    getTestOrk(ipm,cnum){
       var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'testorkaisse',
                'parameters': [ipm,'1',cnum]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError); 
    }
    
    getSrvOrk(ipm,cnum){
       var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'testorkaisse',
                'parameters': [ipm,'2',cnum]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
       return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError); 
    }
    
    getAtosOrk(ipm,cnum){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'testorkaisse',
                'parameters': [ipm,'3',cnum]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    getTpeOrk(ipm,cnum){
        var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'testorkaisse',
                'parameters': [ipm,'4',cnum]
            });
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    
    getTpeDblq(ipm,cnum){
      var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'testorkaisse',
                'parameters': [ipm,'5',cnum]
            });  
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    getMagByEns(ens){
       var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_AS400JSON',
                'parameters': ["select * from vvbase/vvmobmagip where ENSNOM like '"+ ens +"%' "]
            });
       let headers = new Headers({ 'Content-Type': 'application/json' }); 
       let options = new RequestOptions({ headers: headers });
        return this.http.post(this.servicesURL, callData, options)
            .map(res => res.json())
            .catch(this.handleError);     
        
    }
    

    handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error'); //.json().error
        //return JSON.parse(error);
    }
    
    
}

