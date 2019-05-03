import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MoviesList } from '../model/movieList';
import { Movies } from '../model/movies';
import { Genre } from '../model/genres';

const serverurl = "http://localhost:3000/api/movies"

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAll(params? :any): Observable<MoviesList> {
    let queryParams = {};
    if(params){
      queryParams = {params : new HttpParams()
        .set('sort', params.sort || "")
        .set('sortDirection', params.sortDirection || "")
        .set('page', params.page && params.page.toString() || "")
        .set('pageSize', params.pageSize && params.pageSize.toString() || "")
        .set('filter', params.filter && JSON.stringify(params.filter) || "")
      }
    }

    return this.http.get(serverurl, queryParams).pipe(map(
      response => {return new MoviesList(response)}
    ));
  }

  get(id: number): Observable<Movies> {
    return this.http.get(serverurl + "/" + id).pipe(map(
      response => { return new Movies(response)}
    ));
  }

  add(newMovie: Movies) :Observable<Movies>{
    return this.http.post(serverurl, newMovie).pipe(map(
      response => { return new Movies(response); }
    ));
  }

  update(editedMovie: Movies) :Observable<Movies>{
    return this.http.put(serverurl + "/" + editedMovie._id, editedMovie).pipe(map(
      response => { return new Movies(response); }
    ));
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Array<Genre>>("http://localhost:3000/api/genres").pipe(map(res => {
      let retVal = new Array<Genre>();
      res.forEach(elem => retVal.push(new Genre(elem)));
      return retVal;
    }));
  }
}

