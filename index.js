import express from 'express'; // Sin el prefijo 'node::'
import { fileURLToPath } from 'url';
import fs from 'fs'
import { dirname } from 'path';
import path from 'node:path';
import {CreateNewUser , UserSchema} from './backend/crearUsuario.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Usuario } from './backend/User.js';
import dbLocal from 'db-local';
import { compareSync } from 'bcrypt';


const app = express()

const secret = process.env.JWT_SECRET;


const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Rutas estáticas corregidas
app.use(express.static(path.join(_dirname, 'public')));

let ruta_pages = path.join(_dirname, 'public/pages')
let ruta_scripts = path.join(_dirname, 'public/scripts')
let rutaStyles = path.join(_dirname, 'public/styles')
// console.log(path.join(_dirname, 'public/pages'))


app.post('/register' ,async  (req , res) => {

try{

    
Usuario.validamos(req.body);
    
   const nuevoUsuario = await CreateNewUser(req.body);
   const token = jwt.sign({_id : nuevoUsuario._id} , secret , {expiresIn : "30m"});

  


    res.status(201).json({
        message : "Usuario registrado con exito" , 
        token : token
    });


}catch(err){

    res.status(400).json({error : err.message})

}

});




app.get('/' , (req , res) => {

    try{

        res.sendFile(ruta_pages + "/index.html")


    }catch(err){

        res.json(400 , {error : err.message})

    }
    
})

app.post('/Login' , async (req , res) => {

    try {

    const {email , password} = req.body;

    // 1. Buscamos al usuario en db-local
        const usuario = UserSchema.findOne(e => e.email === email);

        if (!usuario) {
            return res.status(401).json({ error: "El correo no existe" });
        }

        // 2. Comparamos la contraseña (usando bcrypt)
        const passwordCorrecta = await compareSync(password, usuario.password);

        if (!passwordCorrecta) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign({_id : usuario._id} , secret , {expiresIn : '1h'});


        res.status(200).json({
            message : 'Login Exitoso',
            token : token
        });

        //  window.location.href = 'http://localhost:3000/main' esto no se hace en el servidor
        //lo rompe 

       
    }catch(error){
        console.error(error);
        res.status(500).json({error : 'error del servidor'});

    }

})

app.get('/Login' , (req , res) => {

    res.sendFile(ruta_pages + "/inicio_sesion.html")
})


app.get('/main' , (req, res ) => {
    res.sendFile(ruta_pages + '/main.html')
})


app.listen(3000 , () => {
    console.log(`Escuchando en http://localhost:3000`)
})