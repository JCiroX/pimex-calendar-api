const {
  insertCalendar,
  getCalendarsByBoard,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
  getCalendarOwnerStatus,
  insertCalendarOwner
} = require('./calendar.routes')

const {
  getMeetingsByField,
  getMeetingById,
  insertMeeting,
  updateMeetingState,
  updateMeeting,
  rescheduleMeeting
} = require('./meeting.routes')

const {
  getGoogleCalendarAvailableHours,
  uploadImage,
  deleteImage
} = require('./google.routes')

const { requestCalendar, responseCalendar } = require('./calendar.schema')
const { requestMeeting, responseMeeting } = require('./meeting.schema')
const { responseError, responseSuccess } = require('./utils.schema')

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '0.0.1',
    title: 'Calendar API documentation',
    description: 'API documentation for use',
    contact: {
      name: 'Juan P Ciro',
      url: 'https://github.com/JCiroLo'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'Local Server'
    },
    {
      url: 'https://example.com/',
      description: 'Production Server'
    }
  ],
  tags: [{ name: 'Calendar' }, { name: 'Meetings' }, { name: 'Google' }],
  paths: {
    '/calendar': {
      post: insertCalendar
    },
    '/calendar/{id}': {
      get: getCalendarById,
      put: updateCalendar,
      delete: deleteCalendar
    },
    '/calendar/board/{boardId}': {
      get: getCalendarsByBoard
    },
    '/calendar/user/{userEmail}': {
      get: getCalendarOwnerStatus,
      post: insertCalendarOwner
    },
    '/event': {
      get: getMeetingsByField,
      post: insertMeeting
    },
    '/event/{id}': {
      get: getMeetingById,
      put: updateMeeting
    },
    '/event/state/{id}': {
      patch: updateMeetingState
    },
    '/event/reschedule/{id}': {
      post: rescheduleMeeting
    },
    '/google/available-hours': {
      post: getGoogleCalendarAvailableHours
    },
    '/google/thumbnail/{calendarId}': {
      post: uploadImage,
      delete: deleteImage
    }
  },
  components: {
    schemas: {
      requestCalendar,
      responseCalendar,
      requestMeeting,
      responseMeeting,
      responseSuccess,
      responseError
    }
  }
}

module.exports = { apiDocumentation }
