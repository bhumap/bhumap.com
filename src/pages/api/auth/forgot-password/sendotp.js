import usersModel from "@/src/backend/models/users";
import dbConnect from "@/src/backend/config/dbConnect";
import EmailSend from "@/src/backend/helpers/EmailSend";
import SmsSend from "@/src/backend/helpers/SmsSend";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const foundUser = await usersModel.findById(req.body._id);

    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
      return;
    }

    var otp = {
      value: Math.floor(100000 + Math.random() * 900000),
      expirationTime: new Date().getTime() + 60000,
    };

    if (req.body.type == "email") {
      try {
        await EmailSend(
          foundUser.email.value,
          foundUser.fullName,
          "Forgot password - Bhumap",
          ` <div style="font-family: sans-serif; background:#eee;min-height: 100vh;padding: 10px;">
              <div style="border: 1px solid #D26748;border-radius:10px;background:#fff; max-width: 500px;margin: 30px auto;padding: 20px;">
                  <div>
                      <h1 style="font-weight:bold;color:#D26748;">Bhumap</h1>
                      <h2 style="font-weight:bold;color:#196999;">Reset Password OTP </h2>
                      <p>You recently requested to reset your password for your Bhumap account. Use the following One-Time Password (OTP) to complete the process:</p>
                      <h2 style="font-weight:bold;color:#D26748;">${otp.value}</h2>
                      <p>This OTP is valid for 10 minutes. If you didn't request this change or if you have any questions, please contact our support team immediately.</p>
                      <p>Think Big, Go far,<br>Bhumap</p>
                      <p style="text-align:center;margin-top: 60px;margin-bottom: 0;color:#666;">Copyright © 2024 Bhumap, All rights reserved.</p>
                  </div>
              </div>
            </div>`
        );
      } catch (error) {
        res.json({
          success: false,
          message: "Error while sending Email!",
        });
        return;
      }
    } else if (req.body.type == "phone") {
      try {
        var data = await SmsSend(foundUser.phone.value, otp.value);
        if (!data?.data?.return) {
          res.json({
            success: false,
            message:
            data?.response?.data?.message || "Error while sending SMS OTP!",
          });
          return;
        }
      } catch (error) {
        res.json({
          success: false,
          message:
            error?.response?.data?.message || "Error while sending SMS OTP!",
        });
        return;
      }
    }

    await usersModel.findByIdAndUpdate(
      foundUser._id,
      { $set: { otp } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "OTP Sent Successfully!",
      data: foundUser,
    });
    return;


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
