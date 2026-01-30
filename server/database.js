// const { response } = require("express");
const {Pool} = require("pg");
const pool = new Pool({
    user:"postgres",
    password:"0000",
    host:"localhost",
    port: 5432,
    database:"pern_login"
})

// const creatTblQry=`CREATE TABLE accounts (user_id serial PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(50) UNIQUE NOT NULL);`


// pool.query(creatTblQry).then(() =>{
//     console.log("Table Created " +response)
// })
// .catch((err) =>{
// console.log(err)
// })

// pool.query("CREATE DATABASE pern_login;").then(() =>{
//     console.log("Database Created " +response)
// })
// .catch((err) =>{
// console.log(err)
// })

module.exports = pool