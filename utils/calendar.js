const { db } = require('../lib/firebase')
const {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  where,
  query,
  updateDoc
} = require('firebase/firestore/lite')

const Calendar = {}

Calendar.getCalendarById = async calendarId => {
  const calendar = await getDoc(doc(db, 'calendars', calendarId))
  if (!calendar.exists()) {
    return null
  }
  return { id: calendar.id, ...calendar.data() }
}

Calendar.getCalendarByBoard = async boardId => {
  const q = query(collection(db, 'calendars'), where('board.id', '==', boardId))
  const querySnapshot = await getDocs(q)
  const calendars = []
  querySnapshot.forEach(e => calendars.push({ id: e.id, ...e.data() }))
  return calendars
}

Calendar.addCalendar = async calendarData => {
  const calendar = await addDoc(collection(db, 'calendars'), calendarData)
  return {
    id: calendar.id,
    ...(await getDoc(calendar)).data()
  }
}

Calendar.updateCalendar = async (calendarId, calendarData) => {
  await updateDoc(doc(db, 'calendars', calendarId), calendarData)
  return (await getDoc(doc(db, 'calendars', calendarId))).data()
}

Calendar.deleteCalendar = async calendarId => {
  const q = query(
    collection(db, 'meetings'),
    where('calendarId', '==', calendarId)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async meeting => {
    await deleteDoc(doc(db, 'meetings', meeting.id))
  })
  await deleteDoc(doc(db, 'calendars', calendarId))
}

Calendar.getCalendarUser = async userEmail => {
  const encodedEmail = Buffer.from(userEmail, 'utf8').toString('base64')
  const user = await getDoc(doc(db, 'calendarUsers', encodedEmail))
  return { exists: user.exists() }
}

Calendar.addCalendarUser = async (userEmail, refreshToken) => {
  const data = { token: refreshToken }
  const encodedEmail = Buffer.from(userEmail, 'utf8').toString('base64')
  const user = await setDoc(doc(db, 'calendarUsers', encodedEmail), data)
  return user
}

module.exports = Calendar
