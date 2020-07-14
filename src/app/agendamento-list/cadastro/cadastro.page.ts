import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento.interface';
import { Funcionario } from 'src/app/models/funcionario.interface';
import { Servico } from 'src/app/models/servico.interface';
import { Pet } from 'src/app/models/pet.interface';
import { PetService } from 'src/app/service/pet.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  
  agendamento : Agendamento;
  funcionarios: Funcionario[];
  servicos:Servico[];
  pets:Pet[];
  data: string;
  

  constructor(
    private petService : PetService,
    private agendamentoService : AgendamentoService,
    private funcionarioService : FuncionarioService,
    private servicoService : ServicoService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController 
  ) {
    //inicializa o objeto Pet
    this.agendamento = {
      data: new Date,
      status: "",
      pet: {
        nome: "",
        descricao: "",
        cliente: {
          nome: "",
          endereco: "",
          cpf: "",
          telefone: ""
        }
      },
      servico: {
        nome: "",
        valor: 0.00
      }
    };
  }
  
   ngOnInit() {
     this.listardados();

  }


//Lista todos os clientes
  async listardados(){
    const loading = await this.loadingController.create({message: 'Carregando'});

    loading.present();

    this.funcionarioService.getFuncionarios().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;  
         
    });
    
    this.petService.getPets().subscribe((pets) => {
    this.pets = pets;  
         
    });
    this.servicoService.getServicos().subscribe((servicos) => {
    this.servicos = servicos;  
          
    });
    this.carregaAgendamento();
    loading.dismiss();
  } 

//Carrega um Pet pelo ID
  carregaAgendamento(){
    const id = this.activatedRoute.snapshot.params['id'];

    if(id) {
      this.agendamentoService.getAgendamento(id).subscribe((agendamento) => {
        this.agendamento = agendamento;

        var data = new Date(this.agendamento.data),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        this.data = anoF+"-"+mesF+"-"+diaF;

      });
    } 
  }

  compareWith(Funcionario1: any, Funcionario2: any) {
    return Funcionario1 && Funcionario2 ? Funcionario1.id === Funcionario2.id : Funcionario1 === Funcionario2;

  };

  compareWithFuncionario(Funcionario1: Funcionario, Funcionario2: Funcionario) {
    return Funcionario1 && Funcionario2 ? Funcionario1.id === Funcionario2.id : Funcionario1 === Funcionario2;

  };
  compareWithPet(Pet1: Pet, Pet2: Pet) {
    return Pet1 && Pet2 ? Pet1.id === Pet2.id : Pet1 === Pet2;

  };
  compareWithServico(Servico1: Servico, Servico2: Servico) {
    return Servico1 && Servico2 ? Servico1.id === Servico2.id : Servico1 === Servico2;

  };

  //chama o metodo Salvar() 
  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});

    loading.present();

    this.agendamentoService
    .salvar(this.agendamento)
    .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/agendamento-list']);
      },()=>loading.dismiss());
  }

}
