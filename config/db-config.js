const dotenv = (require("dotenv").config()).parsed

const dbConfig = {
  "development": {
    "username": dotenv.DB_USERNAME,
    "password": dotenv.DB_PASSWORD,
    "database": dotenv.DB_NAME,
    "host": dotenv.DB_HOST,
    "dialect":dotenv.DB_DIALECT,
    "port": dotenv.DB_PORT
  },
  "test": {
    "username": dotenv.DB_USERNAME,
    "password": dotenv.DB_PASSWORD,
    "database": dotenv.DB_NAME,
    "host": dotenv.DB_HOST,
    "dialect":dotenv.DB_DIALECT,
    "port": dotenv.DB_PORT
  },
  "production": {
    "username": dotenv.DB_USERNAME,
    "password": dotenv.DB_PASSWORD,
    "database": dotenv.DB_NAME,
    "host": dotenv.DB_HOST,
    "dialect":dotenv.DB_DIALECT,
    "port": dotenv.DB_PORT
  }
}


module.exports = dbConfig;