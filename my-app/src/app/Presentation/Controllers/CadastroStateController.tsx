import { useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/types/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";

const CadastroStateController = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState<Error>();

  const validator: userValidator = new userValidator();
  const UserService: userService = new userService();

  const setState: StateAndSetters = {
    nome: setNome,
    sobrenome: setSobrenome,
    email: setEmail,
    password: setPassword,
    confirmarSenha: setConfirmarSenha,
  };

  const handleFieldChange = async (field: string, value: string) => {
    console.log(`validando ${field} ...`);
    if (field in setState) {
      setState[field as keyof StateAndSetters](value);
      const valfield = await validator.valByField(field, value);
      if (valfield.valido === false) {
        console.log(valfield.erro);
      }
      console.log("validação concluída");
    } else {
      console.error(
        `Campo "${field}" não é uma chave válida em StateAndSetters.`
      );
    }
  };

  const handleConfirmarSenhaChange = (senha: string, confirmsenha: string) => {
    setConfirmarSenha(confirmsenha);
    const valconf = validator.confirmarSenha(senha, confirmsenha);
    if (valconf.valido === false) {
      console.log(valconf.erro as string);
    }
    console.log("validação concluída");
  };

  const handleCadastro = async (
    nome: string,
    sobrenome: string,
    email: string,
    password: string,
    confirmarSenha: string
  ): Promise<{
    valido: boolean;
    value?: number;
    error?: string | Error;
    data?: User;
  }> => {
    const user: User = new User(
      nome,
      sobrenome,
      email,
      password,
      confirmarSenha
    );
    try {
      console.log(user);
      // const validacao = await validator.validarUser(user);
      // if (validacao.valido === false) {
      //   console.log(validacao.erro);
      //   throw new Error("Unauthorized");
      // }
      const req = await UserService.cadastro(user);
      if (req.valido === false) {
        throw new Error("Bad Request");
      }
      return { valido: true, value: 201, data: user };
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
    nome,
    sobrenome,
    email,
    password,
    confirmarSenha,
    erro,
    handleFieldChange,
    handleConfirmarSenhaChange,
    handleCadastro,
  };
};

export { CadastroStateController };
