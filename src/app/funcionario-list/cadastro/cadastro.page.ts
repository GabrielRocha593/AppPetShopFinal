import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.interface';
import { Funcao } from 'src/app/models/funcao.interdace';
import { FuncaoService } from 'src/app/service/funcao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  funcionario: Funcionario;
  funcoes: Funcao[];
  data : string;

  constructor(
    private funcionarioService: FuncionarioService,
    private funcaoService: FuncaoService,
    private navController: NavController,
    private loadingController: LoadingController,
    private activatedRoute : ActivatedRoute,
  ) {
    //inicializa o objeto da tela
    this.funcionario = {
      nome: '',
      endereco: '',
      cpf: '',
      telefone: '',
      dataContratacao: new Date,
      funcao: {
        nome: "",
        salario: 0.00
      }
    }
  }

  ngOnInit() {
    this.listarFuncoes();
  }

  //lista os funções
  async listarFuncoes(){

    const loading = await this.loadingController.create({message: 'Carregando'});

      loading.present();

    this.funcaoService.getfuncoes().subscribe((funcoes) => {
      this.funcoes = funcoes;
      this.carregaFuncionario();
      loading.dismiss();
    });

  }
  //Carrega um Funcionario
  carregaFuncionario(){
    const id = this.activatedRoute.snapshot.params['id'];  

    if(id) {
      this.funcionarioService.getFuncionario(id).subscribe((funcionario) => {
        
        this.funcionario = funcionario;
        this.funcionario.dataContratacao = new Date(this.funcionario.dataContratacao);
        
      });
    } 
  }

  compareWith(Funcao1: Funcao, Funcao2: Funcao) {
    return Funcao1 && Funcao2 ? Funcao1.id === Funcao2.id : Funcao1 === Funcao2;
  };

    //Chama o metodo salvar do funcionarioService
  async salvar() {

    let loading = await this.loadingController.create({message: 'Salvando'});

    loading.present();


    this.funcionarioService
    .salvar(this.funcionario)
    .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/funcionario-list']);
      },()=>loading.dismiss());
  }

}
