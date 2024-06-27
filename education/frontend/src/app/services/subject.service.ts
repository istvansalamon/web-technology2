import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../model/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  private apiUrl = 'http://localhost:3000/subjects';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl);
  }

  getSubjectById(subjectId: string): Observable<Subject> {
    const url = `${this.apiUrl}/${subjectId}`;
    return this.http.get<Subject>(url);
  }
}
