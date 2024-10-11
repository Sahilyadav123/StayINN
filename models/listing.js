const mongoose = require('mongoose');
const {Schema} = mongoose;
const Review = require("./review.js")

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {
    //     type: String,
    //     set: (v)=> v === "" ? "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGNhYmlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
    //         : v,    
    // },

    image:{
        url:String,
        filename:String
    },
    price: Number,
    location: String,
    country: String,    
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    

  });

  ListingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    
  })

  const Listing = mongoose.model('Listing', ListingSchema);
  module.exports = Listing; 
