import dbConnect from "@/src/backend/config/dbConnect";
import Payment from "@/src/backend/models/payment";
import User from "@/src/backend/models/users";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        console.log("Request Body:", req.body);

        const { user_phone, Buyer_name, Package_Name, Amount, Payment_date } =
          req.body;

        console.log("user_phone:", user_phone);
        console.log("Buyer_name:", Buyer_name);
        console.log("Package_Name:", Package_Name);
        console.log("Amount:", Amount);
        console.log("Payment_date:", Payment_date);

        if (
          !user_phone ||
          !Buyer_name ||
          !Package_Name ||
          !Amount ||
          !Payment_date
        ) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ "phone.value": user_phone });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        const newPayment = new Payment({
          user_phone,
          Buyer_name,
          Package_Name,
          Amount,
          Payment_date,
          user: user._id,
        });error.details.map(err => err.message)

        await newPayment.save();
        res
          .status(201)
          .json({ success: true, message: "Payment saved successfully" });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "GET":
      try {
        const { userId } = req.query;

        if (!userId) {
          return res
            .status(400)
            .json({ success: false, message: "User ID is required" });
        }

        const user = await User.findById(userId);

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        const payments = await Payment.find({ user: userId });

        res.status(200).json({ success: true, user, payments });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
