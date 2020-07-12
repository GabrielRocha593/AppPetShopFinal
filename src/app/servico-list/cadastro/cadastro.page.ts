import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/models/servico.interface';
import { ServicoService } from 'src/app/service/servico.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  servico : Servico;

  constructor(
    private servicoService : ServicoService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController 
  ) {
    //inicializa o objeto 
    this.servico = { nome: '' , valor:0};
  }
  
   ngOnInit() {
     this.carregaServico();
  }

//Carrega  pelo ID
  carregaServico(){
    const id = this.activatedRoute.snapshot.params['id'];

    if(id) {
      this.servicoService.getServico(id).subscribe((servico) => this.servico = servico);
      console.log(this.servico);
    } 
  }

  //chama o metodo Salvar() 
  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});

    loading.present();

    this.servicoService
      .salvar(this.servico)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/servico-list']);
      },()=>loading.dismiss());
  }

}
