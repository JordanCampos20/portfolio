import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { LoadingComponent } from '../loading/loading.component';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'jasmim-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextareaModule,
    LoadingComponent,
    InputTextModule,
    MessagesModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    ToastModule,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  ContactForm: FormGroup;
  @Output() LoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private contatoService: ContatoService,
      private messageService: MessageService,
      private fb: FormBuilder) {
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
      this.LoadingChanged.emit(true);
      this.contatoService.postContato(this.ContactForm.value)
        .subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.Message });
            this.ContactForm.reset();
          },
          error: (response) => {
            if ("Message" in response) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.Message });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: "Erro inesperado!" });
            }
          },
          complete: () => {
            this.LoadingChanged.emit(false);
          }
        }
      );
      this.LoadingChanged.emit(false);
    }
  }

  onTriggerContactFormSubmit(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onContactFormSubmit();
    }
  }
}
