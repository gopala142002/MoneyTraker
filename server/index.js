import express  from "express";
import cors from 'cors';
import {addTransaction,getAllTransactions} from './Controllers/TransactionController.js'
import 'dotenv/config'
const app=express();
app.use(cors());
app.use(express.json());
console.log(process.env.PORT);
const PORT=process.env.PORT || 3333;

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT NUMBER ${PORT}`);
})
app.get('/',(req,res)=>{
    res.send("Hello everyone");
});
app.post('/server/transaction',addTransaction);
app.get('/server/transactions',getAllTransactions);