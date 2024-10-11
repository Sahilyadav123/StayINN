const mongoose = require("mongoose")
const initdata = require("./data.js")
const Listing = require("../models/listing.js")

main().then(() => {
    console.log("Connected")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');

}

const initDB = async () => {
    await Listing.deleteMany({});
    let newdata=initdata.data.map((obj)=>({...obj, owner: "66fbd7df26f346ffddf3ce9d"}))
    await Listing.insertMany(newdata);  
    console.log("data was initialized");
}
    
initDB();