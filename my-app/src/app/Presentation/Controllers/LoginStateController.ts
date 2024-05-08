import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/types/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";

const LoginStateController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validator: userValidator = new userValidator();
  const UserService: userService = new userService();

  const setState: StateAndSetters = {
      email: setEmail,
      password: setPassword,
      nome: function (value: SetStateAction<string>): void {
          throw new Error("Function not implemented.");
      },
      sobrenome: function (value: SetStateAction<string>): void {
          throw new Error("Function not implemented.");
      },
      confirmarSenha: function (value: SetStateAction<string>): void {
          throw new Error("Function not implemented.");
      }
  };

  const handleFieldChange = async (field: string, value: string): Promise<{ valido: boolean, value: number, error?: string | Error}> => {
    if (field in setState) {
      setState[field as keyof StateAndSetters](value);
      return { valido: true, value: 200}
    } 
      console.error(
        `Campo "${field}" não é uma chave válida em StateAndSetters.`
      );
      return { valido: false, value: 400, error: `Campo "${field}" não é uma chave válida em StateAndSetters.`}
    
  };


  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<{
    valido: boolean;
    value?: number;
    error?: string | Error;
    data?: User;
  }> => {
    try {
      const req = await UserService.login(email, password);
      if (req.valido === false) {
        throw new Error("Bad Request");
      }
      const user = req.data
      return { valido: true, value: 200, data: user };
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
    password,
    handleFieldChange,
    handleLogin,
  };
};

export { LoginStateController };
