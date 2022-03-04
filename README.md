# API de Vendas

- Etapas para setup

  - `yarn install --frozen-lockfile`
  - `cp -r env.example .env`

    ```
    # Database
    POSTGRES_HOST=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DATABASE=
    POSTGRES_PORT=

    # Application
    PORT=300
    JWT_SECRET=
    JWT_EXPIRES_IN=
    ```

  - criar arquivo `ormconfig.json`

  ```
  {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "root",
    "password": "root",
    "database": "db_api_sales",
    "logging": false,
    "sincronazed": true,
    "entities": ["./src/modules/**/typeorm/entities/*.ts"],
    "migrations": ["./src/shared/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/typeorm/migrations"
  }
  ```

  - rodar docker `docker-compose up -d && yarn dev`
  - rodar migrations `yarn typeorm migration:run`

- Postman
  - Como pegar token automaticamente
  - Ir no tab de tests do postman

    ```
    var res = pm.response.json();
    pm.environment.set('token', res.token);
    ```
