import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import { Student } from '../model/student';
import { Subject } from '../model/subject';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'] 
})
export class StudentFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  studentService = inject(StudentService);
  subjectService = inject(SubjectService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  studentForm: FormGroup = this.formBuilder.group({
    
    name: ['', [Validators.required, Validators.minLength(1)]],
    mark: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
    class: [''],
    subject: [[]], 
  });

  editStudentId!: string;
  subjects: Subject[] = [];
 

  ngOnInit() {
    this.editStudentId = this.route.snapshot.params['id'];
    if (this.editStudentId) {
      this.studentService.getStudent(this.editStudentId).subscribe((result) => {
        this.studentForm.patchValue(result);
      });
    }
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  addStudent() {
    if (this.studentForm.invalid) {
      alert('Töltsd ki a kötelező mezőket');
      return;
    }
    const model: Student = this.studentForm.value;
    this.studentService.addStudent(model).subscribe((result) => {
      alert('A diák sikeresen hozzáadva');
      this.router.navigateByUrl('/students');
    });
  }

  updateStudent() {
    if (this.studentForm.invalid) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }
    const model: Student = this.studentForm.value;
    this.studentService.updateStudent(this.editStudentId, model).subscribe((result) => {
      alert('A diak sikeresen módósítva!');
      this.router.navigateByUrl('/students');
    });
  }
}
