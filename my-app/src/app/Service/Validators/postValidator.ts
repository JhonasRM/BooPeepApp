//TEM QUE FAZER O descriptionValCheck E O valByField ESTAREM JUNTOS POIS É SÓ UM UNICO CAMPO!
import { z } from "zod";

export class postValidator {
    private postValByField: { [key: string]: z.ZodString }

    constructor() {
        this.postValByField = {
            //title: z.string().regex(/.+/, 'Preencha esse campo!')
            //.regex(/[a-zA-z]/, 'Esse campo precisa ter no minimo letras!')
            description: 
            z.string().min(
                1, 
                'Preencha esse campo!'
            ).regex(
                /[a-zA-z]/, 
                'Esse campo precisa ter no minimo letras!'
            )
        }
    }

    private async validateField(validator: z.ZodString, value: string): Promise<string> {
        console.log(`validateField: ${validator}, ${value}`)  
        return await validator.parseAsync(value);
    }

    async valByField(field: string, value: string): Promise<{valido: boolean, value?: string, erro?: string}> {
        console.log("-----postValidator.valByField()-----")
        console.log("valByField rodou!")
        console.log(`field: ${field}, value: ${value}`)
        
        // if(field === 'description' /* | field === 'title' */){
        //     return { valido: true, value: 'ok', erro: undefined };
        // }
        
        const validator = this.postValByField[field]; // Obtém o esquema de validação para o field
        
        if (!validator) {
            return { valido: false, erro: 'Esquema de validação não encontrado para o campo especificado.' };
        }

        try {
            const valueValidado = await this.validateField(validator, value);;
            console.log("valByField respondeu!")

            return { valido: true, value: String(valueValidado), erro: undefined }; // Retorno válido    
        } catch (error) {
            if (error instanceof z.ZodError) {
                const mensagemErro = error.errors[0].message; 
                console.log("valByField error: instanceof z.ZodError")
                
                return { valido: false, erro: mensagemErro }; // Retorno inválido com mensagem de erro do Zod
            } else {
                console.log("valByField error: Unknown")
                
                return { valido: false, erro: 'Erro desconhecido ao validar o texto' };
            }
        }   
    }

    //Verifica se a descrição é valida:
    // descriptionValCheck(description: string, checkdescription: string) {
    //     console.log("descriptionValCheck rodou!")
    //     try {
    //         const valconf = z.literal(description).parse(checkdescription);
    //         return {valido: true, value: valconf};
    //     } catch (error) {
    //         console.log(description) // Somente 'description'
    //         console.log(checkdescription) // Valor no TextInput
    //         if (error instanceof z.ZodError) {
    //             const mensagemErro = error.errors[0].message;
    //             console.log("postValidator Error: instanceof z.ZodError")
    //             return {valido: false, erro: mensagemErro};
    //         } else {
    //             console.log("postValidator Error: Unknown")
    //             return {valido: false, erro: 'Erro desconhecido ao validar o texto'};
    //         }
    //     }
    // }
}
