import React from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"
import { connect } from "react-redux";
import LuxonUtils from '@date-io/luxon';
import { DateTime } from "luxon";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Event from "./Event"
import EventModal from './EventModal'

const luxon = new LuxonUtils()

const EVENT_DAYS = [
  { date: DateTime.local(2020,10,26), events: [] },
  { date: DateTime.local(2020,10,27), events: [] },
  { date: DateTime.local(2020,10,28), events: [] },
  { date: DateTime.local(2020,10,29), events: [] },
  { date: DateTime.local(2020,10,30), events: [] },
]


const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class Calendar extends React.Component {
  state = {
    showModal: false,
    selectedDate: null,
    schedule: EVENT_DAYS,
  }

  componentDidMount() {
    this.prepareSchedule()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.prepareSchedule()
    }
  }

  onSaveItem = itemId => itemContent => {
    const newContent = {
      ...this.props.content,
      [itemId]: itemContent
    }

    this.props.onSave(newContent)
  }

  onDeleteItem = itemId => () => {
    let newContent = { ...this.props.content }
    newContent[itemId] = null

    this.props.onSave(newContent)
  }

  onAddItem = () => {
    let newContent = { ...this.props.content }
    const newItemKey = `gallery-${Date.now()}`
    newContent[newItemKey] = {
      "gallery-item-details": { "text": "Open Space Week" },
      "gallery-item-title": { "text": "Title" },
      "gallery-item-author": { "text": "Author" },
    }

    this.props.onSave(newContent)
  }

  prepareSchedule = () => {
    const eventKeys = Object.keys(this.props.content)
    const eventArray = eventKeys.map(key => ({...this.props.content[key], id: key, startDate: DateTime.fromISO(this.props.content[key]['startDate'])}))
    const schedule = EVENT_DAYS.map(day => {
      const events = eventArray.filter(event => luxon.isSameDay(event.startDate, day.date))
      console.log(events)
      events.sort((a, b) => a.startDate - b.startDate)
      return { ...day, events: events }
    })

    console.log("schedule", schedule)

    this.setState({ schedule: schedule })
  }

  render() {
    const itemsKeys = Object.keys(this.props.content).reverse()
    const { showModal } = this.state;

    return (
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className={`collection mt-6 ${this.props.classes}`}>
          {
            this.props.isEditingPage &&
            <div className="row mb-4">
              <div className="col-12">
                <Button onClick={() => this.setState({ showModal: true })} color="default" variant="contained">Add event</Button>
              </div>
            </div>
          }
          <Hidden smDown>
            <Grid container justify="space-between">
              {
                this.state.schedule.map(day => {
                  const dateString = day.date.toLocaleString({ month: 'short', day: 'numeric' })
                  const weekday = day.date.toLocaleString({ weekday: 'long' })

                  return (
                    <Grid item xs={2}>
                      <div className="events-column">
                        <div className="date-label bg-blue text-white text-center p-4">
                          <div className="text-bold">{dateString}</div>
                          <div className="text-uppercase">{weekday}</div>
                        </div>
                        {
                          day.events.map(event => {
                            return(
                              <Event content={event} key={event.id} />
                            )
                          })
                        }
                      </div>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid container>
              <Grid item xs={12}>
                <Tabs>
                  <TabList className='tabs-list'>
                    {
                      this.state.schedule.map(day => {
                        const dateString = day.date.toLocaleString({ month: 'short', day: 'numeric' })
                        const weekday = day.date.toLocaleString({ weekday: 'long' })

                        return (
                          <Tab className='tabs-item text-bold p-3 text-xs text-center'>{dateString}</Tab>
                        )
                      })
                    }
                  </TabList>

                  {
                    this.state.schedule.map(day => {
                      return (
                        <TabPanel className='tab-content'>
                          {
                            day.events.map(event => {
                              return(
                                <Event content={event} key={event.id} />
                              )
                            })
                          }
                        </TabPanel>
                      )
                    })
                  }
                </Tabs>
              </Grid>
            </Grid>

          </Hidden>
          <EventModal
            onSaveItem={this.onSaveItem}
            showModal={showModal}
            closeModal={() => this.setState({ showModal: false })}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

Calendar.defaultProps = {
  content: {},
  classes: "",
  onSave: () => { console.log('Implement a function to save changes') }
}

export default connect(mapStateToProps)(Calendar)

