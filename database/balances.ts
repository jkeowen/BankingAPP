const client = require('./client');

const createNewBalance = async(userId: number) =>{
  try{
    const { rows : [balance] } = await client.query(`
      INSERT INTO balances(user_id, amount)
      VALUES($1, 0)
      RETURNING *;
    `, [userId])
    return balance;
  }
  catch(err){
    throw err;
  }
}

module.exports = {
  createNewBalance
}

export{}