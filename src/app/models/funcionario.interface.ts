import { Funcao } from './funcao.interdace';

export interface Funcionario {
    id?: number;
    nome: string;
    endereco: string;
    cpf: string;
    telefone: string;
    dataContratacao: Date;
    funcao: Funcao;
}