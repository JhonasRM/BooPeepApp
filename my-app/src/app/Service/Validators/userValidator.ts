import { z } from "zod";
import { User } from "../Entities/userEntities";

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

    async valByField(field: string, value: string): Promise<{valido: boolean, value?: string, erro?: string }> {
      if(field === 'nome' || field === 'sobrenome'){
        return { valido: true, value: 'ok', erro: undefined };
      }
        const validator = this.userValByField[field]; // Obtém o esquema de validação para o field
        if (!validator) {
          return { valido: false, erro: 'Esquema de validação não encontrado para o campo especificado.' };
        }
        try {
          const valueValidado = await this.validateField(validator, value);;
          return { valido: true, value: String(valueValidado), erro: undefined }; // Retorno válido
        } catch (error) {
          if (error instanceof z.ZodError) {
            const mensagemErro = error.errors[0].message; 
            return { valido: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
          } else {
            return { valido: false, erro: 'Erro desconhecido ao validar o texto' };
          }
        }
      }
        confirmarSenha(senha: string, confirmsenha: string) {
            try {
                const valconf = z.literal(senha).parse(confirmsenha)
                return { valido: true, value: valconf }; // Retorno válido
            } catch (error) {
              if (error instanceof z.ZodError) {
                const mensagemErro = error.errors[0].message; 
                return { valido: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
              } else {
                return { valido: false, erro: 'Erro desconhecido ao validar o texto' };
              }

        }
    }
        validarUser(user: User) {
            try {
                const valuser = this.UserSchema.parse(user)
            return { valido: true, value: valuser }; // Retorno válido
        } catch (error) {
          if (error instanceof z.ZodError) {
            const mensagemErro = error.errors[0].message; 
            return { valido: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
          } else {
            return { valido: false, erro: 'Erro desconhecido ao validar o texto' };
          }

        }
        }
    }