import dbConnect from "@/src/backend/config/dbConnect";
import MembershipModel from "@/src/backend/models/memberships";
import { JWTVerify } from "@/src/backend/helpers/jwt";
const { ObjectId } = require("mongoose").Types;
import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
    await dbConnect();

    var token = req.cookies.AccessToken || "";
    var userID = (await JWTVerify(token)) || req.query.id;

    switch(req.method) {
        case "DELETE":
            try {
                const membership = await MembershipModel.findByIdAndDelete(req.query.id);

                if (!membership) {
                    return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({ success: false, message: "Membership not found" });
                }
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Internal server error!",
                });
            }
            break;
    }

}