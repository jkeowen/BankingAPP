const client = require('./client');

const createUser = async(firstName: string, lastName: string, emailAddress: string, password: string, pin: number) => {
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
  delete user.password
  user.account_number =  accountNumber.account_number
  console.log(user);
  return user;

}



module.exports = {
  createUser
}

export{}