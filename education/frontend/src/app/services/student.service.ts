import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  
  apiUrl='http://localhost:3000';
  httpClient=inject(HttpClient)
  constructor() { }

  getStudents(){
    return this.httpClient.get<Student[]>(this.apiUrl+'/students');
  }
  getStudent(id:string) {
    return this.httpClient.get<Student>(this.apiUrl + '/student/'+ id);
  }

  addStudent(model: Student) {
    return this.httpClient.post<Student>(this.apiUrl + '/students', model);
  }

  updateStudent(id:string,model:Student) {
    return this.httpClient.put(this.apiUrl+'/student/'+id,model);
  }

  deleteStudent(id:string) {
    return this.httpClient.delete(this.apiUrl+'/student/'+id);
  }
  
  getStudentAverageMark() {
    return this.httpClient.get<{ averageMark: number }>(this.apiUrl + '/students/average-mark');
  }

}
