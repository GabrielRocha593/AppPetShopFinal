import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Servico } from '../models/servico.interface';
import { ServicoService } from '../service/servico.service';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.page.html',
  styleUrls: ['./servico-list.page.scss'],
})
export class ServicoListPage implements OnInit {

  servicos : Servico[];

  constructor(
    private servicoService : ServicoService,
    private alertController : AlertController,
    private loadingController : LoadingController 
  ) {}

  ngOnInit() {
  }

  //chama o metodo listar toda vez que a tela ganha foco
  ionViewWillEnter() {
    this.listar();
  }
 
  //lista todos os servico na tela 
  async listar() {
    const loading = await this.loadingController.create({
      message:'Carregando'
    });
    loading.present();
    this.servicoService.getServicos().subscribe((servicos) => {
      this.servicos = servicos;
      console.log(this.servicos);
      loading.dismiss();
    });
  }

  //pergunta para o usuario se ele quer deletar o registro selecionado
  async confirmarExclusao(servico: Servico) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir ${servico.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(servico);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

//chama o metodo delete do servicoService
  private excluir(servico: Servico) {
    this.servicoService.excluir(servico).subscribe(() => this.listar());
  }

}
