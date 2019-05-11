# project-app

_Watch.tv aplicación web de retransmisión en directo_

![channel](https://github.com/JoseAntonioRA/project-app/blob/master/Screenshot_3.png)

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

* Entorno de ejecución _NodeJS_
* Gestor de bases de datos _MongoDB_
* OBS (Open Broadcaster Software)

### Configuración ⚙️

Una vez instalado lo dicho anteriormente, iniciamos un terminal y nos
situamos en la ruta del proyecto, una vez en ella escribimos: ```npm install```
para así instalar todos los modúlos y sus dependencias.


### Una vez instaladas las dependencias, crearemos la base de datos y sus schemas

Crearemos una base de datos llamada app-project: ```use project-app```
Y a continuación crearemos los 3 schemas necesarios:
  * users → ```db.createCollection("users")```
  * channels → ```db.createCollection("channels")```
  * categories → ```db.createCollection("categories")```
  * *Pronto añadiré un script el cuál crea las categorias necesarias dentro del schema categories*

### Construido con 🛠️

* Editor de texto → Visual Studio Code.
* Lenguaje de programación → JavaScript tanto Front-End y Back-End, HTML, CSS
* Librerías/framework de Front-End → Jquery, bootstrap 4, mdBootstrap 4, Autocomplete
Jquery-ui, Font-Awesome, Flow-Player, Socket.io.
* Librerías/framework de backend → Express(MVC) , Socket.io.
* Entorno de ejecución → NodeJS.
* Motor de vistas → Express-Handlebars
* Base de datos → MongoDB (ORM, Mongoose).

### Autores ✒️


* **Jose Antonio** - *Trabajo Inicial* - *Documentación* - [Jose Antonio](https://github.com/JoseAntonioRA)

### Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢

---
⌨️ con ❤️ por [Jose Antonio](https://github.com/JoseAntonioRA) 😊
