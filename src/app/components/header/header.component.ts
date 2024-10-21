import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'jasmim-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  onLinkClick(event: MouseEvent, section: string): void {
    event.preventDefault(); // Evita o comportamento padrão do link
    this.isMenuOpen = false; // Fecha o menu

    // Espera um pouco antes de navegar para a seção
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Ajuste o tempo conforme necessário
  }
}
