import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.httpClient.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourse(id: string) {
    return this.httpClient.get<Course>(`${this.apiUrl}/course/${id}`);
  }

  addCourse(model: Course) {
    return this.httpClient.post<Course>(`${this.apiUrl}/courses`, model);
  }

  updateCourse(id: string, model: Course) {
    return this.httpClient.put(`${this.apiUrl}/course/${id}`, model);
  }

  deleteCourse(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/course/${id}`);
  }
}
