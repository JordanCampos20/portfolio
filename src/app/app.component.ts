import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ContactComponent } from "./components/contact/contact.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { BodyComponent } from "./components/body/body.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { ContatoService } from './services/contato.service';
import { FormGroup } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jasmim-root',
  standalone: true,
  imports: [
    ProjectsComponent,
    ContactComponent,
    ProfileComponent,
    LoadingComponent,
    HeaderComponent,
    SkillsComponent,
    BodyComponent,
    RouterOutlet,
    CommonModule,
    MessagesModule,
    RippleModule,
    ToastModule,
  ],
  providers: [
    MessageService
  ],
  templateUrl:
  './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private contatoService : ContatoService,
    private messageService: MessageService) {

  }

  title = 'Portfolio';
  Loading: boolean = false;

  updateLoading(valor: boolean) {
    this.Loading = valor;
  }

  FormSubmit(ContactForm: FormGroup) {
    this.Loading = true;
    this.contatoService.postContato(ContactForm.value)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.Message });
          ContactForm.reset();
          this.Loading = false;
        },
        error: (response) => {
          if ("Message" in response) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.Message });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Erro inesperado!" });
          }
          this.Loading = false;
        }
      }
    );
  }
}
