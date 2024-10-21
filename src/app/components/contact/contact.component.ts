import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ResponseViewModel } from '../../interfaces/response';
import { ContatoService } from '../../services/contato.service';
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
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  ContactForm: FormGroup;
  Loading: boolean = false;

  constructor(private contatoService: ContatoService,
    private messageService: MessageService,
      private fb: FormBuilder) {
    this.ContactForm = this.fb.group({
      Nome: ['', Validators.required],
      Email: ['', Validators.required],
      Assunto: ['', Validators.required]
    });
  }

  onContactFormSubmit(): void {
    if (this.ContactForm.valid) {
      this.Loading = true;
      this.contatoService.postContato(this.ContactForm.value).subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: response.Message });
            this.ContactForm.reset();
            this.Loading = false;
          },
          error: (response) => {
            if ("Message" in response)
              this.messageService.add({ severity: 'danger', summary: 'Erro', detail: response.Message });
            else
              this.messageService.add({ severity: 'danger', summary: 'Erro', detail: "Erro não tratado!" });
            this.Loading = false;
          }
        }
      );
    }
  }

  onTriggerContactFormSubmit(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onContactFormSubmit();
    }
  }
}
