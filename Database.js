const {Client}=require('pg')
const client=new Client({
    host:'localhost',
    port:32768,
    user:'postgres',
    password:'postgrespw',
    database:'Blogs'
})
client.connect((req,res)=>{
    console.log("DB connection was successful")
});



module.exports=client;