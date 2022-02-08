import { post } from './util'

export const feedbackAPI = {
    store: (request, feedback) => post('/feedbacks', {}, {requestId: request.id, ...feedback}),
}