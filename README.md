# Síndico IA — Frontend

Interface web do Síndico IA, construída com Next.js 15, React 19 e Tailwind CSS.

O backend é mantido separadamente em
[`sindico-ia-back`](https://github.com/ppedroandrade/sindico-ia-back).

## Requisitos

- Node.js 22
- npm
- backend do Síndico IA disponível na porta `3002`, por padrão

## Configuração

```bash
cp .env.example .env.local
npm ci
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`.

Variáveis disponíveis:

```env
# URL pública da API usada pelo navegador
NEXT_PUBLIC_API_URL=http://localhost:3002

# URL usada pelo proxy /api do Next.js; opcional em desenvolvimento
BACKEND_URL=http://localhost:3002
```

## Scripts

```bash
npm run dev    # desenvolvimento
npm run build  # build de produção
npm run start  # inicia o build de produção
```

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3002 \
  --build-arg BACKEND_URL=http://host.docker.internal:3002 \
  -t sindico-ia-front .

docker run --rm -p 3000:3000 \
  -e BACKEND_URL=http://host.docker.internal:3002 \
  sindico-ia-front
```
