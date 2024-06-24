import pool from "../config/db.js";
const crearUsuario = async (req, res) => {
    console.log("antes del try");
  try {
    //destructuring the body with the parts the I'm interested to
    const { first_name, last_name, email, password, cellphone } = req.body;
    const text =
      "INSERT INTO usuarios(first_name, last_name, email, password, cellphone) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [first_name, last_name, email, password, cellphone];
    const newUser = await pool.query(text, values);
    console.log(newUser.rows);
    res.status(200).json({msg:"Usuario creado correctamente",result:newUser.rows});
  } catch (error) {
    res.status(500).json({ error: error.message, msg:"error al crear usuario" });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}
//update necesita el id
const updateUser = async (req, res) => {
  try {
    const { id,first_name,last_name,email,password,cellphone} = req.body;
    const text =  
    `UPDATE usuarios
    SET first_name = $2,
        last_name = $3,
        email = $4,
        password = $5,
        cellphone = $6
        WHERE id = $1
        RETURNING *;
        `;
      const values = [id,first_name, last_name, email, password, cellphone];
      const result = await pool.query(text, values);
      console.log(result.rows);
      res.status(200).json({msg:"Usuario actualizado correctamente",result:result.rows});

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ msg: 'Usuario actualizado correctamente', result: result.rows[0] });
      }
      res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: error.message, msg:'Error al actualizar la información del usuario seleccionado :(' });
  }
}
//remove necesita el id
const removeUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Verificar si id es válido
    if (!id) {
      return res.status(400).json({ error: 'ID del usuario es requerido' });
    }

    // Consulta SQL para eliminar el usuario
    const text = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(text, values);

    // Verificar el resultado de la eliminación
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Respuesta exitosa
    return res.status(200).json({ msg: 'Usuario eliminado correctamente', result: result.rows[0] });

  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ error: error.message, msg: 'Error al eliminar el usuario' });
  }
};


export { crearUsuario, getUsers, updateUser, removeUser };
