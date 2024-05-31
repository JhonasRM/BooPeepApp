import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

const RedefinirStateController = () => {
  const [email, setEmail] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const validator: userValidator = new userValidator();
  const UserService: userService = new userService();

  const setState: StateAndSetters = {
    email: setEmail,
    nome: function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    },
    sobrenome: function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    },
    password: function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    },
    confirmarSenha: function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    }
  };

  const handleFieldChange = async (field: string, value: string): Promise<IReturnAdapter> => {
    try {
      if (field in setState) {
        setState[field as keyof StateAndSetters](value);
        const valfield = await validator.valByField(field, value);
        if (valfield.val === false) {
          console.log(valfield.erro);
          throw new Error(valfield.erro as string)
        }
        return { val: true, data: "Validação concluída"}
      }
      throw new Error(`Campo "${field}" não é uma chave válida em StateAndSetters.`)    
    } catch (error) {
      if(error instanceof Error){
        return { val: false, erro: error.message}
      }
      return{val: false, erro: `Erro interno da aplicação: ${error}`}

    }
    
  };

  const handleResetRequest = async (
    email: string
  ): Promise<IReturnAdapter> => {
    try {
      const req = await UserService.resetPwd(email);
      if (req.val === false) {
        throw new Error("Bad Request");
      }
      return { val: true, data: req.data };
    } catch (error) {
      if (error instanceof Error) {
          return { val: false,  erro: error };
        
      }
      return { val: false, erro: "Internal Server Error" };
    }
  };

  return {
    email,
    handleFieldChange,
    handleResetRequest
  };
};

export { RedefinirStateController };
