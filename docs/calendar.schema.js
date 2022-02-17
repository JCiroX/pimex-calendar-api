const requestCalendar = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
    description: { type: 'string' },
    color: { type: 'string' },
    duration: {
      type: 'object',
      properties: {
        time: {
          type: 'integer'
        },
        type: {
          type: 'string',
          enum: ['minutes', 'hours']
        }
      }
    },
    board: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        id: { type: 'string' }
      }
    },
    owner: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        image: { type: 'string' },
        name: { type: 'string' }
      }
    },
    months: {
      type: 'object',
      properties: {
        from: { type: 'string' },
        to: { type: 'string' }
      }
    },
    days: {
      type: 'object',
      properties: {
        sunday: { type: 'boolean' },
        monday: { type: 'boolean' },
        tuesday: { type: 'boolean' },
        wednesday: { type: 'boolean' },
        thursday: { type: 'boolean' },
        friday: { type: 'boolean' },
        saturday: { type: 'boolean' }
      }
    },
    hours: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          from: { type: 'string' },
          to: { type: 'string' }
        }
      }
    },
    image: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        url: { type: 'string' }
      }
    },
    formFields: {
      type: 'object',
      properties: {
        required: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['email'] },
            label: { type: 'array' },
            required: { type: 'boolean' },
            value: { type: 'string' }
          }
        },
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
        }
      }
    }
  }
}

const responseCalendar = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    ...requestCalendar.properties,
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
}

module.exports = { requestCalendar, responseCalendar }
