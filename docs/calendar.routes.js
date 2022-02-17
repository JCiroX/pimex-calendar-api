const insertCalendar = {
  tags: ['Calendar'],
  description: 'Insert Calendar',
  operationId: 'insertCalendar',
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/requestCalendar'
        }
      }
    },
    required: true
  },
  responses: {
    201: {
      description: 'Calendar created successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseCalendar'
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

const getCalendarsByBoard = {
  tags: ['Calendar'],
  description: 'Get Calendars by Board',
  operationId: 'getCalendarsByBoard',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'boardId',
      in: 'path',
      description: 'Pimex Board ID',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Returns an array of Calendars',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/responseCalendar'
            }
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

const getCalendarById = {
  tags: ['Calendar'],
  description: 'Get Calendar by Id',
  operationId: 'getCalendarById',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Calendar ID',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Returns the Calendar that matches with the ID',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseCalendar'
          }
        }
      }
    },
    404: {
      description: 'No calendar was found',
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

const updateCalendar = {
  tags: ['Calendar'],
  description: 'Update Calendar',
  operationId: 'updateCalendar',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Calendar ID',
      required: true,
      type: 'string'
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/requestCalendar'
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Returns the updated Calendar',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseCalendar'
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

const deleteCalendar = {
  tags: ['Calendar'],
  description: 'Delete Calendar',
  operationId: 'deleteCalendar',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Calendar ID',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Successfully removed!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseSuccess'
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

const getCalendarOwnerStatus = {
  tags: ['Calendar'],
  description:
    'Returns a boolean which tells us if the user exists in the database',
  operationId: 'getCalendarOwnerStatus',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'userEmail',
      in: 'path',
      description: 'The email of the requested user',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description:
        'Returns the status in true, which means that the user exists in the database',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              exists: {
                type: 'boolean'
              }
            }
          }
        }
      }
    },
    404: {
      description:
        'Returns the status in false, which means that the user does not exist in the database',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              exists: {
                type: 'boolean'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Internal Server Error, returns the status in false',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              exists: {
                type: 'boolean'
              }
            }
          }
        }
      }
    }
  }
}

const insertCalendarOwner = {
  tags: ['Calendar'],
  description: 'Create an owner user of Calendars',
  operationId: 'insertCalendarOwner',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'userEmail',
      in: 'path',
      description: 'The email of the requested user',
      required: true,
      type: 'string'
    },
    {
      name: 'code',
      in: 'query',
      description: 'The auth code to get refresh tokens later',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    204: {
      description: 'Successfully user created!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/responseSuccess'
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
  insertCalendar,
  getCalendarsByBoard,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
  getCalendarOwnerStatus,
  insertCalendarOwner
}
