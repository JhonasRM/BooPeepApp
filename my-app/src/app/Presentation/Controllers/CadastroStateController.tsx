import { useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/types/Interfaces/StateAndSetters";
import { User } from "../../Service/Entities/userEntities";

class CadastroStateController {
  private setState: StateAndSetters;
  private validator: userValidator;
  private UserService: userService;

  public nome: string;
  public sobrenome: string;
  public email: string;
  public password: string;
  public confirmarSenha: string;
  public erro;

  public setNome: React.Dispatch<React.SetStateAction<string>>;
  public setSobrenome: React.Dispatch<React.SetStateAction<string>>;
  public setEmail: React.Dispatch<React.SetStateAction<string>>;
  public setPassword: React.Dispatch<React.SetStateAction<string>>;
  public setConfirmarSenha: React.Dispatch<React.SetStateAction<string>>;
  public setErro;

  constructor() {
    [this.nome, this.setNome] = useState("");
    [this.sobrenome, this.setSobrenome] = useState("");
    [this.email, this.setEmail] = useState("");
    [this.password, this.setPassword] = useState("");
    [this.confirmarSenha, this.setConfirmarSenha] = useState("");
    [this.erro, this.setErro] = useState<Error>();

    this.validator = new userValidator();
    this.UserService = new userService();

    this.setState = {
      nome: this.setNome,
      sobrenome: this.setSobrenome,
      email: this.setEmail,
      password: this.setPassword,
      confirmarSenha: this.setConfirmarSenha,
    };
  }

  async handleFieldChange(field: string, value: string) {
    console.log(`validando ${field} ...`);
    if (field in this.setState) {
      this.setState[field as keyof StateAndSetters](value);
    } else {
      console.error(
        `Campo "${field}" não é uma chave válida em StateAndSetters.`
      );
    }
    const valfield = await this.validator.valByField(field, value)
    if (valfield.valido === false) {
      console.log(valfield.erro);
    }
    console.log("validação concluída");
  }

  handleConfirmarSenhaChange(senha: string, confirmsenha: string) {
    this.setConfirmarSenha(confirmsenha);
    const valconf = this.validator.confirmarSenha(senha, confirmsenha);
    if (valconf.valido === false) {
      console.log(valconf.erro as string);
    }
    console.log("validação concluída");
  }

  handleCadastro(
    nome: string,
    sobrenome: string,
    email: string,
    password: string,
    confirmarSenha: string
  ) {
    const user: User = new User(
      nome,
      sobrenome,
      email,
      password,
      confirmarSenha
    );
    const validacao = this.validator.validarUser(user);
    if (validacao.valido === false) {
      console.log(validacao.erro as string)
    } else {
      try {
        this.UserService.cadastro(user);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export const cadastroStateController = new CadastroStateController()