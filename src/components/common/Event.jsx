import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateTime } from "luxon";


const Event = props => {
  const [ isOpen, setIsOpen ] = useState(false)

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  const originalDate = DateTime.fromISO(content['startDate'])
  const startDate = DateTime.fromISO(content['startDate']).setZone(DateTime.local().zoneName);
  const endDate = DateTime.fromISO(content['endDate']).setZone(DateTime.local().zoneName);

  return (
    <Card className={`event-item mb-4 mt-4 display-block ${props.classes}`} square={true}>
      <CardContent className="card-body">
        <div className="text-muted"><time>{startDate.toLocaleString(DateTime.TIME_SIMPLE)}</time> - <time>{endDate.toLocaleString(DateTime.TIME_SIMPLE)}</time></div>
        <div className="text-muted">{startDate.toLocaleString(DateTime.DATE_FULL)}</div>
        <h4>{content['title']}</h4>
        <div>{content['host']}</div>
        <div className="display-flex justify-right mt-4"><Button onClick={setIsOpen}>Read more</Button></div>
      </CardContent>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <h3>{content['title']}</h3>
          <div className="text-muted"><time>{startDate.toLocaleString(DateTime.DATETIME_MED)}</time> - <time>{endDate.toLocaleString(DateTime.DATETIME_MED)}</time></div>
          <p>{content['description']}</p>
          <p><span className="text-bold">{`Hosted by: `}</span>{content['host']}</p>
          {content['eventUrl'] &&
          <p><span className="text-bold">{`Link: `}</span><a href={content['eventUrl']} target="_blank" rel="noopener noreferrer">{content['eventUrl']}</a></p>
          }
          <p><span className="text-bold">{`Event time: `}</span>{startDate.toLocaleString(DateTime.DATETIME_HUGE)}</p>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Grid item style={{ paddingBottom: '20px' }}>
              {content['rsvpUrl'] &&
              <Button component="a" href={content['rsvpUrl']} target="_blank" rel="noopener noreferrer" className="mb-4">RSVP</Button>
              }
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Event.defaultProps = {
  content: {},
  classes: "",
  onSave: () => { console.log('implement a function to save changes') }
}

export default Event;
