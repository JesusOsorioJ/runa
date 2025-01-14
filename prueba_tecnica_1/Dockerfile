# Usa una imagen oficial de Node.js
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos necesarios
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
