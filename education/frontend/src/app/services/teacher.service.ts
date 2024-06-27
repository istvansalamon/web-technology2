import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Teacher } from '../model/teacher';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  apiUrl='http://localhost:3000';
  httpClient=inject(HttpClient)
  constructor() { }

  getTeachers(){
    return this.httpClient.get<Teacher[]>(this.apiUrl+'/teachers');
  }
  getTeacher(id:string) {
    return this.httpClient.get<Teacher>(this.apiUrl + '/teacher/'+ id);
  }

  addTeacher(model: Teacher) {
    return this.httpClient.post<Teacher>(this.apiUrl + '/teachers', model);
  }

  updateTeacher(id:string,model:Teacher) {
    return this.httpClient.put(this.apiUrl+'/teacher/'+id,model);
  }

  deleteTeacher(id:string) {
    return this.httpClient.delete(this.apiUrl+'/teacher/'+id);
  }

  /*assignSubjectToTeacher(teacherId: string, subjectId: string) {
    return this.httpClient.post(this.apiUrl + '/teacher/' + teacherId + '/assign-subject', { subjectId });
  }

  assignCourseToTeacher(teacherId: string, courseId: string) {
    return this.httpClient.post(this.apiUrl + '/teacher/' + teacherId + '/assign-course', { courseId });
  }*/

}
