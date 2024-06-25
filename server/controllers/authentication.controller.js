import pool from "../config/db.js";
//npm install bcryptjs jsonwebtoken
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login= async(req,res) =>{{
try {
    const {email,password} = req.body;
    //revisar si estan el email y contraseña
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }
    //SQL para elegir el email y encontrar el usuario porque el se registra
    //con su email entonces para hacer el login debemos pedir el email >:c
    const text = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(text, values);

    //Si no encuentro al usuario hay que avisar
    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
      const user = result.rows[0];

      // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Enviar respuesta exitosa con el token
    res.status(200).json({ msg: 'Login exitoso', token });

} catch (error) {
    res.status(500).json({ error: error.message, msg: 'Error al iniciar sesión' });
}
}}

async function register(req,res){
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email){
      return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
    }
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
    if(usuarioAResvisar){
      return res.status(400).send({status:"Error",message:"Este usuario ya existe"})
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password,salt);
    const nuevoUsuario ={
      user, email, password: hashPassword
    }
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({status:"ok",message:`Usuario ${nuevoUsuario.user} agregado`,redirect:"/"})
  }

export const methods = {
    login,
    register
}