import dbConnect from "@/src/backend/config/dbConnect";
import User from "@/src/backend/models/users";
import Payment from '@/src/backend/models/payment';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { user } = req.body;

        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Phone number or username is required" });
        }

        const foundUser = await User.findOne({
          $or: [
            { "phone.value": user },
            { username: user }
          ]
        });

        if (!foundUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        const payments = await Payment.find({ user: foundUser._id });

        res.status(200).json({ success: true, message: "User found", payments });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
