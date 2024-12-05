import { app } from "./app.js";
import dbConnect from "./db/dbConnection.js"

const PORT = process.env.PORT || 8080;


dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log("Error while connecting the database : ", err);
})