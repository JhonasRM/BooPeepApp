import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/types/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";

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

  const handleFieldChange = async (field: string, value: string): Promise<{ valido: boolean, value: number, error?: string | Error}> => {
    console.log(`validando ${field} ...`);
    if (field in setState) {
      setState[field as keyof StateAndSetters](value);
      const valfield = await validator.valByField(field, value);
      if (valfield.valido === false) {
        console.log(valfield.erro);
        return { valido: false, value: 401, error: valfield.erro}
      }
      console.log("validação concluída");
      return { valido: true, value: 200}
    } 
      console.error(
        `Campo "${field}" não é uma chave válida em StateAndSetters.`
      );
      return { valido: false, value: 400, error: `Campo "${field}" não é uma chave válida em StateAndSetters.`}
    
  };

  const handleResetRequest = async (
    email: string
  ): Promise<{
    valido: boolean;
    value?: number;
    error?: string | Error;
    data?: string;
  }> => {
    try {
      const req = await UserService.resetPwd(email);
      if (req.valido === false) {
        throw new Error("Bad Request");
      }
      return { valido: true, value: 201, data: req.data };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          return { valido: false, value: 401, error: error };
        } else if (error.message === "Bad Request") {
          return { valido: false, value: 400, error: error };
        }
      }
      return { valido: false, value: 500, error: "Internal Server Error" };
    }
  };

  return {
    email,
    handleFieldChange,
    handleResetRequest
  };
};

export { RedefinirStateController };
