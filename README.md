# Frontend---React

# Integrando con react

Una vez que hayamos supervisado que nuestra API en ASP .NET CORE funciona de manera adecuada y que nos retorna específicamente lo que queremos vamos a conectar con react para que de esta manera podamos tener el backend y el fronted por separado. Para eso seguiremos unos cuántos pasos.

1. Vamos a instalar axios con el comando ==npm install axios==
2.  Vamos a instalar cors en nuestro entorno de backend con el comando ==dotnet add package Microsoft.AspNetCore.Cors
3. Volvemos a nuestro proyecto de React y modifcamos "page.tsx" para que nos funcione como el controlador de nuestras rutas:

```
import React from 'react';

import View from './users/view';

  

const Page: React.FC = () => {

  return (

    <div>

      <View />

    </div>

  );

};

  

export default Page;

```

4. Ahora volveremos a .Net y modificaremos un poco "Program.cs", para eso vamos a agregar la configuración de cors.
   
```
builder.Services.AddCors(options => { options.AddPolicy("AllowReactApp", policy => { policy.WithOrigins("http://localhost:3000") .AllowAnyHeader() 
.AllowAnyMethod(); 
});
});

app.UseCors("AllowReactApp");
```

De esta manera nuestro código se debería ver tal que así:

```
using backend.Models;

using Microsoft.EntityFrameworkCore;

/* using backend.Controllers; */

  
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<UsuariosContext>(options =>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>

{

    options.AddPolicy("AllowReactApp",

        policy =>

        {

            policy.WithOrigins("http://localhost:3000")

                  .AllowAnyHeader()

                  .AllowAnyMethod();

        });

});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())

{

    app.UseSwagger();

    app.UseSwaggerUI();

}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();  

app.Run();
```

### Entrando en detalle

Hemos hablado acerca de cómo podemos hacerlo funcionar, pero qué es lo que significa todo el código?.

Bien, comencemos explicando el "page.tsx" de React:

```
import React from 'react';

import View from './users/view';

  

const Page: React.FC = () => {

  return (

    <div>

      <View />

    </div>

  );

};

  

export default Page;
```

Lo primero es importar la dependencia de react, es recomendable que siempre usemos como nombre de la importación lo que estamos importando, si fuese "axios" sería "import Axios", etc.

Veamos de esta manera:

1. import
2. ["Nombre Variable"]
3. from
4. ["lugar de origen"]

En donde el punto 1 y 3 son inamovibles y el punto 2 y 4 depende de lo que queramos usar,

Después de que entendemos esto ahora podemos pasar a las vistas "View" funge directamente como la página dónde listamos a nuestros usuarios, usualmente están al mismo nivel que "page.tsx", pero en este caso yo decidí crear una carpeta llamada "users" en dónde cree el componente "view". de esta manera sabemos que en la carpeta únicamente irán las vistas o componentes de los usuarios, para evitar mezclarse si deseamos expandir el proyecto.

Si alguna vez hemos trabajado con react recordaremos que era algo común usar "react-router-dom", en este caso nos estamos enfocando más en usar Next.js para usar "React.FC" que básicamente nos indicar que es un componente de REACT FUNCTIONAL COMPONENT un componente funcional que espera una promesa, usando un enfoque más claro para Typescript permitiendo el tipado de algunos errores.

Por último prestamos atención al Return dónde tenemos la "Etiqueta" o componente que declaramos anteriormente, y al finalizar retornamos nuestra función principal que es "PAGE".

Ahora volvamos a .NET y exploremos qué es o qué significa:

```
builder.Services.AddCors(options => { options.AddPolicy("AllowReactApp", policy => { policy.WithOrigins("http://localhost:3000") .AllowAnyHeader() 
.AllowAnyMethod(); 
});
});

app.UseCors("AllowReactApp");
```

Recordaremos que hicimos la instalación de cors, pues no basta solo con instalar, debemos llevar a nuestro constructor la información para decirle que vamos a comunicarnos con una aplicación que está fuera del servidor en el que estamos corriendo .NET, para eso podemos especificarle directamente la ruta:

"http://localhost:3000"

En este caso estamos especificando directamente en nuestro código la ruta, eso podría ser algo contraproducente en producción por lo que esa parte podríamos agregarla con una variable de entorno.

Después declaramos que aceptamos todas las cabeceras y peticiones con la parte:

.AllowAnyHeader() 
.AllowAnyMethod();

Con peticiones nos referimos a patch, put, delete, get, fetch, etc.

Y para finalizar:

app.UseCors("AllowReactApp");

Con eso nos aseguramos de que la aplicación utilice la configuración de cors que creamos.
