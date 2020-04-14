Joi.object().keys({ 
    title: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string(), 
    comments: Joi.array().items(Joi.object().keys({ 
        description: Joi.string(), 
        author: Joi.string().required(), 
        grade: Joi.number().min(1).max(5) 
    })) 
});
