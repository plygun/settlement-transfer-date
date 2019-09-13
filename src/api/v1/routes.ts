import Router from 'koa-router'
import { BusinessDatesController } from './controllers/business-dates.controller'
import * as Validation from './controllers/validation/business-dates.validation'

const namespace = '/api/v1'
const router = new Router({
    prefix: namespace,
})

const routes = router
    .get('/businessDates/getBusinessDateWithDelay', Validation.getBusinessDateWithDelay,
        BusinessDatesController.getBusinessDateWithDelay)
    .post('/businessDates/getBusinessDateWithDelay', Validation.postBusinessDateWithDelay,
        BusinessDatesController.postBusinessDateWithDelay)
    .get('/businessDates/isBusinessDay', Validation.getIsBusinessDay, BusinessDatesController.getIsBusinessDay)
    .post('/businessDates/isBusinessDay', Validation.postIsBusinessDay, BusinessDatesController.postIsBusinessDay)

export { routes }
