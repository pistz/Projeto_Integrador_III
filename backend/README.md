# Backend do Projeto

## Projeto Integrador III - Univesp

- Gestão de Estoque para o Asilo de Sertãozinho
- stack: python + flask

## Iniciando o backend

- Baixe o repositório

```bash
git clone <repositorio>
```

- Assegure-se de ter python 3.11 instalado

- Crie um ambiente virtual

```bash
python -m venv venv
```

- Acesse o ambiente virtual

```bash
source venv/bin/activate
```

- Instale as dependências

```bash
pip install -r requirements.txt
```

- Crie um arquivo _.env_ e adicione as chaves:

```bash
DATABASE_URL=postgresql://<database_user>:<database_password>@<url>:5432/<database_name>

JWT_SECRET_KEY= <your_key>

FRONTEND_URL= <frontend_url>

```
