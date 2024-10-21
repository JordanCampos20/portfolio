import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Projeto } from '../../interfaces/projeto';

@Component({
  selector: 'jasmim-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit, OnDestroy {
  projetos!: Projeto[];
  subscription!: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    this.projetos = [
      {
        Nome: "Controle Financeiro",
        Descricao: `
          Sistema desenvolvido para gerenciar transações entre usuários, <br>
          automatizando a geração de pix copia e cola para <br>
          facilitar pagamentos de forma rápida e eficiente.
        `,
        Imagens: [
          "projetos/financeiro/geral/entrar.png",
          "projetos/financeiro/geral/registro.png",
          "projetos/financeiro/geral/esqueceu-a-senha.png",
          "projetos/financeiro/geral/inicio.png",
          "projetos/financeiro/geral/chave.png",
          "projetos/financeiro/geral/chave-1.png"
        ],
        ImagemAtualSrc: "projetos/financeiro/geral/entrar.png",
        ImagemAtualAlt: "entrar.png",
        Index: 0,
        Linguagens: [
          "icons/csharp/csharp-original.svg",
          "icons/angular/angular-original.svg",
          "icons/postgresql/postgresql-original.svg"
        ],
        Url: "https://github.com/JordanCampos20/finance-control-client"
      },
      {
        Nome: "Controle de pagamento",
        Descricao: `
          Solução criada para permitir que usuários <br>
          visualizem e paguem suas despesas pendentes, <br>
          desbloqueando o acesso a outros sistemas relacionado
        `,
        Imagens: [
          "projetos/pagamento/geral/entrar.png",
          "projetos/pagamento/geral/registro.png",
          "projetos/pagamento/geral/esqueceu-a-senha.png",
          "projetos/pagamento/geral/inicio.png",
          "projetos/pagamento/geral/detalhe.png"
        ],
        ImagemAtualSrc: "projetos/pagamento/geral/entrar.png",
        ImagemAtualAlt: "entrar.png",
        Index: 0,
        Linguagens: [
          "icons/csharp/csharp-original.svg",
          "icons/angular/angular-original.svg",
          "icons/postgresql/postgresql-original.svg"
        ],
        Url: "https://github.com/JordanCampos20/recibo-control-client"
      },
      {
        Nome: "HTMLToPDF",
        Descricao: `
          Pacote nuget criado por mim para gerar o pdf <br>
          com base no html (url, arquivo ou texto).
        `,
        Imagens: [
          "projetos/htmltopdf/geral.png"
        ],
        ImagemAtualSrc: "projetos/htmltopdf/geral.png",
        ImagemAtualAlt: "geral.png",
        Index: 0,
        Linguagens: [
          "icons/csharp/csharp-original.svg"
        ],
        Url: "https://github.com/JordanCampos20/C20.HtmlToPDF"
      },
      {
        Nome: "Gerador de README.md Multilinguagem",
        Descricao: `
          Sistema para criar os readme em varias linguagens.
        `,
        Imagens: [
          "projetos/multilingual/geral.png"
        ],
        ImagemAtualSrc: "projetos/multilingual/geral.png",
        ImagemAtualAlt: "geral.png",
        Index: 0,
        Linguagens: [
          "icons/python/python-original.svg"
        ],
        Url: "https://github.com/JordanCampos20/Multilingual-Readme-Generator"
      }
    ];

    if (isPlatformBrowser(this.platformId)) {
      this.subscription = interval(3000).subscribe(() => {
        this.projetos.forEach(projeto => {
          if (projeto.Imagens && projeto.Imagens.length > 0) {

            projeto.ImagemAtualSrc = projeto.Imagens[projeto.Index];

            projeto.ImagemAtualAlt = projeto.Imagens[projeto.Index].split("/")[projeto.Imagens[projeto.Index].split("/").length-1];

            projeto.Index += 1;

            if (projeto.Index >= projeto.Imagens.length) {
              projeto.Index = 0;
            }
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onOpenProject(projeto: Projeto): void {
    window.open(projeto.Url);
  }
}
