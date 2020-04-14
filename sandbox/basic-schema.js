Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    ip_address: [Joi.string().ip(), Joi.string().hostname()],
    options: Joi.object({
        twitter: Joi.string().required(),
        linkedin: Joi.string().required().uri()
    }),
    birth_year: Joi.number().integer().min(1900),
    email: Joi.string().email()
}).unknown(true);
