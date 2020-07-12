import { Cliente } from './cliente.interface';

  
export interface Pet {
    id?: number;
    nome: string;
    descricao: string;
    cliente: Cliente;
}