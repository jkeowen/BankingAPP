const client = require('./client');
const { getUserById } = require('./users');
const { reduceBalance, addToBalance } = require('./balances');

const deposit = async(userId: number, amount: number) =>{
  try{
    const _user = await getUserById(userId);
    if(!_user){
      console.log("USER DOES NOT EXIST")
      return "USER DOES NOT EXIST";
    } 
    const { rows : [deposit] } = await client.query(`
      INSERT INTO transactions(user_id, type, amount)
      VALUES($1, 'deposit', $2)
      RETURNING *;
    `,[userId, amount]);
    const newBalance = await addToBalance(userId, amount);
    deposit.balance = newBalance.amount;
    return deposit;
  }
  catch(err){
    throw err;
  }
}

const withdraw = async(userId: number, amount: number) =>{
  try{
    const _user = await getUserById(userId);
    if(!_user) return 'USER DOES NOT EXIST';
    const { rows: [ withdraw ] } = await client.query(`
      INSERT INTO transactions(user_id, type, amount)
      VALUES($1, 'withdraw', $2)
      RETURNING *;
    `, [userId, amount]);
    const newBalance = await reduceBalance(userId, amount);
    withdraw.balance = newBalance.amount;
    return withdraw;
  }
  catch(err){
    throw err;
  }
}

const getTransactionsByUserId = async(userId: number) =>{
  const _user = await getUserById(userId);
  if(!_user) return;
  const { rows: transactions } = await client.query(`
    SELECT id, type, amount 
    FROM transactions
    WHERE user_id = $1;
  `, [userId]);
  return transactions;
}


module.exports = {
  deposit,
  withdraw,
  getTransactionsByUserId
}

export{}