import bcrypt from 'bcrypt';

import crypto from 'crypto'; // Añade esta línea si no la tienes
export class Usuario {

    //guardamos cada valor en la variable  genera un __Id
    constructor ({username , password , email}){
        this._id = crypto.randomUUID()
        this.email = email
        this.username = username
        this.password = password
        this.createdAt = new Date().toISOString();
    }


   static validamos (data) {
  
    //validamos que se cumplan estos requisitos 
        if(!data.username || data.username.length < 3) throw new Error ('El nombre de usuario es muy corto');
        if(!data.password || data.password.length < 8) throw new Error ('Contraseña demasiado corta');
    // si no incumple retorna verdad (true) 

   }


   async encryptPass() {
    //generamos ruido
    const salt = await bcrypt.genSalt(8);
    // Cambiamos hashSync por hash para aprovechar el await correctamente
    this.password = await bcrypt.hash(this.password, salt);
}

}