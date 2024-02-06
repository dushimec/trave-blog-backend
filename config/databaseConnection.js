import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const DbConnection = async () => {
    try {
        await connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database established");
    } catch (error) {
        console.error(error);
    }
};

export default DbConnection;
