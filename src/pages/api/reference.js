import dbConnect from "@/src/backend/config/dbConnect";
import Payment from '@/src/backend/models/reference';
import User from '@/src/backend/models/users';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        console.log("Request Body:", req.body);

        const { Ref_ID, Referral_Name, Package, Commission, Payment_date } = req.body;

        console.log("Ref_ID:", Ref_ID);
        console.log("Referral_Name:", Referral_Name);
        console.log("Package:", Package);
        console.log("Commission:", Commission);
        console.log("Payment_date:", Payment_date);

        if (!Ref_ID || !Referral_Name || !Package || !Commission || !Payment_date) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ "username": Ref_ID });

        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newReference = new Payment({
          Ref_ID,
          Referral_Name,
          Package,
          Commission,
          Payment_date,
          user: user._id
        });

        await newReference.save();
        res.status(201).json({ success: true, message: 'Payment saved successfully' });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

      case 'GET':
        try {
          const { userId } = req.query;
  
          if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
          }
  
          const user = await User.findById(userId);
  
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
  
          const payments = await Payment.find({ user: userId });
  
          res.status(200).json({ success: true, user, payments });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
        break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
