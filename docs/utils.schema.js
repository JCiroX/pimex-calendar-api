const responseError = {
  type: 'object',
  properties: {
    status: {
      type: 'integer'
    },
    message: {
      type: 'string'
    }
  }
}

const responseSuccess = {
  type: 'object',
  properties: {
    status: {
      type: 'integer'
    },
    message: {
      type: 'string'
    }
  }
}

module.exports = { responseError, responseSuccess }
