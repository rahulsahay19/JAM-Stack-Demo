import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IMovie } from './movie';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movieUrl = environment.movieUrl;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http
      .get<IMovie[]>(this.movieUrl)
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err.statusText);
  }
}
