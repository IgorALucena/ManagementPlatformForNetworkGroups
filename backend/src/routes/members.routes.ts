import { Router } from "express";
import { MembersController } from "../controllers/MembersController";
import { celebrate, Joi, Segments } from "celebrate";

const router = Router();
const controller = new MembersController();

router.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().required(),
      full_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().optional(),
      company_name: Joi.string().optional(),
      business_area: Joi.string().optional(),
    }),
  }),
  controller.register.bind(controller)
);

export default router;
