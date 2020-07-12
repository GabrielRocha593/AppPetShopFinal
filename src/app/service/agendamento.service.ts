import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../models/agendamento.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private URI = 'http://localhost:8080/pet-Back/resources/Agendamentos';

  constructor(
    private httpCliente : HttpClient
  ) { }

  //retorna todos 
  getAgendamentos () {
    return this.httpCliente.get<Agendamento[]>(this.URI);
  }

  // returna um Agendamento pelo ID
  getAgendamento (id: number) {
    return this.httpCliente.get<Agendamento>(`${this.URI}/${id}`);
  }

  //Adiciona 
  private adicionar(agendamento:Agendamento){
    return this.httpCliente.post<Agendamento>(this.URI, agendamento);
  }

  //atualiza 
  private atualizar(agendamento : Agendamento){
    return this.httpCliente.put<Agendamento>(`${this.URI}/${agendamento.id}`, agendamento);
  }

  //Deleta 
  excluir(agendamento: Agendamento) {
    return this.httpCliente.delete(`${this.URI}/${agendamento.id}`);
  }

  //diferencia uma adição de um atualização 
  salvar(agendamento : Agendamento){
    if(agendamento && agendamento.id){
      return this.atualizar(agendamento);
    }else{
      return this.adicionar(agendamento);
    }
  }
}
