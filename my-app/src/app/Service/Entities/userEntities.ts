export class User{
    public  name: string;
    public email: string;
    public password: string;
    constructor(name: string, sobrenome: string, email: string,  password: string, confirmPassword: string){
        this.name = `${name} ${sobrenome}`,
        this.email = email,
        this.password = password
        
    }
}