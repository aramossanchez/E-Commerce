# E-Commerce

Creación de un Backend para una app e-commerce, reto final en módulo Backend de GeeksHubs Academy.

# - CREACIÓN DEL ENTORNO - #

Dentro de un terminal en Visual Studio Code, procederemos de la siguiente manera para preparar nuestro entorno de trabajo:

##### -Inicializamos express generator

$express e-commerce --hbs


##### -Abrimos nueva ventana en Visual Studio Code con directorio recién creado

$code e-commerce


##### -Instalamos las dependencias incluidas en el package.json

$npm install


##### -Instalamos Mongoose

$npm install mongoose


##### -Arreglamos vulnerabilidades surgidas por la instalación de las dependencias

$npm audit fix


##### -Instalamos nodemon, para hacer que al guarda cambios en nuestros archivos, el servidor que tenemos levantado se reinicie de manera automática

$npm install nodemon

# - INICIAMOS EL PROYECTO - #

##### Creamos la carpeta 'config' en la raiz del proyecto, y dentro creamos el archivo mongoose.js

Aquí crearemos la conexión a la base de datos

###### Añadimos en app.js la siguiente línea, para permitir la conexión a la base de datos

require('./config/mongoose');

##### Creamos la carpeta 'models' en la raiz del proyecto, y dentro creamos el archivo Producto.js

Aquí crearemos la validación para nuestros documentos de nuestra base de datos

