import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ContactComponent } from "./components/contact/contact.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { BodyComponent } from "./components/body/body.component";

@Component({
  selector: 'jasmim-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProfileComponent, ProjectsComponent, ContactComponent, SkillsComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
