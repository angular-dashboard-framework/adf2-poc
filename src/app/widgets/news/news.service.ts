import { Injectable } from '@angular/core';

import { Jsonp, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class NewsService {

  private static readonly BASE_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSONP_CALLBACK&q=";

  constructor(private jsonp: Jsonp){}

  getFeed(service: string): Observable<any> {
    return this.jsonp.get(NewsService.BASE_URL + service)
      .map(res => res.json())
      .map(data => data.responseData.feed);
  }

}
