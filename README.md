# Prueba Técnica
En este repositorio podrá encontrar la aplicación de prueba técnica parte 1 y 2. A continuación, se explicará cada una de las partes de la aplicación.

## 1. Prueba Técnica 1 (Prueba JSON de criptomonedas)

### 📋 1.1. Descripción
Aplicación que permite recibir y procesar transacciones en criptomonedas de manera segura.

### ⚙️ 1.2. Características principales
- Verificación de transacciones en criptomonedas.
- Almacenamiento seguro en PostgreSQL.
- Validaciones para evitar transacciones duplicadas y conflictos de billetera.
- Arquitectura basada en Docker para facilitar el despliegue y administración.

### 📦 1.3. Tecnologías utilizadas
- Node.js (Express)
- PostgreSQL
- Docker / Docker Compose
- pg (cliente de PostgreSQL)

### 🚀 1.4. Cómo levantar el proyecto
1. Ingrese a la carpeta de la aplicación:
```bash
cd prueba_tecnica_1
```

2. Levante los servicios con Docker Compose:
```bash
docker-compose up
```

### 📊 1.5. Cómo consultar los datos en la base de datos

1. Desde el terminal, usando psql, acceda al contenedor de la base de datos:
```bash
docker exec -it prueba_tecnica_1-db-1 psql -U postgres -d crypto_payments
```

2. Ver las tablas disponibles en SQL:
```bash
\dt
```

3. Consultar los datos de la tabla deposits:
```bash
SELECT * FROM deposits;
```

4. Salir del terminal psql:
```bash
\q
```

## 2. Prueba Técnica Parte 2

### 📋 2.1. Descripción
Página para visualizar diferentes imágenes.

### 📦 2.2. Tecnologías utilizadas
- Vite.js
- TypeScript
- Tailwind (manejo de estilos)

### 🚀 2.3. Cómo levantar el proyecto
1. Ingrese a la carpeta de la aplicación:
```bash
cd prueba_tecnica_2
```

2. Instale las librerías y corra la aplicación:
```bash
npm install
npm run dev
```

El proyecto se levantará en el puerto indicado.
