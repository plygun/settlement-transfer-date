import Chai from 'chai'
import ChaiHttp from 'chai-http'
import { Server } from '../src/server'

const expect = Chai.expect
const testData = {
    getBusinessDateWithDelay: {
        endpoint: '/api/v1/businessDates/getBusinessDateWithDelay',
        methods: [
            'GET',
            'POST'
        ],
        receives: 'initialDate',
        expects: 'businessDate',
        data: [
            {
                input: {
                    initialDate: '2018-11-10T10:10:10Z',
                    delay: 3
                },
                output: {
                    businessDate: '2018-11-15T10:10:10Z',
                    totalDays: 6,
                    holidayDays: 1,
                    weekendDays: 2
                }
            },
            {
                input: {
                    initialDate: '2018-11-15T10:10:10Z',
                    delay: 3
                },
                output: {
                    businessDate: '2018-11-19T10:10:10Z',
                    totalDays: 5,
                    holidayDays: 0,
                    weekendDays: 2
                }
            },
            {
                input: {
                    initialDate: '2018-12-25T10:10:10Z',
                    delay: 20
                },
                output: {
                    businessDate: '2019-01-24T10:10:10Z',
                    totalDays: 31,
                    holidayDays: 3,
                    weekendDays: 8
                }
            }
        ]
    },
    isBusinessDay: {
        endpoint: '/api/v1/businessDates/isBusinessDay',
        methods: [
            'GET',
            'POST'
        ],
        receives: 'initialDate',
        expects: 'isBusinessDay',
        data: [
            {
                input: {
                    // Christmas Day
                    initialDate: '2018-12-25T10:10:10Z'
                },
                output: {
                    isBusinessDay: false
                }
            },
            {
                input: {
                    // Friday
                    initialDate: '2019-09-13T10:10:10Z'
                },
                output: {
                    isBusinessDay: true
                }
            },
            {
                input: {
                    // Saturday
                    initialDate: '2018-09-14T10:10:10Z'
                },
                output: {
                    isBusinessDay: true
                }
            }
        ]
    }
}

Chai.use(ChaiHttp)

describe('API v1 routes', () => {
    after(() => {
        Server.close()
    })

    for (const key in testData) {
        if (testData[key] === undefined) {
            continue
        }

        const test = testData[key]

        test.methods.forEach((method) => {
            test.data.forEach((testCase) => {
                const endpoint = test.endpoint
                const receives = testCase['input'][test.receives]
                const expects = testCase['output'][test.expects]

                it(`should make request '${method} ${endpoint}', receives '${receives}', expects '${expects}'`,
                    (done) => {
                    const chaiRequest = Chai.request(Server)

                    // common test function for both GET and POST methods
                    const testFn = (err: any, res: any) => {
                        expect(res).to.have.status(200)
                        expect(res.body).be.a('object')
                        expect(res.body).to.have.property('success').eql(true)
                        expect(res.body).to.have.property('initialQuery').eql(testCase.input)
                        expect(res.body).to.have.property('results').eql(testCase.output)
                        done()
                    }

                    if (method === 'GET') {
                        chaiRequest
                            .get(endpoint)
                            .query(testCase.input)
                            .end(testFn)
                    } else {
                        chaiRequest
                            .post(endpoint)
                            .send(testCase.input)
                            .end(testFn)
                    }
                })
            })
        })
    }
})
