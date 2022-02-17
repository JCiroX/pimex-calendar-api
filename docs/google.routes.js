const getGoogleCalendarAvailableHours = {
  tags: ['Google'],
  description:
    "Gets all the available hours from the user's Google Calendar. The range of hours is obtained from a day of the week and is bounded by two hours (start hour and end hour)",
  operationId: 'getGoogleCalendarAvailableHours',
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
            calendarData: {
              $ref: '#/components/schemas/responseCalendar'
            },
            selectedDay: {
              type: 'object',
              properties: {
                year: { type: 'integer' },
                month: { type: 'integer', minimum: 0, maximum: 11 },
                day: { type: 'integer', minimum: 1, maximum: 31 }
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
      description:
        "Returns an array with all user's the available hours for a day",
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
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

const uploadImage = {
  tags: ['Google'],
  description: 'Uploads an image to firebase storage',
  operationId: 'uploadImage',
  parameters: [
    {
      name: 'calendarId',
      in: 'path',
      description: 'The ID of the Calendar',
      required: true,
      type: 'string'
    }
  ],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Returns the URL of the uploaded image',
      content: {
        'application/json': {
          schema: {
            type: 'string'
          }
        }
      }
    },
    400: {
      description:
        "If there are not files, it returns the error message 'No files were uploaded'",
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

const deleteImage = {
  tags: ['Google'],
  description: 'Removes an uploaded image from firebase storage',
  operationId: 'deleteImage',
  parameters: [
    {
      name: 'calendarId',
      in: 'path',
      description: 'The ID of the Calendar',
      required: true,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Image removed succesfully',
      content: {
        'application/json': {
          schema: {
            type: 'string'
          }
        }
      }
    },
    404: {
      description: 'Calendar not found',
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

module.exports = { getGoogleCalendarAvailableHours, uploadImage, deleteImage }
