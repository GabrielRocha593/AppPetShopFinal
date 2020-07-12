import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/funcionario.interface';
import { FuncionarioService } from '../service/funcionario.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.page.html',
  styleUrls: ['./funcionario-list.page.scss'],
})
export class FuncionarioListPage implements OnInit {

  funcionarios : Funcionario [];

  constructor(
    private funcionarioService : FuncionarioService,
    private alertController : AlertController,
    private loadingController : LoadingController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  //lista todos os funcionarios na tela 
  async listar() {

    const loading = await this.loadingController.create({message:'Carregando'});

    loading.present();

    this.funcionarioService.getFuncionarios().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
      console.log(this.funcionarios);
      loading.dismiss();
    });

  }
  //Pergunta para o Usuário de ele deseja excluir o cadastro selecionado 
  async confirmarExclusao(funcionarios: Funcionario) {

    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir ${funcionarios.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(funcionarios);
        }
      }, {
        text: 'NÃO'
      }]
    });
    
    alerta.present();
  }
 // chama o metodo excluir do funcionarioService
  private excluir(funcionarios: Funcionario) {
    this.funcionarioService.excluir(funcionarios).subscribe(() => this.listar());
  }
}
