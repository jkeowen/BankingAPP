const client = require('./client');
const { createUser } = require('./users');
const { deposit, withdraw, getTransactionsByUserId } = require('./transactions');
const { getCurrentBalance } = require('./balances');

const dropTables = async() =>{
  console.log('DROPPING TABLES');
  await client.query(`
  DROP TABLE IF EXISTS balances;
  DROP TABLE IF EXISTS transactions;
  DROP TABLE IF EXISTS users;
  `)
  console.log('FINISHED DROPPING TABLES');
}

const buildTables = async() =>{
  console.log('CREATING TABLES')
  await client.query(`
    CREATE TABLE users(id SERIAL PRIMARY KEY,
                       first_name VARCHAR(15) NOT NULL,
                       last_name VARCHAR(15) NOT NULL,
                       email_address VARCHAR(15) NOT NULL,
                       password VARCHAR(100) NOT NULL,
                       pin INTEGER NOT NULL,
                       account_number INTEGER);
    CREATE TABLE transactions(id SERIAL PRIMARY KEY,
                              user_id INTEGER REFERENCES users(id) NOT NULL,
                              type VARCHAR(10) NOT NULL,
                              amount INTEGER NOT NULL);
    CREATE TABLE balances(id SERIAL PRIMARY KEY,
                          user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
                          amount INTEGER NOT NULL);
  `);
  console.log('FINISHED CREATING TABLES');
};

const createUsers = async() =>{
  console.log("CREATIING USERS");
  await createUser('firstName', 'lastName', 'emailAddress', 'password', 1234);
  console.log("FINISHED CREATING USERS")
}

const seedDb = async() =>{
  console.log('CONNECTING TO DB');
  client.connect();
  console.log('FINISHED CONNECTING TO DB');
  await dropTables();
  await buildTables();
  await createUsers();
  await deposit(1, 500);
  await withdraw(1, 250);
  await getTransactionsByUserId(1);
  await getCurrentBalance(1);
  
  client.end();
  console.log("DISCONNECTED FROM DB");
}

seedDb();

export{}