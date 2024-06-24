import pool from "../config/db.js";
//npm install bcryptjs jsonwebtoken
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) =>{
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
};

export { loginUser };