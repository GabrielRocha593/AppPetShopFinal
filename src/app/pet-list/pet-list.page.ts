import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PetService } from '../service/pet.service';
import { Pet } from '../models/pet.interface';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.page.html',
  styleUrls: ['./pet-list.page.scss'],
})
export class PetListPage implements OnInit {

  pets : Pet [];

  constructor(
    private petService : PetService,
    private alertController : AlertController,
    private loadingController : LoadingController 
  ) {}

  ngOnInit() {
  }

  //chama o metodo listar toda vez que a tela ganha foco
  ionViewWillEnter() {
    this.listar();
  }
 
  //lista todos os pet na tela 
  async listar() {
    const loading = await this.loadingController.create({
      message:'Carregando'
    });
    loading.present();
    this.petService.getPets().subscribe((pets) => {
      this.pets = pets;
      console.log(this.pets);
      loading.dismiss();
    });
  }

  //pergunta para o usuario se ele quer deletar o registro selecionado
  async confirmarExclusao(pet: Pet) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir ${pet.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(pet);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

//chama o metodo delete do petService
  private excluir(pet: Pet) {
    this.petService.excluir(pet).subscribe(() => this.listar());
  }
}



