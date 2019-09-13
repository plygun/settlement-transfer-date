/**
 * Publisher-Subscriber service implementation.
 * Useful for dependency injection.
 * Can swap any Pub/Sub implementation here.
 */
export class PublisherSubscriberService {
    readonly topic = 'businessDates'
    readonly channel = 'BankWire'

    static init() {

    }
}
