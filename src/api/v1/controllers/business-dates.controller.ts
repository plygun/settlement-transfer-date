import Holidays from '@date/holidays-us'
import { DateTime } from 'luxon'

export class BusinessDatesController {
    static async getBusinessDateWithDelay(ctx: any, next: any) {
        BusinessDatesController.handleBusinessDateWithDelay(ctx)
        next()
    }

    static async postBusinessDateWithDelay(ctx: any, next: any) {
        BusinessDatesController.handleBusinessDateWithDelay(ctx)
        next()
    }

    static async getIsBusinessDay(ctx: any, next) {
        BusinessDatesController.handleIsBusinessDay(ctx)
        next()
    }

    static async postIsBusinessDay(ctx: any, next: any) {
        BusinessDatesController.handleIsBusinessDay(ctx)
        next()
    }

    protected static handleBusinessDateWithDelay(ctx: any) {
        const request = ctx.request
        const initialDate = request.body.initialDate || request.query.initialDate
        let delay = +(request.body.delay || request.query.delay)
        const initialQuery = {
            initialDate,
            delay
        }
        let totalDays = 0
        let holidayDays = 0
        let weekendDays = 0
        let dt = DateTime.fromISO(initialDate, {zone: 'UTC'})

        while (delay > 0) {
            // check priority: weekend day, holiday, business day
            // we don't count holidays on weekend days
            if (dt.weekday > 5) {
                weekendDays++
            } else if (Holidays.isHoliday(new Date(dt.toString()))) {
                holidayDays++
            } else {
                delay--
            }

            totalDays++
            dt = dt.plus({days: 1})
        }

        ctx.body = {
            success: true,
            initialQuery,
            results: {
                businessDate: dt.minus({days: 1}).toISO({suppressMilliseconds: true}),
                totalDays,
                holidayDays,
                weekendDays,
            },
        }
    }

    protected static handleIsBusinessDay(ctx: any) {
        const request = ctx.request
        const initialDate = request.body.initialDate || request.query.initialDate
        const initialQuery = {
            initialDate
        }
        const dt = DateTime.fromISO(initialDate, {zone: 'UTC'})
        const isBusinessDay = (dt.weekday < 6) && !Holidays.isHoliday(new Date(dt.toString()))

        ctx.body = {
            success: true,
            initialQuery,
            results: {
                isBusinessDay
            },
        }
    }
}
