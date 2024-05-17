export interface StateAndSetters {
  nome: React.Dispatch<React.SetStateAction<string>>;
  sobrenome: React.Dispatch<React.SetStateAction<string>>;
  email: React.Dispatch<React.SetStateAction<string>>;
  password: React.Dispatch<React.SetStateAction<string>>;
  confirmarSenha: React.Dispatch<React.SetStateAction<string>>;
  redefinirSenha: React.Dispatch<React.SetStateAction<string>>;
}
