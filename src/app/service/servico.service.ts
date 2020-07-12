import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servico } from '../models/servico.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private URI = 'http://localhost:8080/pet-Back/resources/servicos';

  constructor(
    private httpCliente : HttpClient
  ) { }

  //retorna todos os Servicos
  getServicos () {
    return this.httpCliente.get<Servico[]>(this.URI);
  }

  // returna um Servico pelo ID
  getServico (id: number) {
    return this.httpCliente.get<Servico>(`${this.URI}/${id}`);
  }

  //Adiciona um novo Servico
  private adicionar(servico:Servico){
    return this.httpCliente.post<Servico>(this.URI, servico);
  }

  //atualiza um Servico
  private atualizar(servico : Servico){
    return this.httpCliente.put<Servico>(`${this.URI}/${servico.id}`, servico);
  }

  //Deleta um Servico
  excluir(servico: Servico) {
    return this.httpCliente.delete(`${this.URI}/${servico.id}`);
  }

  //diferencia uma adição de um atualização 
  salvar(servico : Servico){
    if(servico && servico.id){
      return this.atualizar(servico);
    }else{
      return this.adicionar(servico);
    }
  }
}
