import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "stripe";

//placing user order for frontend
const placeOrder = async (req, res) => {

  const frontened_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
        },
        unit_amount: items.price * 100 * 270,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 270,
      },
      quantity: 1,
    });

    const session = await stripe.Checkout.session.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontened_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontened_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, success_url: session_url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// User Orders for frontend
const userOrders = async (req, res) => {
  try {
    console.log("Logged-in User ID:", req.body.userId);

    const orders = await orderModel.find({
      userId: req.body.userId,
      payment: true,
    });

    console.log("Orders Found:", orders);

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// List all orders (Admin)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      status: { $ne: "Delivered" }
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
// Update Order Status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};

// Delete Delivered Order
const deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.body.orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status !== "Delivered") {
      return res.json({
        success: false,
        message: "Only delivered orders can be deleted",
      });
    }

    await orderModel.findByIdAndDelete(req.body.orderId);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error deleting order",
    });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  deleteOrder,
};