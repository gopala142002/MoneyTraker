import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllTransactions=async(req,res)=>{
    const transactions=await prisma.Transaction.findMany();
    console.log(transactions);
    res.json(transactions);
}
export const addTransaction=async (req,res)=>{
    // console.log(typeof(req.body));
    const data=req.body;
    // console.log(data);
    // console.log(data.name);
    // console.log(data.description);
    // console.log(Date(data.datetime));
    const post=await prisma.Transaction.create({
        data:{
            Amount:data.amount,
            Name:data.name,
            Description:data.description,
            Datetime:data.datetime
        }
    })
    // console.log(post);
    res.send(post);
}