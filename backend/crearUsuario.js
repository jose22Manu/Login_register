// import bcrypt from 'bcrypt';
import pkg from 'db-local';
// import jwt from 'jsonwebtoken';
import { Usuario } from './User.js';
const LocalDB = pkg; // asigno Pkg a una variable local


// creo el directorio de la Data Base !
const { Schema } = new LocalDB({path : './db'})
// genero la estructura del User 
export const UserSchema = Schema('User' , {

    _id : {type : String , required : true},
    email : {type : String , required : true} ,
    username:  {type : String , required : true} ,
    password : {type : String , required : true}
})

// esquema del usuario = ^




export  const  CreateNewUser = async  (userData) =>  {



    //El argumento que espera es un Objeto o diccionario json

    try{

        const { username, email } = userData;

        // 2. BUSCAR DUPLICADOS usando los métodos de db-local
        // db-local devuelve un objeto si lo encuentra, o undefined si no
        const existeNombre = UserSchema.findOne(u => u.username === username);
        const existeEmail = UserSchema.findOne(e => e.email === email);

        // 3. Si alguno existe, lanzamos el error
        if (existeNombre) throw new Error("El nombre de usuario ya existe");
        console.log('Nombre que existe : ' , existeNombre)
        if (existeEmail) throw new Error("El correo electrónico ya existe");

        // 4. Si todo está bien, instanciamos y encriptamos
        const nuevoUsuario = new Usuario(userData);
        await nuevoUsuario.encryptPass();

    //con la informacion recogida construimos usuario y guardamos en db-local
    UserSchema.create({
        _id : nuevoUsuario._id,
        email : nuevoUsuario.email,
        username : nuevoUsuario.username , 
        password : nuevoUsuario.password,
    }).save();

    // crea y guarda 



    return nuevoUsuario




    }catch(error){

        console.error("Error en validacion" , error.message)

        throw error;

    }

   



}
