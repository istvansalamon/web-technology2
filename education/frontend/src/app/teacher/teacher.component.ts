import { Component, inject } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { SubjectService } from '../services/subject.service';
import { CourseService } from '../services/course.service';
import { Teacher } from '../model/teacher';
import { Subject } from '../model/subject';
import { Course } from '../model/course';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent {
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  courses: Course[] = [];
  teacherService = inject(TeacherService);
  subjectService = inject(SubjectService);
  courseService = inject(CourseService);


  ngOnInit(){

    this.teacherService.getTeachers().subscribe((result)=>{
      this.teachers = result;
      console.log(this.teachers);
  });
  this.loadSubjects();
    this.loadCourses();
  }
  loadTeachers() {
    this.teacherService.getTeachers().subscribe((result) => {
      this.teachers = result;
    });
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe((result) => {
      this.subjects = result;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((result) => {
      this.courses = result;
    });
  }

  delete(id:string) {
    const ok=confirm("Biztos hogy törlöd?",);
    if(ok) {
      this.teacherService.deleteTeacher(id).subscribe(data => {
        alert("A tanuló törölve");
        this.teachers = this.teachers.filter((u) => u._id === id);
    });
  }
  }

  /*assignSubjectToTeacher(teacherId: string, subjectId: string) {
    this.teacherService.assignSubjectToTeacher(teacherId, subjectId).subscribe(() => {
      this.loadTeachers();
    });
  }

  assignCourseToTeacher(teacherId: string, courseId: string) {
    this.teacherService.assignCourseToTeacher(teacherId, courseId).subscribe(() => {
      this.loadTeachers();
    });
  }*/

}
