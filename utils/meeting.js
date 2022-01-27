const { db } = require('../lib/firebase')
const {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  where,
  query,
  updateDoc
} = require('firebase/firestore/lite')

const Meeting = {}

Meeting.getMeetingById = async meetingId => {
  const meeting = await getDoc(doc(db, 'meetings', meetingId))
  if (!meeting.exists()) {
    return null
  }
  return { id: meeting.id, ...meeting.data() }
}

Meeting.getMeetingsByField = async (field, value) => {
  const q = query(collection(db, 'meetings'), where(field, '==', value))
  const querySnapshot = await getDocs(q)
  const meetings = []
  querySnapshot.forEach(e => meetings.push({ id: e.id, ...e.data() }))
  return meetings
}

Meeting.addMeeting = async (calendarInfo, googleMeetingInfo, selectedHour) => {
  const meeting = await addDoc(collection(db, 'meetings'), {
    calendarId: calendarInfo.id,
    boardInfo: calendarInfo.board,
    selectedDate: selectedHour,
    meetLink: googleMeetingInfo.hangoutLink,
    formFields: calendarInfo.formFields,
    meetId: googleMeetingInfo.id,
    state: 'Agendado',
    leadId: '',
    createdAt: calendarInfo.createdAt
  })
  return {
    meetData: { eventId: meeting.id, ...googleMeetingInfo },
    eventData: {
      id: meeting.id,
      ...(await getDoc(doc(db, 'meetings', meeting.id))).data()
    }
  }
}

Meeting.updateMeeting = async (meetingId, meetingData) => {
  const meeting = updateDoc(doc(db, 'meetings', meetingId), meetingData)
  return meeting
}

module.exports = Meeting
