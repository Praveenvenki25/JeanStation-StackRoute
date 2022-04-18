export default class User{
    
    userId?: string;
    firstName: string;
    lastName: string;
    contactNumber: number;
    emailAddress: string;
    password: string;
    role?: string;
    constructor(){
        this.userId = "";
        this.firstName = "";
        this.lastName = "";
        this.contactNumber = 0;
        this.emailAddress = "";
        this.password = "";
        this.role = "";

    }


}