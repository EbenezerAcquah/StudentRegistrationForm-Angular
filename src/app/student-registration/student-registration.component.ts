import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent implements OnInit {
  studentForm!: FormGroup;
  submitted = false;
  submittedData: any = null;
  fullNameCharCount = 0;

  courses = [
    { id: 1, name: 'Frontend Development' },
    { id: 2, name: 'Backend Development' },
    { id: 3, name: 'UI/UX' },
    { id: 4, name: 'Data Science' },
    { id: 5, name: 'Flutter' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupValueChangeListeners();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      personal: this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required]
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        region: ['', Validators.required],
        digitalAddress: ['']
      }),
      courses: this.fb.array([], Validators.required),
      hasEmergencyContact: [false],
      emergencyContact: this.fb.group({
        contactName: [''],
        relationship: [''],
        contactPhone: ['']
      })
    });

    this.initializeCourses();
  }

  initializeCourses(): void {
    const coursesArray = this.studentForm.get('courses') as FormArray;
    this.courses.forEach(() => {
      coursesArray.push(this.fb.control(false));
    });
  }

  setupValueChangeListeners(): void {
    this.studentForm.get('personal.fullName')?.valueChanges.subscribe(value => {
      this.fullNameCharCount = value ? value.length : 0;
    });

    this.studentForm.get('hasEmergencyContact')?.valueChanges.subscribe(hasContact => {
      const emergencyGroup = this.studentForm.get('emergencyContact') as FormGroup;
      if (hasContact) {
        emergencyGroup.get('contactName')?.setValidators([Validators.required]);
        emergencyGroup.get('relationship')?.setValidators([Validators.required]);
        emergencyGroup.get('contactPhone')?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
      } else {
        emergencyGroup.get('contactName')?.clearValidators();
        emergencyGroup.get('relationship')?.clearValidators();
        emergencyGroup.get('contactPhone')?.clearValidators();
        emergencyGroup.reset();
      }
      emergencyGroup.updateValueAndValidity();
    });
  }

  get coursesArray(): FormArray {
    return this.studentForm.get('courses') as FormArray;
  }

  getSelectedCoursesCount(): number {
    return this.coursesArray.value.filter((checked: boolean) => checked).length;
  }

  autoFillBasicInfo(): void {
    this.studentForm.patchValue({
      personal: {
        fullName: 'John Doe',
        email: 'john@gmail.com',
        phone: '1234567890'
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched(this.studentForm);
      return;
    }

    this.submitted = true;
    const formValue = this.studentForm.value;
    
    this.submittedData = {
      personal: formValue.personal,
      address: formValue.address,
      selectedCourses: this.courses
        .filter((course, index) => formValue.courses[index])
        .map(course => course.name),
      emergencyContact: formValue.hasEmergencyContact ? formValue.emergencyContact : null
    };
  }

  resetForm(): void {
    this.studentForm.reset({ hasEmergencyContact: false });
    this.submitted = false;
    this.submittedData = null;
    this.fullNameCharCount = 0;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(ctrl => {
          ctrl.markAsTouched();
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl);
          }
        });
      }
    });
  }
}
