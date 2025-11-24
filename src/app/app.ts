import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormDemo } from "./reactive-form-demo/reactive-form-demo";

interface SubmittedFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  programOfStudy: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  fullName = '';
  email = '';
  phoneNumber = '';
  gender = '';
  dateOfBirth = '';
  programOfStudy = '';

  submitted = false;
  submittedData: SubmittedFormData | null = null;

  isDateValid(dateString: string): boolean {
    if (!dateString) return true;
    const today = new Date().toISOString().split('T')[0];
    return dateString <= today;
  }

  isAgeValid(dateString: string): boolean {
    if (!dateString) return true;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 10;
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.submitted = true;
      this.submittedData = {
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        programOfStudy: this.programOfStudy
      };
    }
  }

  resetForm(form: any): void {
    form.reset();
    this.fullName = '';
    this.email = '';
    this.phoneNumber = '';
    this.gender = '';
    this.dateOfBirth = '';
    this.programOfStudy = '';
    this.submitted = false;
    this.submittedData = null;
  }
}
