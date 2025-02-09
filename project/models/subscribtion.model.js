import mongoose from "mongoose";

const subscribtionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim : true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [50, "Name must be at most 50 characters long"]

    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be at least 1"],
    }, 
    currency: {
        type : String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    },
    frequency : {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly"
    },
    category : {
        type: String,
        enum: ["business", "entertainment", "general", "health", "science", "sports", "technology"],
        default: "general",
        required: [true, "Category is required"]
    },
    paymentMethod : {
        type: String,
        required: [true, "Payment method is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, "Start date is required"],
        validate: {
            validator: function(v) {
                return v <= Date.now();
            },
            message: "Start date must be a past date"
        }
    },
    RenewalDate: {
        type: Date,
        required: [true, "End date is required"],
        validate: {
            validator: function(v) {
                return v >= this.startDate;
            },
            message: "Renewal date must be greater than or equal to start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true
    }
}, {timestamps: true});


//auto calculate renewal date based on frequency
subscribtionSchema.pre("save", function(next) {
    if(!this.RenewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
    }
    this.RenewalDate = new Date(this.startDate);
    this.RenewalDate.setDate(this.RenewalDate.getDate() + renewalPeriod[this.frequency]);

    // auto update status based on renewal date
    if (this.RenewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});