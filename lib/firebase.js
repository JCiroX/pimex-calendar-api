const { getApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore/lite')
const { getStorage } = require('firebase/storage')

const app = getApp('firebase')

const db = getFirestore(app)
const storage = getStorage(app)

module.exports = { db, storage }
