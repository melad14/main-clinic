
import Joi from "joi"
export const getNotSchema = Joi.object({
     id: Joi.string().hex().length(24).required(),
});



