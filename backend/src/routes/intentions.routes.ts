import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { IntentionsController } from "../controllers/IntentionsController";

const router = Router();
const controller = new IntentionsController();

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      full_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().optional().allow("", null),
      message: Joi.string().optional().allow("", null),
    }),
  }),
  controller.create.bind(controller)
);

router.get("/", controller.list.bind(controller));
router.patch(
  "/:id/approve",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  controller.approve.bind(controller)
);

router.patch(
  "/:id/reject",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  controller.reject.bind(controller)
);

export default router;
