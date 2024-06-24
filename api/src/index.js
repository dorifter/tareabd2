import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';


//const app = new Elysia();
const prisma = new PrismaClient();

// Endpoint para registrar un usuario
const app = new Elysia().decorate('db', prisma)


/*/
test para registrar funciona pero no está completo

  .post('/api/test', async({db,body}) => { 
    
    const newUser = await db.user.create({
      data: {
        nombre:body.nombre,
        email:body.correo,
        clave:body.clave,
        descripcion:body.descripcion
      }
    })
    return newUser
  })


{
  "nombre": "Alberto",
  "email": "@@@@@",
  "clave":"claveunica",
  "descripicion":"descripicion"
}
/*/


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


/*/

test para bloquear
bloquea al usuario por el id pero solo puede bloquear uno cada usuario
funciona pero no está completo
  .post('/api/test2', async({db,body}) => { 
    const usuario = await db.user.findUnique({where:{email:body.correo}})
    const newBloq = await db.bloqueados.create({
      data: {
        usuario_id:usuario.id,
        direccion_bloqueada:body.correo_bloquear
      }
    })
    return newBloq
  })



{
  "email": "abbb",
  "clave": "@asasds@@@@",
  "correo_bloquear":"abbb"
}
/*/

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
        usuario: usuario.id,
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

//Endpoint saca el correo de la url y te da el usuario
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


  app.post("/api/autenticar", async({body,db }) => {

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



//endpoint favoritos

  .post('/api/marcarcorreo', async({db,body}) => { 
    const usuario = await db.user.findUnique({where:{email:body.email}})
    const newBloq = await db.favoritos.create({
      data: {
        usuario:usuario.id,
        direccion_favorita:body.id_correo_favorito,
        direccion_usuario:usuario.email
      }
    })
    return newBloq
  })


  .delete('/api/desmarcarcorreo', async({db,body}) => {
    const id_favorito = await db.user.findFirst({where:{id:parseInt(body.id_correo_favorito)}})
    const id_favorito2 = await db.favoritos.findFirst({where:{direccion_favorita:id_favorito.email}})
    const id = id_favorito2.id
    return db.favoritos.delete({where:{id}})
    //return db.favoritos.delete({where:{id:id_favorito2.id}})
  })



    .listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
