# API de Vendas

- Etapas para setup
  - `yarn`
  - `cp -r env.example .env`
    ```
    # Database
    POSTGRES_HOST=localhost
    POSTGRES_USER=root
    POSTGRES_PASSWORD=root
    POSTGRES_DATABASE=db_api_sales
    POSTGRES_PORT=5432

    # Application
    PORT=3000
    JWT_SECRET=secret
    JWT_EXPIRES_IN=30m
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
    "synchronize": true,
    "logging": false,
    "entities": ["src/modules/**/typeorm/entities/**.ts"],
    "migrations": ["src/shared/typeorm/migrations/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"]
  }
  ```
  - rodar docker `docker-compose up -d && yarn dev`

- Postman
  - Como pegar token automaticamente
  - Ir no tab de tests do postman
    ```
    var res = pm.response.json();
    pm.environment.set('token', res.token);
    ```