import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FuncionariosService } from './services/funcionarios.service';

@Component({
  imports: [RouterOutlet, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('minha-loja');

  funcionarios: any[] = [];
  mensagem = 'Carregando funcionários...';

  constructor(private funcionariosService: FuncionariosService) {
    this.funcionariosService.listarFuncionarios().subscribe({
      next: (dados) => {
        this.funcionarios = dados;
        this.mensagem = dados.length > 0
          ? 'Funcionários carregados com sucesso!'
          : 'Nenhum funcionário encontrado.';
      },
      error: (erro) => {
        console.error('Erro ao consultar funcionários:', erro);
        this.mensagem = 'Não foi possível conectar à API.';
      }
    });
  }
}