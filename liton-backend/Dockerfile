# liton-backend/Dockerfile
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Exponha a porta (supondo que o backend rode na porta 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
