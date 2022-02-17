const getMeetingsByField = {
  tags: ['Meetings'],
  description: 'Get Meetings by any field, for example calendarId or leadId',
  operationId: 'getMeetingsByField',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'field',
      in: 'query',
      description: 'Any field or property of the requested meeting',
      required: true,
      type: 'string'
    },
    {
      name: 'value',
      in: 'query',
      description: 'The value of the requested field of the meeting',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description:
        'Returns an array of meetings corresponding to the requested field value',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseMeeting'
          }
        }
      }
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    }
  }
}

const getMeetingById = {
  tags: ['Meetings'],
  description: 'Get Meeting by ID',
  operationId: 'getMeetingById',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'meetingId',
      in: 'path',
      description: 'ID of the meeting',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Returns the meeting that matches with the ID',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseMeeting'
          }
        }
      }
    },
    404: {
      description: 'No meeting found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    }
  }
}

const insertMeeting = {
  tags: ['Meetings'],
  description: 'Creates a meeting and then schedule it on Google Calendar',
  operationId: 'insertMeeting',
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            calendarInfo: {
              $ref: '#/components/schemas/requestCalendar'
            },
            selectedHour: {
              type: 'object',
              properties: {
                start: { type: 'string' },
                end: { type: 'string' }
              }
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Returns the created and scheduled meeting',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseMeeting'
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    }
  }
}

const updateMeetingState = {
  tags: ['Meetings'],
  description:
    "Updates the state of the Meeting that matches with the ID, then sends a pre-recorded email to the user. If the newState is 'Cancelado' removes the meeting of Google Calendar",
  operationId: 'updateMeetingState',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'meetingId',
      in: 'path',
      description: 'ID of the meeting',
      required: true,
      type: 'string'
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            newState: {
              type: 'string',
              enum: ['Agendado', 'Confirmado', 'Cancelado']
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Returns the updated meeting',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseMeeting'
          }
        }
      }
    },
    404: {
      description: 'No meeting found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    },
    405: {
      description: 'Action not allowed',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    }
  }
}

const updateMeeting = {
  tags: ['Meetings'],
  description: 'Updates the Meeting that matches with the ID',
  operationId: 'updateMeeting',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'meetingId',
      in: 'path',
      description: 'ID of the meeting',
      required: true,
      type: 'string'
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/requestMeeting'
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Returns the updated meeting',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseMeeting'
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    }
  }
}

const rescheduleMeeting = {
  tags: ['Meetings'],
  description:
    "Reschedules the meeting from Google calendar and update it in database, then sends a pre-recorded email to the user (Cannot reschedule a meeting with status 'Cancelado' or 'Confirmado')",
  operationId: 'rescheduleMeeting',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'meetingId',
      in: 'path',
      description: 'ID of the meeting',
      required: true,
      type: 'string'
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/requestMeeting'
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Returns the updated meeting',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseMeeting'
          }
        }
      }
    },
    405: {
      description:
        "If the current state of the meeting is 'Cancelado' or 'Confirmado' it returns Action not allowed error",
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseError'
          }
        }
      }
    }
  }
}

module.exports = {
  getMeetingsByField,
  getMeetingById,
  insertMeeting,
  updateMeetingState,
  updateMeeting,
  rescheduleMeeting
}
