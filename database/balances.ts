import { cli } from "webpack";

const client = require('./client');

const createNewBalance = async(userId: number) =>{
  try{
    const { rows : [ balance ] } = await client.query(`
      INSERT INTO balances(user_id, amount)
      VALUES($1, 0)
      RETURNING *;
    `, [userId])
    return balance;
  }
  catch(err){
    throw err;
  }
};

const reduceBalance = async(userId: number, amount: number) =>{
  try{
    const { rows : [ balance ] } = await client.query(`
      UPDATE balances
      SET amount = amount - $2
      WHERE user_id = $1
      RETURNING *;
    `, [userId, amount]);
    return balance;
  }catch(err){
    throw err;
  }
}

const addToBalance =  async(userId: number, amount: number) =>{
  try{
    const { rows: [ balance ] } = await client.query(`
      UPDATE balances
      SET amount = amount + $2
      WHERE user_id = $1
      RETURNING *;
    `, [userId, amount]);
    return balance;
  }catch(err){
    throw err;
  }
};

const getCurrentBalance = async(userId: number) =>{
  try{
    const { rows: [ balance ] } = await client.query(`
      SELECT amount 
      FROM balances
      WHERE user_id = $1; 
    `, [userId]);
    return balance;
  }catch(err){
    throw err;
  }
}

module.exports = {
  createNewBalance,
  reduceBalance,
  addToBalance,
  getCurrentBalance
}

export{}