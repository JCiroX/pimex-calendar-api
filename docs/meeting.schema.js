const requestMeeting = {
  type: 'object',
  properties: {
    boardInfo: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' }
      }
    },
    calendarId: { type: 'string' },
    formFields: {
      type: 'object',
      properties: {
        custom: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              required: { type: 'boolean' },
              type: { type: 'string' },
              value: { type: 'string' }
            }
          }
        },
        required: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            required: { type: 'boolean' },
            type: { type: 'string' },
            value: { type: 'string' }
          }
        }
      }
    },
    selectedDate: {
      type: 'object',
      properties: {
        end: { type: 'string' },
        start: { type: 'string' }
      }
    },
    state: {
      type: 'string',
      enum: ['Agendado', 'Confirmado', 'Cancelado']
    }
  }
}

const responseMeeting = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    ...requestMeeting.properties,
    createdAt: { type: 'string' }
  }
}

module.exports = { requestMeeting, responseMeeting }
