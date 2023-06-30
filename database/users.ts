const client = require('./client');
const { createNewBalance } = require('./balances');

const createUser = async(firstName: string, lastName: string, emailAddress: string, password: string, pin: number) => {
  try{
    const _user = await getUserByEmail(emailAddress);
    if(_user) return "USER ALREADY EXISTS";
    const accountNumberSeed : number = 11111111 
    const { rows : [user] } = await client.query(`
      INSERT INTO users(first_name, last_name, email_address, password, pin)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
    `, [firstName, lastName, emailAddress, password, pin]);
    const { rows : [accountNumber] } = await client.query(`
      UPDATE users
      SET account_number = ${accountNumberSeed + user.id}
      WHERE id = ${user.id}
      RETURNING account_number;
    `);
    const balance  = await createNewBalance(user.id);
    delete user.password
    user.balance = balance.amount;
    user.account_number =  accountNumber.account_number
    return user;
  }
  catch(err){
    throw err;
  }
};

const getUserById = async(userId: number) =>{

  try{
    const { rows : [user] } = await client.query(`
      SELECT * 
      FROM users
      WHERE id = $1;
    `, [userId]);
    return user;
  }
  catch(err){
    throw err;
  }
};

const getUserByEmail = async(emailAddress: string) =>{

  try{
    const { rows : [user] } = await client.query(`
      SELECT * 
      FROM users
      WHERE email_address = $1;
    `, [emailAddress]);
    return user;
  }
  catch(err){
    throw err;
  }
}


module.exports = {
  createUser,
  getUserById, 
  getUserByEmail
}

export{}