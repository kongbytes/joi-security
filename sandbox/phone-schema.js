Joi.object().keys({
    phone: Joi.string().pattern(/^\+?[0-9]+/)
});
