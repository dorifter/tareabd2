import requests

# URL base de la API
BASE_URL = 'http://localhost:3000/api'

def registrar_usuario():
    nombre = input('Ingrese su nombre: ')
    email = input('Ingrese su correo electrónico: ')
    clave = input('Ingrese su contraseña: ')
    descripcion = input('Ingrese una descripción (opcional): ')

    payload = {
        "nombre": nombre,
        "correo": email,
        "clave": clave,
        "descripcion": descripcion
    }

    try:
        response = requests.post(f'{BASE_URL}/registrar', json=payload)
        if response.status_code == 200:
            print('Usuario registrado correctamente.')
        else:
            print(f'Error al registrar el usuario: {response.json()["mensaje"]}')
    except requests.exceptions.RequestException as e:
        print(f'Error de conexión: {e}')

def bloquear_usuario(email, clave):
    correo_bloquear = input('Ingrese el correo del usuario que desea bloquear: ')

    payload = {
        "correo": email,
        "clave": clave,
        "correo_bloquear": correo_bloquear
    }

    try:
        response = requests.post(f'{BASE_URL}/bloquear', json=payload)
        if response.status_code == 200:
            print('Usuario bloqueado correctamente.')
        else:
            print(f'Error al bloquear el usuario: {response.json()["mensaje"]}')
    except requests.exceptions.RequestException as e:
        print(f'Error de conexión: {e}')

def obtener_informacion(email, clave):
    correo = input('Ingrese el correo del usuario del que desea obtener información: ')

    try:
        response = requests.get(f'{BASE_URL}/informacion/{correo}', auth=(email, clave))
        if response.status_code == 200:
            data = response.json()
            print(f'Información del usuario {correo}:')
            print(f'Nombre: {data["nombre"]}')
            print(f'Correo: {data["correo"]}')
            print(f'Descripción: {data["descripcion"]}')
        else:
            print(f'Error al obtener la información del usuario: {response.json()["mensaje"]}')
    except requests.exceptions.RequestException as e:
        print(f'Error de conexión: {e}')

def marcar_correo_favorito(email, clave):
    id_correo_favorito = input('Ingrese el ID del correo que desea marcar como favorito: ')

    payload = {
        "correo": email,
        "clave": clave,
        "id_correo_favorito": id_correo_favorito
    }

    try:
        response = requests.post(f'{BASE_URL}/marcarcorreo', json=payload)
        if response.status_code == 200:
            print('Correo marcado como favorito correctamente.')
        else:
            print(f'Error al marcar el correo como favorito: {response.json()["mensaje"]}')
    except requests.exceptions.RequestException as e:
        print(f'Error de conexión: {e}')

def desmarcar_correo_favorito(email, clave):
    id_correo_favorito = input('Ingrese el ID del correo que desea desmarcar como favorito: ')

    payload = {
        "correo": email,
        "clave": clave,
        "id_correo_favorito": id_correo_favorito
    }

    try:
        response = requests.delete(f'{BASE_URL}/desmarcarcorreo', json=payload)
        if response.status_code == 200:
            print('Correo desmarcado como favorito correctamente.')
        else:
            print(f'Error al desmarcar el correo como favorito: {response.json()["mensaje"]}')
    except requests.exceptions.RequestException as e:
        print(f'Error de conexión: {e}')

def menu(email, clave):
    while True:
        print(f'Bienvenido, {email}!')
        print('Menú de opciones:')
        print('1. Registrar nuevo usuario')
        print('2. Bloquear usuario')
        print('3. Obtener información de usuario')
        print('4. Marcar correo como favorito')
        print('5. Desmarcar correo como favorito')
        print('6. Salir')

        opcion = input('Seleccione una opción: ')

        if opcion == '1':
            registrar_usuario()
        elif opcion == '2':
            bloquear_usuario(email, clave)
        elif opcion == '3':
            obtener_informacion(email, clave)
        elif opcion == '4':
            marcar_correo_favorito(email, clave)
        elif opcion == '5':
            desmarcar_correo_favorito(email, clave)
        elif opcion == '6':
            print('Saliendo del cliente...')
            break
        else:
            print('Opción no válida')

def main():
    print('Bienvenido al cliente de gestión de correos.')

    while True:
        print('Menú principal:')
        print('1. Iniciar sesión')
        print('2. Salir')

        opcion = input('Seleccione una opción: ')

        if opcion == '1':
            email = input('Ingrese su correo electrónico: ')
            clave = input('Ingrese su contraseña: ')
            menu(email, clave)
        elif opcion == '2':
            print('Saliendo del cliente...')
            break
        else:
            print('Opción no válida. Intente nuevamente.')

if __name__ == '__main__':
    main()