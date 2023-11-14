export class User {
    firstName: String = '';
    lastName: String = '';
    birthDate: Number = 0;
    street: String = '';
    city: String = '';
    zipCode: Number = 0;

    constructor(obj?: any){
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.city = obj ? obj.city: '';
        this.zipCode = obj ? obj.zipCode : '';
    }

   public toJsonUser(){
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          street: this.street,
          city: this.city,
          zipCode: this.zipCode,
        }
      }
}

