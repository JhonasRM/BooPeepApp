import{z} from "zod";
import{Chat} from "../Entities/chatEntities"

export class chatValidator {
    private messageValByField: { [key: string]: z.ZodString }
    constructor(){
        this.messageValByField = {
            lastmsg: z.string().min(1, 'Preencha esse campo!')    
        }
    }

    private async validateField(validator: z.ZodString, value: string): Promise<string> {
        console.log(`validateField: ${validator}, ${value}`)  
        return await validator.parseAsync(value);
    }

    async valByField(field: string, value: string): Promise<{valido: boolean, value?: string, erro?: string}> {
        console.log("-----messageValidator.valByField()-----")
        console.log("valByField rodou!")
        console.log(`field: ${field}, value: ${value}`)
        
        
        const validator = this.messageValByField[field]; 
        
        if (!validator) {
            return { valido: false, erro: 'Esquema de validação não encontrado para o campo especificado.' };
        }

        try {
            const valueValidado = await this.validateField(validator, value);;
            console.log("valByField respondeu!")

            return { valido: true, value: String(valueValidado), erro: undefined };    
        } catch (error) {
            if (error instanceof z.ZodError) {
                const mensagemErro = error.errors[0].message; 
                console.log("valByField error: instanceof z.ZodError")
                
                return { valido: false, erro: mensagemErro }; 
            } else {
                console.log("valByField error: Unknown")
                
                return { valido: false, erro: 'Erro desconhecido ao validar o texto' };
            }
        }   
    }


}