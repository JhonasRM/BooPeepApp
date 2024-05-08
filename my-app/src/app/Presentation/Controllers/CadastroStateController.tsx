import { useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/types/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";

 const CadastroStateController = () => {
 
   const [nome, setNome] = useState("");
   const [sobrenome, setSobrenome] = useState("");
   const [email, setEmail] = useState("");
   const  [password, setPassword] = useState("");
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

  const handleFieldChange = async(field: string, value: string) => {
    console.log(`validando ${field} ...`);
    if (field in setState) {
      setState[field as keyof StateAndSetters](value);
      const valfield = await validator.valByField(field, value)
    if (valfield.valido === false) {
      console.log(valfield.erro);
    }
    console.log("validação concluída");
    } else {
      console.error(
        `Campo "${field}" não é uma chave válida em StateAndSetters.`
      )    
    }
  }

  const handleConfirmarSenhaChange = (senha: string, confirmsenha: string) => {
    setConfirmarSenha(confirmsenha);
    const valconf = validator.confirmarSenha(senha, confirmsenha);
    if (valconf.valido === false) {
      console.log(valconf.erro as string);
    }
    console.log("validação concluída");
  }

  const handleCadastro = async (
    nome: string,
    sobrenome: string,
    email: string,
    password: string,
    confirmarSenha: string
  ) => {
    const user: User = new User(
      nome,
      sobrenome,
      email,
      password,
      confirmarSenha
    );
    const validacao = validator.validarUser(user);
    if (validacao.valido === false) {
      console.log(validacao.erro as string)
    } else {
      try {
        const req = await UserService.cadastro(user)
        console.log(req)
      } catch (error) {
        console.error(error);
      }
    }
  }

  return({
    nome,
    sobrenome,
    email,
    password,
    confirmarSenha,
    erro,
    handleFieldChange,
    handleConfirmarSenhaChange,
    handleCadastro,
  })
}

export { CadastroStateController }