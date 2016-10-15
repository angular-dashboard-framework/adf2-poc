import { Injectable } from '@angular/core';

import { Model } from './dashboard';

import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class AppService {

  private modelUrl = 'assets/model.json';

  constructor (private http: Http) {}

  getModel(): Observable<Model> {
    return this.http.get(this.modelUrl)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
