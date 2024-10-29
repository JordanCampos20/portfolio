import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'jasmim-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextareaModule,
    LoadingComponent,
    InputTextModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  ContactForm: FormGroup;
  @Output() FormSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() FormReset: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.ContactForm = this.fb.group({
      Nome: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Assunto: ['', Validators.required]
    });
  }

  get nome() {
    return this.ContactForm.get('Nome');
  }

  get email() {
    return this.ContactForm.get('Email');
  }

  get assunto() {
    return this.ContactForm.get('Assunto');
  }

  onContactFormSubmit(): void {
    if (this.ContactForm.valid) {
      this.FormSubmit.emit(this.ContactForm);
    }
  }

  onContactFormReset(): void {
    this.ContactForm.reset();
  }

  onTriggerContactFormSubmit(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onContactFormSubmit();
    }
  }
}
