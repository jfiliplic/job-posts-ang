import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface JobPost {
  id: string;
  title: string;
  description: string;
  notes: string;
  openAt: Date;
  closeAt: Date;
  defaultAssignmentId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  interviewTypes: InterviewType[];
}

interface InterviewType {
  id: string;
  title: string;
  description: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://stage.api.recruitment.indigo.si/JobPost';

  private bearerToken = environment.bearerToken;

  headers = new HttpHeaders().set('Authorization', this.bearerToken);

  getData(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(this.apiUrl, { headers: this.headers });
  }
}
