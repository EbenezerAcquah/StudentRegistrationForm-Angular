import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-reactive-form-demo',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form-demo.html',
  styleUrl: './reactive-form-demo.css',
})
export class ReactiveFormDemo {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.pattern(/^0[25]\d{8}$/),) 
  })

  onSubmit(){
    console.log('Form is submitted:', this.form.value);
  }
}
