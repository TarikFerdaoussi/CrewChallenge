import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Profil } from 'src/app/models/profil.model'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler,
              private config: ConfigService) {
    this.handleError = httpErrorHandler.createHandleError('ApiService');
  }

  getTalents(): Observable<Profil[]> {
    return this.http.get<Profil[]>(this.config.talents)
      .pipe(
        catchError(this.handleError('getTalents', []))
      );
  }
  
}
