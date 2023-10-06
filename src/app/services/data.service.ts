import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNGMDdCRTcxQjlCMjVFRkQ3NDFGQ0E4RTM5Q0NDNDNEIiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL3N0YWdlLmlkLmluZGlnby5zaSIsIm5iZiI6MTY5NjU5NTc0MywiaWF0IjoxNjk2NTk1NzQzLCJleHAiOjE2OTY1OTkzNDMsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl0sImNsaWVudF9pZCI6IjNmNzY4NzNhLWM5MTctNDJhZC1hZDlmLTk2MDAzOWY1MTJlZiIsInN1YiI6IjU2ZGUwMTc3LTk0MWMtNDlmZi03YzJhLTA4ZGE0NTYwODdjNSIsImF1dGhfdGltZSI6MTY5NjU4Nzc1NiwiaWRwIjoibG9jYWwiLCJyb2xlIjoiYmFzaWMiLCJzaWQiOiIxNDdGQUZERjVCQzYxNUI3QkIwOTREQzIzNEZEQjM2NiIsImp0aSI6IjI4REIxMzkzMjgzQzgyOTMyNjY0NUM1Rjc4RjM1MkY0In0.trtgK-RGSKfyrLbiKa_rgDq4_jRNxG8CT_keKA8PBGnEk6yEAbodwawRvJAET0lxsboJrRhHkdwNQDhscSMJb83zNIoInz2P4h3qNjKq2B5puYK0RsceQG5ZabmtSgbKwBZJ1FxF01m_1Tp2lD69sBPpzyf5kygx1bijLUr4bvzamSAI1Ngc4Y52RU9zk4QdaaL3laoseLmkOUjizYUW1Gt47EKuZ80y8pNFXMBb47iAojP1zCnMwD93x7ypYvpzkoBPV0_jMQUsEp6vM5yRY27TvYUX2qUjKblrX2JtGu2c6D1hxCJEVQjZrPfn68ZxvsOP-D0SBMLxw5qI1JZdwg'
  );

  getData(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(this.apiUrl, { headers: this.headers });
  }
}
