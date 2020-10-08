import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';

import 'react-image-lightbox/style.css';

import {
  PlainTextEditor,
  RichTextEditor,
  LinkEditor,
  Editable,
} from 'react-easy-editables';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import {DateTime} from "luxon";


const ProgramElementItemEditor = ({ content, onContentChange }) => {

  const handleEditorChange = field => item => {
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  console.log(content)

  return(
    <div className="program-box mt-5">
      <Grid container className="position-relative">
        <Grid item xs={12}>
          <PlainTextEditor
            classes="mb-3"
            content={content["program-elements-title"]}
            onContentChange={handleEditorChange("program-elements-title")}
          />
        </Grid>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Grid item xs={6}>
            <KeyboardDatePicker
              fullWidth
              margin="dense"
              id="date"
              label="Start date"
              format="MM/dd/yyyy"
              value={content["program-elements-start-date"]["date"]}
              KeyboardButtonProps={{
                'aria-label': 'select date',
              }}
              onChange={date => {
                console.log(date.toISO())
                handleEditorChange('program-elements-start-date')({"date": date.toISO()})
              }}
              inputVariant="outlined"
              variant="inline"
            />
        </Grid>
        <Grid item xs={6}>
            <KeyboardDatePicker
              fullWidth
              margin="dense"
              id="date"
              label="End date"
              format="MM/dd/yyyy"
              value={content["program-elements-end-date"] ? content["program-elements-end-date"]["date"] : undefined}
              KeyboardButtonProps={{
                'aria-label': 'select date',
              }}
              onChange={date => {
                handleEditorChange('program-elements-end-date')(date ? {"date": date.toISO() } : undefined)
              }}
              inputVariant="outlined"
            />
        </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={12}>
          <RichTextEditor
            classes="mb-3 mt-3"
            content={content["program-elements-text"]}
            onContentChange={handleEditorChange("program-elements-text")}
          />
        </Grid>
        <Grid item xs={12}>
          <LinkEditor
            content={content["program-elements-link"]}
            onContentChange={handleEditorChange("program-elements-link")}
          />
        </Grid>
      </Grid>
      <div className='mid-dot is-past' />
      <div className='line' />
    </div>
  )
}

const ProgramElementItem = props => {
  const [ isOpen, setIsOpen ] = useState(false)

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  const startDate = DateTime.fromISO(content["program-elements-start-date"]["date"])
  const endDate = content["program-elements-end-date"] && DateTime.fromISO(content["program-elements-end-date"]["date"]);
  const today = DateTime.local();
  const isPast = endDate ? endDate < today : startDate < today;
  const isCurrent = endDate ? startDate < today && endDate > today  : startDate.hasSame(today, 'day');
  const isUpcoming = startDate > today;

  return (
    <Editable
      Editor={ProgramElementItemEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={`program-box mt-5 ${isCurrent ? 'is-large' : ''}`}>
        <Grid container className="position-relative">
          <Grid item md={5} xs={12}>
            <div className="hide-on-large-only text-bold text-right cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {
                !isOpen &&
                <div className="display-flex align-center justify-right">
                  Read More <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
                </div>
              }
              {
                isOpen &&
                <div className="display-flex align-center justify-right">
                  Show less <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M0 12v1h23v-1h-23z"/></svg>
                </div>
              }
            </div>
            <p className={`${isPast ? 'text-muted' : 'text-blue'} hide-on-large-only`}>
              {
                isPast && 'past'
              }
              {
                isCurrent && 'current'
              }
              {
                isUpcoming && 'upcoming'
              }
            </p>
            <h3 className="text-bold mt-2 mb-6">
              {content["program-elements-title"]["text"]}
            </h3>
            <div className="font-size-h6">
              {startDate.toLocaleString({ month: 'long', day: 'numeric' })} {endDate && `- ${endDate.toLocaleString({ day: 'numeric' })}`}
            </div>
          </Grid>
          <Grid item md={7} xs={11} className={isOpen ? '' : 'hide-on-med-and-down'}>
            <p className={`${isPast ? 'text-muted' : 'text-blue'} hide-on-med-and-down`}>
              {
                isPast && 'past'
              }
              {
                isCurrent && 'current'
              }
              {
                isUpcoming && 'upcoming'
              }
            </p>
            <div dangerouslySetInnerHTML={{__html: content["program-elements-text"]["text"]}} />
          </Grid>
        </Grid>
        <div className={`program-link ${isCurrent ? 'is-large' : ''}`}>
          <a className={`btn btn-lg ${isPast ? 'btn-gray' : ''}`} href={content["program-elements-link"]["link"]}>{content["program-elements-link"]["anchor"]}</a>
        </div>
        <div className={`mid-dot ${isPast ? 'is-past' : ''} ${isCurrent ? 'is-large' : ''}`} />
        <div className='line' />
      </div>
    </Editable>
  );
};

ProgramElementItem.defaultProps = {
  content: {
    "program-elements-title": { "text": "Title" },
    "program-elements-start-date": { "date": "2020-10-11T00:00:00.000-04:00" },
    "program-elements-link": { "link": "/", "anchor": "Zoom Link" },
    "program-elements-text": { "text": `<p>Description text</p>` },
  },
  classes: "",
  onSave: () => { console.log('implement a function to save changes') }
}

export default ProgramElementItem;
