import Joi from 'joi'
import validate from 'koa2-validation'

// validation rules
const businessDateWithDelayRules = {
    initialDate: Joi.string().required(),
    delay: Joi.number().required()
}
const isBusinessDayRules = {
    initialDate: Joi.string().required(),
}

// validation for different http verbs
const getBusinessDateWithDelay = validate({
    query: businessDateWithDelayRules
})
const postBusinessDateWithDelay = validate({
    body: businessDateWithDelayRules
})
const getIsBusinessDay = validate({
    query: isBusinessDayRules
})
const postIsBusinessDay = validate({
    body: isBusinessDayRules
})

export {
    getBusinessDateWithDelay,
    postBusinessDateWithDelay,
    getIsBusinessDay,
    postIsBusinessDay
}
