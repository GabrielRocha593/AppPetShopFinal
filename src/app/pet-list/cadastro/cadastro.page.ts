import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/service/pet.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/models/pet.interface';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/service/cliente.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
   
  pet : Pet;
  clientes: Cliente[];

  constructor(
    private petService : PetService,
    private clienteService: ClienteService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController 
  ) {
    //inicializa o objeto Pet
    this.pet = { nome: '' , descricao: '',
    cliente:{
      nome: "",
      endereco: "",
      cpf: "",
      telefone: ""
    }};
  }
  
   ngOnInit() {
     this.listarclientes();

  }


//Lista todos os clientes
  async listarclientes(){
    const loading = await this.loadingController.create({message: 'Carregando'});

    loading.present();

    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
      this.carregaPet();
      loading.dismiss();
    });
  }

//Carrega um Pet pelo ID
  carregaPet(){
    const id = this.activatedRoute.snapshot.params['id'];

    if(id) {
      this.petService.getPet(id).subscribe((pet) => this.pet = pet);
    } 
  }

  compareWith(Cliente1: Cliente, Cliente2: Cliente) {
    return Cliente1 && Cliente2 ? Cliente1.id === Cliente2.id : Cliente1 === Cliente2;

  };

  //chama o metodo Salvar() do PetService
  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});

    loading.present();

    this.petService
      .salvar(this.pet)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/pet-list']);
      },()=>loading.dismiss());
  }
}
