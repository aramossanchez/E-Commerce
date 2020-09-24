# E-Commerce

Creación de un Backend para una app e-commerce, reto final en módulo Backend de GeeksHubs Academy.

# - CREACIÓN DEL ENTORNO - #

Dentro de un terminal en Visual Studio Code, procederemos de la siguiente manera para preparar nuestro entorno de trabajo:

## -Inicializamos express generator

$express e-commerce --hbs


## -Abrimos nueva ventana en Visual Studio Code con directorio recién creado

$code e-commerce


## -Instalamos las dependencias incluidas en el archivo 'package.json'

$npm install


## -Instalamos Mongoose

$npm install mongoose


## -Arreglamos vulnerabilidades surgidas por la instalación de las dependencias

$npm audit fix


## -Instalamos nodemon, para hacer que al guardar cambios en nuestros archivos, el servidor que tenemos levantado se reinicie de manera automática

$npm install nodemon

# - INICIAMOS EL PROYECTO - #

## -Creamos la carpeta 'config' en la raiz del proyecto, y dentro creamos el archivo 'mongoose.js'

Aquí crearemos la conexión a la base de datos

## -Añadimos en el archivo 'app.js' la siguiente línea (para permitir la conexión a la base de datos)

require('./config/mongoose');

## -Accedemos a la carpeta 'bin', y en el archivo 'www' añadimos:

server.listen(port,()=>console.log("Servidor levantado en el puerto", port));

# - CONFIGURAMOS CRUD - #

## -Creamos la carpeta 'models' en la raiz del proyecto, y dentro creamos el archivo 'Producto.js'

Aquí crearemos la validación para nuestros documentos de nuestra base de datos (los productos que venderemos en nuestra web)

Nuestros productos tendrán foto. Estás fotos estarán almacenadas en '/public/images'. Para que estas fotos sean visibles vamos a añadir a 'app.js' lo siguiente:

app.use(express.static(path.join(__dirname, 'public/images')));

De esta manera, con un enlace tipo 'http://localhost:3000/foto.jpg' podremos acceder a las imagenes almacenadas

## -Creamos la carpeta 'controllers' en la raiz del proyecto, y dentro creamos el archivo 'ProductoController.js'

Aquí crearemos las funcionalidades de nuestro CRUD

## -Dentro de la carpeta 'routes' creamos el archivo 'productos.js'

Aquí añadiremos las diferentes rutas de nuestro CRUD

## -En el archivo 'app.js' añadimos las rutas creadas en el archivo anterior

var productosRouter = require('./routes/productos');

----------------------------------------------------

app.use('/productos', productosRouter);

## - Dentro de la carpeta 'models' creamos el archivo 'Usuario.js'

Aquí crearemos la validación para nuestros documentos de nuestra base de datos (los usuarios que tendrán acceso a la web)

Todos los usuarios de la web tendrán una contraseña de acceso, y esa contraseña se guardará en la base de datos. Es necesario que esa contraseña se almacene cifrada.

Instalamos un encriptador para poder cifrar las contraseñas:

$npm i bcryptjs

En 'Usuario.js' añadimos la encriptación de las contraseñas. Además, haremos que no se muestre la contraseña al hacer la búsqueda

## -Creamos la carpeta 'controllers' en la raiz del proyecto, y dentro creamos el archivo 'UsuarioController.js'

Aquí crearemos las funcionalidades de nuestro CRUD

## -Dentro de la carpeta 'routes' creamos el archivo 'usuarios.js'

Aquí añadiremos las diferentes rutas de nuestro CRUD

## -En el archivo 'app.js' añadimos las rutas creadas en el archivo anterior

var usuariosRouter = require('./routes/usuarios');

----------------------------------------------------

app.use('/usuarios', usuariosRouter);


