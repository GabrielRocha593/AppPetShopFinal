import { Funcionario } from './funcionario.interface';
import { Servico } from './servico.interface';
import { Pet } from './pet.interface';

  
export interface Agendamento {
    id?: number;
    data: Date;
    status:string;
    funcionario?: Funcionario;
    pet:Pet;
    servico:Servico;
    
}