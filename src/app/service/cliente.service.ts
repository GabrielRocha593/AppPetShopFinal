import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URI = 'http://localhost:8080/pet-Back/resources/clientes';

  constructor(
    private httpCliente : HttpClient
  ) { }

   //retorna todos os Clientes
  getClientes () {
    return this.httpCliente.get<Cliente[]>(this.URI);
  }

  // returna um Cliente pelo ID
  getCliente (id: number) {
    return this.httpCliente.get<Cliente>(`${this.URI}/${id}`);
  }

  //Adiciona um novo Cliente
  adicionar(cliente: Cliente){
    return this.httpCliente.post<Cliente>(this.URI, cliente);
  }

  //atualiza um Cliente
  atualizar(cliente: Cliente){
    return this.httpCliente.put<Cliente>(`${this.URI}/${cliente.id}`, cliente);
  }

  //Deleta um Cliente
  excluir(cliente: Cliente) {
    return this.httpCliente.delete(`${this.URI}/${cliente.id}`);
  }

  //diferencia uma adição de um atualização 
  salvar(cliente: Cliente){
    if(cliente && cliente.id){
      return this.atualizar(cliente);
    }else{
      return this.adicionar(cliente);
    }
  }

}
