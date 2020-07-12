import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../service/agendamento.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Agendamento } from '../models/agendamento.interface';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.page.html',
  styleUrls: ['./agendamento-list.page.scss'],
})
export class AgendamentoListPage implements OnInit {

  agendamentos : Agendamento [];

  constructor(
    private agendamentoService : AgendamentoService,
    private alertController : AlertController,
    private loadingController : LoadingController 
  ) {}

  ngOnInit() {
  }

  //chama o metodo listar toda vez que a tela ganha foco
  ionViewWillEnter() {
    this.listar();
  }
 
  //lista todos na tela 
  async listar() {
    const loading = await this.loadingController.create({
      message:'Carregando'
    });
    loading.present();
    this.agendamentoService.getAgendamentos().subscribe((agendamentos) => {
      this.agendamentos = agendamentos;
      console.log(this.agendamentos);
      loading.dismiss();
    });
  }

  //pergunta para o usuario se ele quer deletar o registro selecionado
  async confirmarExclusao(agendamento: Agendamento) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir  o agendamento do pet ${agendamento.pet.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(agendamento);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

//chama o metodo delete do agendamentoService
  private excluir(agendamento: Agendamento) {
    this.agendamentoService.excluir(agendamento).subscribe(() => this.listar());
  }

}
