import dotenv from "dotenv";

dotenv.config();


const PORT = process.env.PORT;
const Mongo_Url = process.env.MONGO_URL
const TOKEN_SECRET = process.env.TOKEN_SECRET


export {
    PORT,Mongo_Url,TOKEN_SECRET
}