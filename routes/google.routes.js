const { Router } = require('express')
const router = Router()

const Google = require('../utils/google')
const Utils = require('../utils/utils')
const Calendar = require('../utils/calendar')

/* router.delete('/cancel-meeting/:meetId', async (req, res) => {
  const { meetId } = req.params
  const { ownerEmail } = req.query
  try {
    const result = Google.cancelMeetEvent(ownerEmail, meetId)
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
})

router.put('/reschedule-meet', async (req, res) => {
  const { meetingData, calendarData } = req.body
  try {
    const result = await Google.rescheduleMeet(meetingData, calendarData)
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
}) */

router.post('/available-hours', async (req, res) => {
  const { calendarData, selectedDay } = req.body
  const { hours: rangeHours, duration } = calendarData
  const ownerEmail = calendarData.owner.email

  try {
    const availableHours = []
    for (const hours of rangeHours) {
      const { timeMin, timeMax } = Utils.getRangeHours(hours, selectedDay)

      const calendarHours = await Google.getGoogleCalendarMeetings(ownerEmail, {
        items: [{ id: 'primary', busy: 'Active' }],
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString()
      })

      let { timeMin: auxHour, timeMax: maxHour } = Utils.getRangeHours(
        hours,
        selectedDay
      )
      auxHour = auxHour.getTime()
      maxHour = maxHour.getTime()

      const durationInMilliseconds =
        duration.type === 'minutes'
          ? 1000 * 60 * duration.time
          : 1000 * 60 * 60 * duration.time

      while (auxHour < maxHour) {
        const nextHour = new Date(auxHour + durationInMilliseconds).getTime()
        let isAvailable = true
        calendarHours.forEach(cHour => {
          const start = new Date(cHour.start).getTime() // Agended event start
          const end = new Date(cHour.end).getTime() // Agended event end
          if (
            (auxHour <= start && start < nextHour) ||
            (auxHour < end && end <= nextHour) ||
            (start <= auxHour && auxHour < end) ||
            (start < nextHour && nextHour <= end)
          ) {
            isAvailable = false
          }
        })
        if (isAvailable) {
          availableHours.push({
            start: new Date(auxHour),
            end: new Date(nextHour)
          })
        }
        auxHour = nextHour
      }
    }
    return res.status(200).json(availableHours)
  } catch ({ response }) {
    console.log(response.status)
    return res.status(response.status).json(response)
  }
})

router.post('/thumbnail/:calendarId', async (req, res) => {
  const calendarId = req.params.calendarId
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }
    const uploadedImage = await Google.uploadImage(calendarId, req.files.file)
    return res.status(200).json(uploadedImage)
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.delete('/thumbnail/:calendarId', async (req, res) => {
  const calendarId = req.params.calendarId
  try {
    const calendar = await Calendar.getCalendarById(calendarId)
    if (calendar === null) {
      return res.status(404).json({ message: 'Calendar not found' })
    }
    const fileExt = calendar.image.name.split('.')[1]
    await Google.deleteImage(`${calendarId}.${fileExt}`)
    return res.status(200).send('Image removed succesfully.')
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
})

module.exports = router
