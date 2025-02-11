import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel"

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: "Order Placed"})
    }
    catch (error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing orders using stripe method
const placeOrderStripe = async (req, res) => {

}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {

}

// User order data for frontend
const userOrders = async (req, res) => {

}

// Update order status
const updateStatus = async (req, res) => {

}

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, updateStatus, userOrders}