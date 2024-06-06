import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

const CadastroStateController = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const validator: userValidator = new userValidator();
  const UserService: userService = new userService();

  const setState: StateAndSetters = {
    nome: setNome,
    sobrenome: setSobrenome,
    email: setEmail,
    password: setPassword,
    confirmarSenha: setConfirmarSenha
  };

  const handleFieldChange = async (field: string, value: string): Promise<IReturnAdapter> => {
    if (field in setState) {
      setState[field as keyof StateAndSetters](value);
      const valfield = await validator.valByField(field, value);
      if (valfield.val === false) {
        console.log(valfield.erro);
        return { val: false,  erro: valfield.erro}
      }
      return { val: true, data: "Validação concluída" }
    } 
      console.error(
        `Campo "${field}" não é uma chave válida em StateAndSetters.`
      );
      return { val: false, erro: `Campo "${field}" não é uma chave válida em StateAndSetters.`}
    
  };

  const handleConfirmarSenhaChange = async (
    senha: string,
    confirmsenha: string
  ): Promise<IReturnAdapter>=> {
    setConfirmarSenha(confirmsenha);
    const valconf = await validator.confirmarSenha(senha, confirmsenha);
    if (valconf.val === false) {
      return { val: false,  erro: "As senhas não coincidem" };
    }
    return { val: true, data: "validação concluída"};
  };

  const handleCadastro = async (
    nome: string,
    sobrenome: string,
    email: string,
    password: string,
    confirmarSenha: string
  ): Promise<IReturnAdapter> => {
    if( email === '' || password === '' || nome === '' || sobrenome === '' || confirmarSenha === ''){
      return { val: false, erro: `Preencha todos os campos para realizar o cadastro.`}
    }
    const user: User = new User(
      nome,
      sobrenome,
      email,
      password,
      confirmarSenha
    );
    try {
      console.log(user);
      const req = await UserService.cadastro(user);
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      return { val: true, data: req.data };
    } catch (error) {
      if (error instanceof Error) {
          return { val: false, erro: error.message };
        }
      
      return { val: false, erro: "Internal Server Error" };
    }
  };

  return {
    nome,
    sobrenome,
    email,
    password,
    confirmarSenha,
    handleFieldChange,
    handleConfirmarSenhaChange,
    handleCadastro,
  };
};

export { CadastroStateController };