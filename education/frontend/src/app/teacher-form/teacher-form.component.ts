import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../model/teacher';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss'
})
export class TeacherFormComponent {

  formBuilder = inject(FormBuilder);
  teacherService = inject(TeacherService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  teacherForm: FormGroup = this.formBuilder.group({
    
    name: ['', [Validators.required, Validators.minLength(1)]],
    department: ['', [Validators.required, Validators.minLength(1)]],
    subject: [''], 
  });

  editTeacherId!: string;

  ngOnInit() {
    this.editTeacherId = this.route.snapshot.params['id'];
    if (this.editTeacherId) {
      this.teacherService.getTeacher(this.editTeacherId).subscribe((result) => {
        this.teacherForm.patchValue(result);
      });
    }
  }

  addTeacher() {
    if (this.teacherForm.invalid) {
      alert('Töltsd ki a kötelező mezőket');
      return;
    }
    const model: Teacher = this.teacherForm.value;
    this.teacherService.addTeacher(model).subscribe((result) => {
      alert('A tanár sikeresen hozzáadva');
      this.router.navigateByUrl('/teachers');
    });
  }

  updateTeacher() {
    if (this.teacherForm.invalid) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }
    const model: Teacher = this.teacherForm.value;
    this.teacherService.updateTeacher(this.editTeacherId, model).subscribe((result) => {
      alert('A Tanár sikeresen módósítva!');
      this.router.navigateByUrl('/teachers');
    });
  }

}
