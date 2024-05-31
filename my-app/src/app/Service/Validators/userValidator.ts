import { z } from "zod";
import { User } from "../Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

export class userValidator {
    private UserSchema;
    private userValByField: { [key: string]: z.ZodString }
    constructor(){
        this.UserSchema = z.object({
            nome: z.string().min(2, "O nome deve ter mais de 5 caracteres."),
            sobrenome: z.string().min(2, "O sobrenome deve ter mais de 5 caracteres."),
            email: z.string().email("Email precisa ser válido"),
            senha: z.string()
                .min(8, 'A senha deve ter pelo menos 8 caracteres')
                .max(20, 'A senha deve ter no máximo 20 caracteres')
                .regex(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra')
                .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
        })

        this.userValByField = {
            email: z.string().email("Email precisa ser válido"),
            password: z.string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
                .max(20, 'A senha deve ter no máximo 20 caracteres')
                .regex(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra')
                .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),

        };
    }
    private async validateField(validator: z.ZodString, value: string): Promise<string> {
        return await validator.parseAsync(value);
    }

    async valByField(field: string, value: string): Promise<IReturnAdapter> {
      if(field === 'nome' || field === 'sobrenome'){
        return { val: true, data: 'ok'};
      }
        try {
          const validator = this.userValByField[field]; // Obtém o esquema de validação para o field
        if (!validator) {
          return { val: false, erro: 'Esquema de validação não encontrado para o campo especificado.' };
        }
          const valueValidado = await this.validateField(validator, value);;
          return { val: true, data: String(valueValidado)}; // Retorno válido
        } catch (error) {
          if (error instanceof z.ZodError) {
            const mensagemErro = error.errors[0].message; 
            return { val: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
          } else {
            return { val: false, erro: 'Erro desconhecido ao validar o texto' };
          }
        }
      }
      async confirmarSenha(senha: string, confirmsenha: string): Promise<IReturnAdapter>{
            try {
                const valconf = z.literal(senha).parse(confirmsenha)
                return { val: true, data: valconf }; // Retorno válido
            } catch (error) {
              if (error instanceof z.ZodError) {
                const mensagemErro = error.errors[0].message; 
                return { val: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
              } else {
                return { val: false, erro: 'Erro desconhecido ao validar o texto' };
              }

        }
    }
        async validarUser(user: User): Promise<IReturnAdapter> {
            try {
                const valuser = this.UserSchema.parse(user)
            return { val: true, data: valuser }; // Retorno válido
        } catch (error) {
          if (error instanceof z.ZodError) {
            const mensagemErro = error.errors[0].message; 
            return { val: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
          } else {
            return { val: false, erro: 'Erro desconhecido ao validar o texto' };
          }

        }
        }
    }