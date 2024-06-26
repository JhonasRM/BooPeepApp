import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { StateAndSetters } from "../../utils/Interfaces/UserStateAndSetters";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import SetOnStorage from "../../Data Access/Storage/SetOnStorage";
import UserPersistence from "../../Service/Persistence/UserPersistence";

const LoginStateController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validator: userValidator = new userValidator();
  const uRepository: userRepository = new userRepository();

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
    },
    course: function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    },
    SchoolShift: function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    }
  };

  const handleFieldChange = async (field: string, value: string): Promise<IReturnAdapter> => {
    try {
      if (field in setState) {
        setState[field as keyof StateAndSetters](value);
        const valfield = await validator.valByField(field, value);
        if (valfield.val === false) {
          throw new Error(valfield.erro as string);
        }
        return { val: true, data: "Validação concluída" }
      } 
      throw new Error(`Campo "${field}" não é uma chave válida em StateAndSetters.`);
    } catch (error) {
        if(error instanceof Error){
          return {val: false, erro: error.message}
        }      
        return { val: false, erro: `Erro interno da aplicação: ${error}`}
    }
    
  };


  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<IReturnAdapter> => {
    try {
      if( email === '' || password === ''){
        return { val: false, erro: `Preencha todos os campos para realizar o login.`}
      }
      const req = await uRepository.login(email, password);
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      console.log('Usuário Logado com sucess')
      console.log('Coletando informações do usuário...')
      const getUser = await uRepository.getUser(email, password)
      if (getUser.val === false) {
        throw new Error(req.erro as string);
      }
      const foundUser = getUser.data
      SetOnStorage("name", foundUser.displayName)
      SetOnStorage("email", foundUser.email)
      SetOnStorage("uid", foundUser.uid)
      SetOnStorage("chatID", foundUser.chatID)
      const newUser = new User({
        displayName: foundUser.displayName,
        email: foundUser.email,
        uid: foundUser.uid,
        postID: foundUser.uid,
        chatID: foundUser.chatID
      })
      const MyUser = UserPersistence.getInstance()
      MyUser.setUser(newUser)
      return { val: true, data: 'Usuário Logado com sucesso' };
    } catch (error) {
      if (error instanceof Error) {
          return { val: false, erro: error };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  };
  

  return {
    email,
    password,
    handleFieldChange,
    handleLogin
  };
};

export { LoginStateController };
