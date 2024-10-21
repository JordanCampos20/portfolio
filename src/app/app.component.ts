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
    CommonModule
],

  templateUrl:
  './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
  Loading: boolean = false;

  updateLoading(valor: boolean) {
    console.log(valor);
    this.Loading = valor;
  }
}
