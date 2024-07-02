import {Client} from 'pg'

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Chetan123@#",
    database: "postgres"
})

try {
    client.connect()
    .then(()=>console.log(`Connected to database successfully`))    
    .catch((err)=>console.log(`Database connection error:  ${err}`))
} catch (error) {
    console.log(error);
}

const result = client.query(`Select * from api_hits`, (err, res)=>{
    if(!err){
        console.log(res.rows)
    }
    else{
        console.log(err);
    }
})


export default client