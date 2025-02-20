import { celebrate, Joi } from 'celebrate';

export const validateProductPostBody = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "title" должно быть не менее {#limit}',
        'string.max': 'Поле "title" должно быть не более {#limit}',
        'string.empty': 'Поле "title" обязательно для заполнения',
      }),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string(),
    }),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number(),
  }),
});

export const validateOrderPostBody = celebrate({
  body: Joi.object().keys({
    payment: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(
      Joi.string().required(),
    ).required(),
  }),
});
