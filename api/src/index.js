import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const app = new Elysia().decorate('db', prisma)


  .post('/api/registrar', async({db,body}) => {
    try {
      const usuarioExistente = await db.user.findUnique({
        where: { email: body.email }
      });
  
      if (usuarioExistente) {
        return {
          estado: 400,
          mensaje: "El correo electrónico ya está registrado."
        };
      }
  
      const newUser = await db.user.create({
        data: {
          nombre: body.nombre,
          email: body.email,
          clave: body.clave,
          descripcion: body.descripcion
        }
      });
  
      console.log('Usuario creado:', newUser.email);
      return {
        estado: 200,
        mensaje: "Usuario registrado correctamente."
      };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return {
        estado: 400,
        mensaje: "Ha ocurrido un error al registrar el usuario."
      };
    }
  
  })



.post('/api/bloquear', async({db,body}) => { 
  try {
    const usuario = await db.user.findUnique({
      where: { email: body.email }
    });
    if (!usuario) {
      return {
        estado: 400,
        mensaje: "El usuario no existe."
      };
    }

    if (usuario.clave !== body.clave) {
      return {
        estado: 401,
        mensaje: "Credenciales incorrectas."
      };
    }

    const usuarioBloquear = await db.user.findUnique({
      where: { email: body.correo_bloquear }
    });

    if (!usuarioBloquear) {
      return {
        estado: 400,
        mensaje: "El correo a bloquear no existe."
      };
    }

    const bloqueoExistente = await db.bloqueados.findFirst({
      where: { direccion_bloqueada: body.correo_bloquear }
    });

    if (bloqueoExistente) {
      return {
        estado: 400,
        mensaje: "El correo ya está bloqueado."
      };
    }

    const newBloq = await db.bloqueados.create({
      data: {
        usuario_id: usuario.id,
        direccion_bloqueada: body.correo_bloquear,
        direccion_usuario: body.email  
      }
    });

    console.log('Usuario bloqueado:', newBloq);
    return {
      estado: 200,
      mensaje: "Usuario bloqueado correctamente.",
      bloqueado: newBloq
    };
  } catch (error) {
    console.error('Error al bloquear usuario:', error);
    return {
      estado: 400,
      mensaje: "Ha ocurrido un error al bloquear el usuario."
    };
  }
})


  .get('/api/:correo', async({ params: { correo },db }) => {
    let usuario = await db.user.findUnique({where: {email:correo}})
    if (!usuario) {
      return {
        estado: 404,
        mensaje: 'Usuario no encontrado'
      };
    }
    let mostrar = {
      estado: 200,
      nombre: usuario.nombre,
      email: usuario.email,
      descripcion: usuario.descripcion
    }
    return mostrar
  })


  app.post("/api/autenticar", async({db, body }) => {

    try {
      const usuario = await db.user.findUnique({
        where: { email: body.email }
      });
  
      if (usuario && usuario.clave === body.clave) {
        return {
          estado: 200,
          mensaje: "Autenticación exitosa",
          usuario: usuario.email
        };
      } else {
        return {
          estado: 401,
          mensaje: "Credenciales incorrectas"
        };
      }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      return {
        estado: 400,
        mensaje: "Ha ocurrido un error al autenticar el usuario"
      };
    }
  })


  app.post('/api/marcarcorreo', async ({ db, body }) => {
    try {
      const usuario = await db.user.findUnique({ where: { email: body.email } });
  
      if (!usuario) {
        return {
          estado: 404,
          mensaje: "Usuario no encontrado."
        };
      }
  
      const correoFavorito = await db.user.findUnique({ where: { email: body.id_correo_favorito } });
  
      if (!correoFavorito) {
        return {
          estado: 404,
          mensaje: "Correo a marcar como favorito no encontrado."
        };
      }
  
      const newFavorito = await db.favoritos.create({
        data: {
          usuario: usuario.id,
          direccion_favorita: body.id_correo_favorito,
          direccion_usuario: usuario.email
        }
      });
  
      return {
        estado: 200,
        mensaje: "Correo marcado como favorito correctamente.",
        favorito: newFavorito
      };
    } catch (error) {
      console.error('Error al marcar correo como favorito:', error);
      return {
        estado: 400,
        mensaje: "Ha ocurrido un error al marcar el correo como favorito."
      };
    }
  })

  .delete('/api/desmarcarcorreo', async ({ db, body }) => {
  try {
    const correoFavorito = await db.user.findFirst({ where: { email: body.id_correo_favorito } });

    if (!correoFavorito) {
      return {
        estado: 404,
        mensaje: "Correo favorito no encontrado."
      };
    }

    const favorito = await db.favoritos.findFirst({ where: { direccion_favorita: correoFavorito.email } });

    if (!favorito) {
      return {
        estado: 404,
        mensaje: "Correo favorito no encontrado en la lista de favoritos."
      };
    }

    const deletedFavorito = await db.favoritos.delete({ where: { id: favorito.id } });

    return {
      estado: 200,
      mensaje: "Correo desmarcado como favorito correctamente.",
      favorito: deletedFavorito
    };
  } catch (error) {
    console.error('Error al desmarcar correo como favorito:', error);
    return {
      estado: 400,
      mensaje: "Ha ocurrido un error al desmarcar el correo como favorito."
    };
  }
})

  .get('/api/favoritos', async ({ db, query }) => {
    try {
      const { email } = query;
      
      const usuario = await db.user.findUnique({
        where: { email: email },
      });
      
      if (!usuario) {
        return {
          estado: 404,
          mensaje: 'Usuario no encontrado',
        };
      }
  
      const favoritos = await db.favoritos.findMany({
        where: { usuario: usuario.id },
      });
  
      return {
        estado: 200,
        favoritos: favoritos.map(f => f.direccion_favorita),
      };
    } catch (error) {
      console.error('Error al obtener correos favoritos:', error);
      return {
        estado: 400,
        mensaje: 'Ha ocurrido un error al obtener los correos favoritos',
      };
    }
  })

  
  .listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
