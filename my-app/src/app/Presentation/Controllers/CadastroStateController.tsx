import { useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { User } from "../../Service/Entities/UserEntitie";
import { StateAndSetters } from "../../utils/types/StateAndSetters";
const [nome, setNome] = useState('');
const [sobrenome, setSobrenome] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmarSenha, setConfirmarSenha] = useState('');
const [erro, setErro] = useState<Error>();
const validator = new userValidator();
const UserService = new userService();

// Criando o objeto que mapeia cada campo para sua função de atualização
const setState: StateAndSetters = {
  nome: setNome,
  sobrenome: setSobrenome,
  email: setEmail,
  password: setPassword,
  confirmarSenha: setConfirmarSenha
};
export function CadastroStateController(){
const handleFieldChange = async (field: string, value: string) => {
  console.log(`validando ${field} ...`);
  if (field in setState) {
    setState[field as keyof StateAndSetters](value); // Usando o campo para acessar a função de atualização correspondente
  } else {
    console.error(`Campo "${field}" não é uma chave válida em StateAndSetters.`);
  }
  const valfield = await validator.valByField(field, value)
  if(valfield.valido === false){
    setErro(valfield.erro as unknown as Error)
    console.log(valfield.erro)
  }
  console.log('validação concluída')
};

  const handleConfirmarSenhaChange = (senha: string, confirmsenha: string) => {
    setConfirmarSenha(confirmsenha);
    const valconf = validator.confirmarSenha(senha, confirmsenha);
    if (valconf.valido === false) {
      setErro(valconf.erro as unknown as Error);
      console.log(valconf.erro)
    } 
    console.log('validação concluída')
  };

  const handleCadastro = (nome:string, sobrenome: string, email: string, password: string, confirmarSenha:string) => {
    const user: User = new User(nome, sobrenome, email, password, confirmarSenha);
    const validacao = validator.validarUser(user);
    if (validacao.valido === false) {
      setErro(validacao.erro as unknown as Error);
    } else {
      try {
        UserService.cadastro(user);
      } catch (error) {
        console.error(error);
      }
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
}