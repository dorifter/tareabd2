Para ejecutar la API:
1. Tener instalado bun
2. Configurar la base de datos en el archivo .env con la variable DATABASE_URL
3. Ejecutar la migración de la base de datos: npx prisma migrate dev
4. Generar la base de datos con: npx prisma generate
4. Iniciar la API: bun run api/src/index.js


Para ejecutar el cliente:
1. Instalar las dependencias: pip install -r requirements.txt
2. Ejecutar el cliente: python3 cliente/cliente.py 
