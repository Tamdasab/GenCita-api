import { Sequelize } from "sequelize";


const db = new Sequelize('app', '', '',{
    storage: './src/database.sqlite',
    dialect: 'sqlite',
    logging: false,
});



export default db;

//export function createTableIfNotExists() {
//    const createTable = 
//    `CREATE TABLE IF NOT EXISTS citation (
//        id INTEGER PRIMERY KEY AUTOINCREMENT,
//        text TEXT,
//        category TEXT,
//        creationDate DATETIME
//    )`
//
//    db.query(createTable).then(()=>{
//        console.log("Table created");
//    }).catch(error=>{
//        console.error("Error creating table",error);
//    })
//}

