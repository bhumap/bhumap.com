import dbConnect from "@/src/backend/config/dbConnect";
import { StatusCodes } from "http-status-codes";
import CategoriesModel from "@/src/backend/models/categories";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const categories = await CategoriesModel.find({});

        res.status(StatusCodes.OK).json({
          success: true,
          data: categories,
        });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
      }

    case "GET":
      try {
        const { categoryId } = req.query;

        const categories = await CategoriesModel.findById(categoryId);

        res.status(StatusCodes.OK).json({
          success: true,
          data: categories,
        });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
      }

    case "POST":
      try {
        const { name, status } = req.body;

        if (!name) {
          res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "all fields are required!",
          });
        }

        let AddNewCategory = new CategoriesModel({ name, status });
        AddNewCategory = await AddNewCategory.save();

        res.status(StatusCodes.OK).json({
          success: true,
          message: "category added successfully!",
          data: AddNewCategory,
        });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
      }
      break;
  }
}
