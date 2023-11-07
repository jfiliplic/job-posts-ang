import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { JobPost } from '../shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private bearerToken = environment.bearerToken;

  headers = new HttpHeaders().set('Authorization', this.bearerToken);

  getData(fullApiUrl: string): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(fullApiUrl, { headers: this.headers });
  }
}
