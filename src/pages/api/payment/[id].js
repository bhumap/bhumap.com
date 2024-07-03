import dbConnect from "@/src/backend/config/dbConnect";
import Payment from "@/src/backend/models/payment";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  const { id } = query;

  switch (method) {
    case "DELETE":
      try {
        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "Payment ID is required" });
        }

        const deletedPayment = await Payment.findByIdAndDelete(id);

        if (!deletedPayment) {
          return res
            .status(404)
            .json({ success: false, message: "Payment not found" });
        }

        res.status(200).json({ success: true, message: "Payment deleted successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

      case "GET":
      try {
        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "Payment ID is required" });
        }

        const payment = await Payment.findById(id);

        if (!payment) {
          return res
            .status(404)
            .json({ success: false, message: "Payment not found" });
        }

        res.status(200).json({ success: true, payment });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;


    case "PUT":
      try {
        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "Payment ID is required" });
        }

        const { Buyer_name, Package_Name, Amount } = body;

        const updatedPayment = await Payment.findByIdAndUpdate(
          id,
          { Buyer_name, Package_Name, Amount },
          { new: true, runValidators: true }
        );

        if (!updatedPayment) {
          return res
            .status(404)
            .json({ success: false, message: "Payment not found" });
        }

        res.status(200).json({ success: true, message: "Payment updated successfully", payment: updatedPayment });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  
}
