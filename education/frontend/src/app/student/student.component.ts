import { Component, inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../model/student';
import { Subject } from '../model/subject';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

  students:Student[] = [];
  subjects: Subject[] = [];
  averageMark: number | null = null;
  studentService= inject(StudentService);
  subjectService = inject(SubjectService);


  ngOnInit(){

    this.studentService.getStudents().subscribe((result)=>{
      this.students = result;
      console.log(this.students);
  });
  this.loadSubjects();
  this.loadAverageMark();
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  delete(id:string) {
    const ok=confirm("Biztos hogy törlöd?",);
    if(ok) {
      this.studentService.deleteStudent(id).subscribe(data => {
        alert("A tanuló törölve");
        this.students = this.students.filter((u) => u._id === id);
    });
  }
  }

  loadAverageMark() {
    this.studentService.getStudentAverageMark().subscribe((response: { averageMark: number }) => {
      this.averageMark = response.averageMark;
    });
  }
  

  

  getSubjectName(subjectId: string): string {
    let subjectName = '';

    // Call the SubjectService to get subject details
    this.subjectService.getSubjectById(subjectId).subscribe(
      (subject) => {
        subjectName = subject.name; // Assuming subject object has a 'name' property
      },
      (error) => {
        console.error('Error fetching subject:', error);
      }
    );

    return subjectName;
  }
}
