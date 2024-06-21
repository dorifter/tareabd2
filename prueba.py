import requests

URL = "http://localhost:3000/api/registrar"

payload = {
    "nombre": "Ejemplo",
    "correo": "ejemplo@example.com",
    "clave": "contraseña",
    "descripcion": "Descripción opcional"
}

try:
    response = requests.post(URL, json=payload)

    if response.status_code == 200:
        print("Usuario registrado correctamente")
        print("Data:", response.json())
    else:
        try:
            error_message = response.json().get("mensaje")
            if error_message:
                print("Error en la solicitud:", error_message)
            else:
                print("Error en la solicitud:", response.text)
        except ValueError:
            print("Error en la solicitud:", response.text)

except requests.exceptions.RequestException as e:
    print("Error de conexión:", e)