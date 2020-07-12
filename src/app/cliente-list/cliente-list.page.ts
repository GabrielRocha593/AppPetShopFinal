import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente.interface';
import { ClienteService } from '../service/cliente.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
})
export class ClienteListPage implements OnInit {

  clientes : Cliente [];

  constructor(
    private clienteService    : ClienteService,
    private alertController   : AlertController,
    private loadingController : LoadingController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  //lista todos os cliente na tela
  async listar() {

    const loading = await this.loadingController.create({message:'Carregando'});

    loading.present();

    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
      console.log(this.clientes);
      loading.dismiss();
    });
  }
//Pergunta para o Usuário de ele deseja excluir o cadastro selecionado 
  async confirmarExclusao(cliente: Cliente) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir ${cliente.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(cliente);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }
  //Chama o metodo excluir do clienteService
  private excluir(cliente: Cliente) {
    this.clienteService.excluir(cliente).subscribe(() => this.listar());
  }

}
