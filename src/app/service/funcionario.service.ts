import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../models/funcionario.interface';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private URI = 'http://localhost:8080/pet-Back/resources/funcionarios';

  constructor(
    private httpCliente : HttpClient
  ) { }

  //retorna todos os funcionarios
  getFuncionarios(){
    return this.httpCliente.get<Funcionario[]>(this.URI);
  }

  // returna um funcionario pelo ID
  getFuncionario(id : number) {
    return this.httpCliente.get<Funcionario>(`${this.URI}/${id}`);
  }

  //Adiciona um novo funcionario
  adicionar(funcionario : Funcionario){
    return this.httpCliente.post<Funcionario>(this.URI, funcionario);
  }

  //atualiza um funcionario
  atualizar(funcionario : Funcionario){
    return this.httpCliente.put<Funcionario>(`${this.URI}/${funcionario.id}`, funcionario);
  }

  //Deleta um funcionario
  excluir(funcionario : Funcionario){
    return this.httpCliente.delete(`${this.URI}/${funcionario.id}`);
  }

  //diferencia uma adição de um atualização 
  salvar(funcionario : Funcionario){
    if(funcionario && funcionario.id){
      return this.atualizar(funcionario);
    }else{
      return this.adicionar(funcionario);
    }
  }
}
