import requests

BASE_URL = "http://localhost:3000/api"

def autenticar_usuario(email, clave):
    response = requests.post(f"{BASE_URL}/autenticar", json={"email": email, "clave": clave})
    return response.json()

<<<<<<< HEAD
def ver_informacion(correo):
    response = requests.get(f"{BASE_URL}/{correo}")
    return response.json()

def ver_correos_favoritos(email):
    response = requests.get(f"{BASE_URL}/favoritos", params={"email": email})
    return response.json()
=======
    payload = {
        "nombre": nombre,
        "email": email,
        "clave": clave,
        "descripcion": descripcion
    }

    try:
        response = requests.post(f'{BASE_URL}/test', json=payload)
        if response.status_code == 200:
            print('Usuario registrado correctamente.')
        else:
            print(f'Error al registrar el usuario: {response.json()["mensaje"]}')
    except requests.exceptions.RequestException as e:
        print(f'Error de conexión: {e}')
>>>>>>> eb872788171a6630ab710981ac809a1f13fb7bd1

def marcar_correo_favorito(email, id_correo_favorito):
    response = requests.post(f"{BASE_URL}/marcarcorreo", json={"email": email, "id_correo_favorito": id_correo_favorito})
    return response.json()

def desmarcar_correo_favorito(id_correo_favorito):
    response = requests.delete(f"{BASE_URL}/desmarcarcorreo", json={"id_correo_favorito": id_correo_favorito})
    return response.json()

import requests

BASE_URL = "http://localhost:3000"

def autenticar_usuario(email, clave):
    response = requests.post(f"{BASE_URL}/api/autenticar", json={"email": email, "clave": clave})
    return response.json()

def registrar_usuario(nombre, email, clave, descripcion):
    response = requests.post(f"{BASE_URL}/api/registrar", json={"nombre": nombre, "email": email, "clave": clave, "descripcion": descripcion})
    return response.json()

def bloquear_usuario(email, clave, correo_bloquear):
    response = requests.post(f"{BASE_URL}/api/bloquear", json={"email": email, "clave": clave, "correo_bloquear": correo_bloquear})
    return response.json()

def ver_informacion(correo):
    response = requests.get(f"{BASE_URL}/api/{correo}")
    return response.json()

def ver_correos_favoritos(email):
    response = requests.get(f"{BASE_URL}/api/favoritos", params={"email": email})
    return response.json()

def marcar_correo_favorito(email, id_correo_favorito):
    response = requests.post(f"{BASE_URL}/api/marcarcorreo", json={"email": email, "id_correo_favorito": id_correo_favorito})
    return response.json()

def desmarcar_correo_favorito(id_correo_favorito):
    response = requests.delete(f"{BASE_URL}/api/desmarcarcorreo", json={"id_correo_favorito": id_correo_favorito})
    return response.json()

def main():
    print("-----------------------------------")
    print("¡Bienvenido a CommuniKen!")
    while True:

            email = input("Ingrese su correo electrónico: ")
            clave = input("Ingrese su clave: ")
            
            auth_response = autenticar_usuario(email, clave)
            if auth_response.get('estado') != 200:
                print(auth_response.get('mensaje'))
                return

            while True:
                print("-----------------------------------")
                print("\nMenú de opciones:")
                print("1. Ver información de una dirección de correo electrónico")
                print("2. Ver correos marcados como favoritos")
                print("3. Marcar correo como favorito")
                print("4. Desmarcar correo favorito")
                print("5. Bloquear correo")
                print("6. Registrar usuario")
                print("7. Terminar con la ejecución del cliente")
                print("\n-----------------------------------")

                opcion = input("Seleccione una opción: ")

                if opcion == '1':
                    correo_a_ver = input("Ingrese la dirección de correo electrónico a consultar: ")
                    info_response = ver_informacion(correo_a_ver)
                    if info_response.get('estado') == 200:
                        print(f"Nombre: {info_response.get('nombre')}")
                        print(f"Email: {info_response.get('email')}")
                        print(f"Descripción: {info_response.get('descripcion')}")
                    else:
                        print(info_response.get('mensaje'))

                elif opcion == '2':
                    favoritos_response = ver_correos_favoritos(email)
                    if 'favoritos' in favoritos_response:
                        print("Correos favoritos:")
                        for favorito in favoritos_response['favoritos']:
                            print(f"- {favorito}")
                    else:
                        print(favoritos_response.get('mensaje'))

                elif opcion == '3':
                    id_correo_favorito = input("Ingrese la dirección de correo electrónico a marcar como favorito: ")
                    marcar_response = marcar_correo_favorito(email, id_correo_favorito)
                    print(marcar_response.get('mensaje'))

                elif opcion == '4':
                    id_correo_favorito = input("Ingrese la dirección de correo electrónico a desmarcar como favorito: ")
                    desmarcar_response = desmarcar_correo_favorito(id_correo_favorito)
                    print(desmarcar_response.get('mensaje'))

                elif opcion == '5':
                    correo_bloquear = input("Ingrese la dirección de correo electrónico a bloquear: ")
                    bloquear_response = bloquear_usuario(email, clave, correo_bloquear)
                    print(bloquear_response.get('mensaje'))

                elif opcion == '6':
                    nombre = input("Ingrese su nombre: ")
                    email_registrar = input("Ingrese el correo electrónico a registrar: ")
                    clave_registrar = input("Ingrese la clave del nuevo usuario: ")
                    descripcion = input("Ingrese una descripción: ")
                    registrar_response = registrar_usuario(nombre, email_registrar, clave_registrar, descripcion)
                    print(registrar_response.get('mensaje'))

                elif opcion == '7':
                    print("Terminando la ejecución del cliente.")
                    break

                else:
                    print("Opción no válida. Por favor, seleccione una opción del menú.")


if __name__ == "__main__":
    main()