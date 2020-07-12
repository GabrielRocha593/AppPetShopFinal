import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.interface';

@Injectable({
  providedIn: 'root'
})
export class PetService {

private URI = 'http://localhost:8080/pet-Back/resources/pets';

  constructor(
    private httpCliente : HttpClient
  ) { }

  //retorna todos os Perts
  getPets () {
    return this.httpCliente.get<Pet[]>(this.URI);
  }

  // returna um Pet pelo ID
  getPet (id: number) {
    return this.httpCliente.get<Pet>(`${this.URI}/${id}`);
  }

  //Adiciona um novo Pet
  private adicionar(pet:Pet){
    return this.httpCliente.post<Pet>(this.URI, pet);
  }

  //atualiza um Pet
  private atualizar(pet : Pet){
    return this.httpCliente.put<Pet>(`${this.URI}/${pet.id}`, pet);
  }

  //Deleta um Pet
  excluir(pet: Pet) {
    return this.httpCliente.delete(`${this.URI}/${pet.id}`);
  }

  //diferencia uma adição de um atualização 
  salvar(pet : Pet){
    if(pet && pet.id){
      return this.atualizar(pet);
    }else{
      return this.adicionar(pet);
    }
  }
}

