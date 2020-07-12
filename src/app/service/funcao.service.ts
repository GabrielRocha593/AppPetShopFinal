import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcao } from '../models/funcao.interdace';

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  private URI = 'http://localhost:3000/funcao';

  constructor(
    private httpCliente : HttpClient
  ) { }

  //retorna todas as funçôes
  getfuncoes(){
    return this.httpCliente.get<Funcao[]>(this.URI);
  }

  // returna um função pelo ID
  getfuncao(id : number) {
    return this.httpCliente.get<Funcao>(`${this.URI}/${id}`);
  }

  //Adiciona uma nova função
  adicionar(funcao : Funcao){
    return this.httpCliente.post<Funcao>(this.URI, funcao);
  }

  //atualiza ums função
  atualizar(funcao : Funcao){
    return this.httpCliente.put<Funcao>(`${this.URI}/${funcao.id}`, funcao);
  }

  //Deleta uma função
  excluir(funcao : Funcao){
    return this.httpCliente.delete(`${this.URI}/${funcao.id}`);
  }

  //diferencia uma adição de um atualização 
  salvar(funcao : Funcao){
    if(funcao && funcao.id){
      return this.atualizar(funcao);
    }else{
      return this.adicionar(funcao);
    }
  }

}
