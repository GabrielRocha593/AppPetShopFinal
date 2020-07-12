import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.interface';
import { Pet } from 'src/app/models/pet.interface';
import { PetService } from 'src/app/service/pet.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cliente: Cliente;
  pets: Pet[];

  constructor(
    private petService: PetService,
    private clienteService: ClienteService,
    private navController: NavController,
    private loadingController: LoadingController,
    private activatedRoute : ActivatedRoute,
  ) {
    //inicializa o objeto da tela
    this.cliente = {
      nome:'',
      endereco:'',
      cpf:'',
      telefone:''
    }
  }

   ngOnInit() {
     this.carregaCliente();
  }

  //carrega o cliente na tela
  async carregaCliente(){

  const id = this.activatedRoute.snapshot.params['id'];    

    if(id) {

      const loading = await this.loadingController.create({message: 'Carregando'});

      loading.present();

      this.clienteService.getCliente(id).subscribe((cliente) => {
        this.cliente = cliente;
        loading.dismiss();
      });
    }

}

//chama o metodo salvar do clienteService
  async salvar(cliente: Cliente){

    let loading = await this.loadingController.create({message: 'Salvando'});

    loading.present();

    this.clienteService
    .salvar(this.cliente)
    .subscribe(() => {
      loading.dismiss();
      this.navController.navigateForward(['/cliente-list']);
    },()=>loading.dismiss());
  }

  }
