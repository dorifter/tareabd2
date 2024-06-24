import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';


//const app = new Elysia();
const prisma = new PrismaClient();

// Endpoint para registrar un usuario
const app = new Elysia().decorate('db', prisma)
  .post('/api/registrar', async ({req, res}) => {
    const { nombre, correo, clave, descripcion } = req.body;

    try {
    // Verificar si el usuario ya existe en la base de datos
      const usuarioExistente = await bd.user.findUnique({ where: { email: correo } });

      if (usuarioExistente) {
        return res.send({ estado: 400, mensaje: 'El usuario ya está registrado' });
      }

    // Crear nuevo usuario
        const nuevoUsuario = await bd.user.create({
        data: {
          nombre,
          correo,
          clave,
          descripcion: descripcion || null // descripción opcional
        } 
      });

      console.log(`[${new Date().toLocaleTimeString()}] Se ha registrado el usuario: ${correo} de forma correcta`);
      res.send({ estado: 200, mensaje: 'Usuario registrado correctamente' });

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send({ estado: 400, mensaje: 'Ha existido un error al realizar la petición' });
    }
  })



  .post('/api/test', async({db,body}) => { 
    const usuarioExistente = await db.user.findUnique({ where: { email: body.correo } });
    if (usuarioExistente) {
      return console.log("usuario ocupado");
    }
    const newUser = await db.user.create({
      data: {
        nombre:body.nombre,
        email:body.correo,
        clave:body.clave,
        descripcion:body.descripcion
      }
    })
    console.log('Usuario creado:'   , newUser)
  })





// Endpoint para bloquear un usuario
  .post('/api/bloquear', async (req, res) => {
    const { correo, clave, correo_bloquear } = req.body;

    try {
      const usuario = await prisma.user.findUnique({ where: { email: correo } });

      if (!usuario || usuario.clave !== clave) {
        return res.send({ estado: 400, mensaje: 'Credenciales incorrectas' });
      }

    // Crear registro de bloqueo
      await prisma.bloqueados.create({
        data: {
          usuario_id: usuario.id,
          direccion_bloqueada: correo_bloquear
        }
      });

      console.log(`[${new Date().toLocaleTimeString()}] El usuario ${correo} ha bloqueado a ${correo_bloquear}`);
      res.send({ estado: 200, mensaje: 'Usuario bloqueado correctamente' });

    } catch (error) {
      console.error('Error al bloquear usuario:', error);
      res.status(500).send({ estado: 400, mensaje: 'Ha existido un error al realizar la petición' });
    }
  })

// Endpoint para obtener información pública de un usuario
  .get('/api/informacion/:correo', async (req, res) => {
    const { correo } = req.params;

    try {
      const usuario = await prisma.user.findUnique({ where: { email: correo } });

      if (!usuario) {
        return res.send({ estado: 400, mensaje: 'Usuario no encontrado' });
      }

      res.send({
        estado: 200,
        nombre: usuario.nombre,
        correo: usuario.email,
        descripcion: usuario.descripcion || ''
      });

    } catch (error) {
      console.error('Error al obtener información de usuario:', error);
      res.status(500).send({ estado: 400, mensaje: 'Ha existido un error al realizar la petición' });
    }
  })

// Endpoint para marcar un correo como favorito

  .post('/api/marcarcorreo', async (req, res) => {
    const { correo, clave, id_correo_favorito } = req.body;

    try {
      const usuario = await prisma.user.findUnique({ where: { email: correo } });

      if (!usuario || usuario.clave !== clave) {
        return res.send({ estado: 400, mensaje: 'Credenciales incorrectas' });
      }

    // Aquí debes implementar la lógica para marcar el correo como favorito
      console.log(`[${new Date().toLocaleTimeString()}] El correo con ID ${id_correo_favorito} ha sido marcado como favorito`);
      res.send({ estado: 200, mensaje: 'Correo marcado como favorito correctamente' });

    } catch (error) {
      console.error('Error al marcar correo como favorito:', error);
      res.status(500).send({ estado: 400, mensaje: 'Ha existido un error al realizar la petición' });
    }
  })

// Endpoint para desmarcar un correo como favorito

  .delete('/api/desmarcarcorreo', async (req, res) => {
    const { correo, clave, id_correo_favorito } = req.body;

    try {
      const usuario = await prisma.user.findUnique({ where: { email: correo } });

      if (!usuario || usuario.clave !== clave) {
        return res.send({ estado: 400, mensaje: 'Credenciales incorrectas' });
      }

    // Aquí debes implementar la lógica para desmarcar el correo como favorito
      console.log(`[${new Date().toLocaleTimeString()}] El correo con ID ${id_correo_favorito} ha sido desmarcado como favorito`);
      res.send({ estado: 200, mensaje: 'Correo desmarcado como favorito correctamente' });

    } catch (error) {
      console.error('Error al desmarcar correo como favorito:', error);
      res.status(500).send({ estado: 400, mensaje: 'Ha existido un error al realizar la petición' });
    }
  })


    .listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
