# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies)
RUN npm install

# Copia o restante do código
COPY . .

# Executa o build (que inclui a checagem de tipos com vue-tsc)
RUN npm run build

# Stage 2: Imagem de produção
FROM node:18-alpine

WORKDIR /usr/src/app

# Instala um servidor estático (por exemplo, serve) globalmente para servir os arquivos
RUN npm install -g serve

# Copia somente a pasta de build do stage anterior
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000

# Comando para iniciar o servidor estático
CMD ["serve", "-s", "dist", "-l", "5000"]
