import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button"
import slugify from 'slugify';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateTime } from "luxon";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TimezoneSelect from './TimezoneSelect'

const emptyEvent = {
  title: '',
  host: '',
  description: '',
  rsvpUrl: '',
  eventUrl: '',
  date: null,
  start: null,
  end: null,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}


const EventModal = ({ event, onSaveItem, showModal, closeModal, onDeleteItem }) => {
  const [newEvent, updateEvent] = useState(event);
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (Boolean(event.id)) {
      const eventCopy = {
        ...event,
        date: event.startDate.setZone(event.timezone),
        start: event.startDate.setZone(event.timezone),
        end: event.endDate.setZone(event.timezone),
      }
      updateEvent(eventCopy)
    }
  }, event)

  const handleChange = key => event => {
    const value = event.currentTarget.value
    updateEvent({ ...newEvent, [key]: value })
  }

  const handleDateChange = key => date => {
    updateEvent({ ...newEvent, [key]: date })
  }

  const handleCancel = () => {
    updateEvent(event)
    closeModal()
  }

  const handleSaveEvent = () => {
    const date = newEvent.date.setZone(newEvent.timezone, { keepLocalTime: true })
    const start = date.set({ hour: newEvent.start.hour, minute: newEvent.start.minute })
    const end = date.set({ hour: newEvent.end.hour, minute: newEvent.end.minute })

    const data = {
      title: newEvent.title,
      host: newEvent.host,
      description: newEvent.description,
      timezone: newEvent.timezone,
      eventUrl: newEvent.eventUrl,
      rsvpUrl: newEvent.rsvpUrl,
      startDate: start.toISO(),
      endDate: end.toISO(),
    }

    const id = newEvent.id ? newEvent.id : `${slugify(newEvent.host)}-${date}-${start}`
    const saveFunction = onSaveItem(id)
    saveFunction(data)
    closeModal()
    updateEvent(emptyEvent)
  }

  const handleDeleteEvent = () => {
    onDeleteItem(newEvent.id)()
    closeModal()
    updateEvent(emptyEvent)
  }

  const { title, host, description, date, start, end, timezone, rsvpUrl, eventUrl, id } = newEvent;


  return (
    <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title" scroll="body">
      <DialogTitle id="form-dialog-title">New Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill out this form to add an event to the schedule.
        </DialogContentText>
        <TextField
          value={title}
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          onChange={handleChange('title')}
          variant="outlined"
        />
        <TextField
          value={host}
          margin="dense"
          id="host"
          label="Host"
          type="text"
          fullWidth
          onChange={handleChange('host')}
          variant="outlined"
        />
        <TextField
          multiline
          value={description}
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          onChange={handleChange('description')}
          variant="outlined"
        />
        <TextField
          value={eventUrl}
          margin="dense"
          id="event-url"
          label="Event link"
          type="url"
          fullWidth
          onChange={handleChange('eventUrl')}
          variant="outlined"
        />
        <TextField
          value={rsvpUrl}
          margin="dense"
          id="rsvpUrl"
          label="RSVP link"
          type="url"
          fullWidth
          onChange={handleChange('rsvpUrl')}
          variant="outlined"
        />
        <KeyboardDatePicker
          fullWidth
          margin="dense"
          id="date"
          label="Date"
          format="MM/dd/yyyy"
          value={date}
          KeyboardButtonProps={{
            'aria-label': 'select date',
          }}
          onChange={handleDateChange('date')}
          inputVariant="outlined"
        />
        <KeyboardTimePicker
          fullWidth
          margin="dense"
          id="start-time"
          label="Start time"
          value={start}
          KeyboardButtonProps={{
            'aria-label': 'select start time',
          }}
          onChange={handleDateChange('start')}
          inputVariant="outlined"
        />
        <KeyboardTimePicker
          fullWidth
          margin="dense"
          id="end-time"
          label="End time"
          value={end}
          KeyboardButtonProps={{
            'aria-label': 'select end time',
          }}
          onChange={handleDateChange('end')}
          inputVariant="outlined"
        />
        <div className="mt-1">
          <label className="text-small" htmlFor="timezone">Timezone</label>
          <TimezoneSelect
            handleChange={(value) => updateEvent({ ...newEvent, timezone: value })}
            name="timezone"
            id="timezone"
            value={timezone}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className="pr-3 pl-3 pb-2 width-100">
          <Grid container justify="space-between">
            <Grid item>
            {
              id &&
              <Button onClick={handleDeleteEvent} color="secondary">
                Delete
              </Button>
            }
            </Grid>
            <Grid item>
              <Button onClick={closeModal} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSaveEvent} color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogActions>
    </Dialog>
  );
}

EventModal.defaultProps = {
  onSaveItem: () => console.log("uh oh you're missing onSaveItem"),
  event: emptyEvent,
  showModal: false
}

export default EventModal

