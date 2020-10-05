import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { EditableText, EditableParagraph, EditableBackgroundImage } from "react-easy-editables";

import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import { uploadImage } from '../firebase/operations';

import Layout from "../layouts/default.js";
import Section from "../components/common/Section"
import Gallery from "../components/common/Gallery"
import Calendar from "../components/common/Calendar"


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isLoggedIn: state.adminTools.isLoggedIn,
  };
};

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.state = {
      programElementsShow1: false,
      programElementsShow2: false,
      programElementsShow3: false,
      programElementsShow4: false,
    }

    this.props.onLoadPageData(initialPageData);
  }

  onSave = id => content => {
    this.props.onUpdatePageData("home", id, content);
  };

  handleClick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout theme="gray" location={this.props.location}>
        <EditableBackgroundImage content={content["landing-bg-image"]} onSave={this.onSave("landing-bg-image")} uploadImage={uploadImage}>
          <section id="landing">
            <Container maxWidth="lg">
              <Grid container>
                <Grid item md={8}>
                  <div className="landing-body">
                    <h3 className="text-white">
                      <EditableText content={content["landing-subtitle"]} onSave={this.onSave("landing-subtitle")} />
                    </h3>
                    <EditableParagraph content={content["landing-title"]} onSave={this.onSave("landing-title")} />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>
        </EditableBackgroundImage>
        <Section id="intro" className="position-relative">
          <Grid container className="title" justify="center">
            <Grid item md={10}>
              <div className="intro-text">
                <EditableParagraph content={content["intro-text"]} onSave={this.onSave("intro-text")} />
              </div>
            </Grid>
          </Grid>
        </Section>
        <Section id="program-elements">
          <h1>
            <EditableText content={content["program-elements-title"]} onSave={this.onSave("program-elements-title")} />
          </h1>
            <div className="program-box mt-5">
              <Grid container className="position-relative">
                <Grid item md={4} sm={12}>
                  <div className="hide-on-large-only text-bold text-right cursor-pointer" onClick={() => this.setState({ programElementsShow1: !this.state.programElementsShow1 })}>
                    {
                      !this.state.programElementsShow1 &&
                        <div className="display-flex align-center justify-right">
                          Read More <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
                        </div>
                    }
                    {
                      this.state.programElementsShow1 &&
                      <div className="display-flex align-center justify-right">
                        Show less <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M0 12v1h23v-1h-23z"/></svg>
                      </div>
                    }
                  </div>
                  <p className="text-muted hide-on-large-only">
                    <EditableText content={content["program-box-state-1"]} onSave={this.onSave("program-box-state-1")} />
                  </p>
                  <h4 className="text-bold mt-2 mb-0">
                    <EditableText content={content["program-box-title-1"]} onSave={this.onSave("program-box-title-1")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-1"]} onSave={this.onSave("program-box-date-1")} />
                  </h3>
                </Grid>
                <Grid item md={8} sm={11} className={this.state.programElementsShow1 ? '' : 'hide-on-med-and-down'}>
                  <p className="text-muted hide-on-med-and-down">
                    <EditableText content={content["program-box-state-1"]} onSave={this.onSave("program-box-state-1")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-1"]} onSave={this.onSave("program-box-desc-1")} />
                </Grid>
              </Grid>
              <a href="#" className="zoom-link is-past">Zoom Link</a>
              <div className='mid-dot is-past' />
              <div className='line' />
            </div>
            <div className="program-box is-large">
              <Grid container className="position-relative">
                <Grid item md={4} sm={12}>
                  <div className="hide-on-large-only text-bold text-right cursor-pointer" onClick={() => this.setState({ programElementsShow2: !this.state.programElementsShow2 })}>
                    {
                      !this.state.programElementsShow2 &&
                      <div className="display-flex align-center justify-right">
                        Read More <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
                      </div>
                    }
                    {
                      this.state.programElementsShow2 &&
                      <div className="display-flex align-center justify-right">
                        Show less <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M0 12v1h23v-1h-23z"/></svg>
                      </div>
                    }
                  </div>
                  <p className="text-blue hide-on-large-only">
                    <EditableText content={content["program-box-state-2"]} onSave={this.onSave("program-box-state-2")} />
                  </p>
                  <h4 className="text-bold mt-2 mb-0">
                    <EditableText content={content["program-box-title-2"]} onSave={this.onSave("program-box-title-2")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-2"]} onSave={this.onSave("program-box-date-2")} />
                  </h3>
                </Grid>
                <Grid item md={8} sm={11} className={this.state.programElementsShow2 ? '' : 'hide-on-med-and-down'}>
                  <p className="text-blue hide-on-med-and-down">
                    <EditableText content={content["program-box-state-2"]} onSave={this.onSave("program-box-state-2")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-2"]} onSave={this.onSave("program-box-desc-2")} />
                </Grid>
              </Grid>
              <a href="#open-space-week" className="zoom-link is-large" onClick={this.handleClick}>Full Schedule</a>
              <div className='mid-dot is-large' />
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}  sm={12}>
                  <div className="hide-on-large-only text-bold text-right cursor-pointer" onClick={() => this.setState({ programElementsShow3: !this.state.programElementsShow3 })}>
                    {
                      !this.state.programElementsShow3 &&
                      <div className="display-flex align-center justify-right">
                        Read More <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
                      </div>
                    }
                    {
                      this.state.programElementsShow3 &&
                      <div className="display-flex align-center justify-right">
                        Show less <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M0 12v1h23v-1h-23z"/></svg>
                      </div>
                    }
                  </div>
                  <p className="text-blue hide-on-large-only">
                    <EditableText content={content["program-box-state-3"]} onSave={this.onSave("program-box-state-3")} />
                  </p>
                  <h4 className="text-bold mt-2 mb-0">
                    <EditableText content={content["program-box-title-3"]} onSave={this.onSave("program-box-title-3")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-3"]} onSave={this.onSave("program-box-date-3")} />
                  </h3>
                </Grid>
                <Grid item md={8} sm={11} className={this.state.programElementsShow3 ? '' : 'hide-on-med-and-down'}>
                  <p className="text-blue hide-on-med-and-down">
                    <EditableText content={content["program-box-state-3"]} onSave={this.onSave("program-box-state-3")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-3"]} onSave={this.onSave("program-box-desc-3")} />
                </Grid>
              </Grid>
              <a href="#" className="zoom-link">Reach Out To Us Here</a>
              <div className='mid-dot' />
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}  sm={12}>
                  <div className="hide-on-large-only text-bold text-right cursor-pointer" onClick={() => this.setState({ programElementsShow4: !this.state.programElementsShow4 })}>
                    {
                      !this.state.programElementsShow4 &&
                      <div className="display-flex align-center justify-right">
                        Read More <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
                      </div>
                    }
                    {
                      this.state.programElementsShow4 &&
                      <div className="display-flex align-center justify-right">
                        Show less <svg className="ml-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M0 12v1h23v-1h-23z"/></svg>
                      </div>
                    }
                  </div>
                  <p className="text-blue hide-on-large-only">
                    <EditableText content={content["program-box-state-4"]} onSave={this.onSave("program-box-state-4")} />
                  </p>
                  <h4 className="text-bold mt-2 mb-0">
                    <EditableText content={content["program-box-title-4"]} onSave={this.onSave("program-box-title-4")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-4"]} onSave={this.onSave("program-box-date-4")} />
                  </h3>
                </Grid>
                <Grid item md={8} sm={11} className={this.state.programElementsShow4 ? '' : 'hide-on-med-and-down'}>
                  <p className="text-blue hide-on-med-and-down">
                    <EditableText content={content["program-box-state-4"]} onSave={this.onSave("program-box-state-4")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-4"]} onSave={this.onSave("program-box-desc-4")} />
                </Grid>
              </Grid>
              <a href="#" className="zoom-link">Zoom Link</a>
              <div className='mid-dot' />
            </div>
        </Section>

        <Section id="logistics">
          <Grid container>
            <Grid item md={8} sm={12} className="bg-white p-10 white-extension">
              <h2 className="text-bold">
                <EditableText content={content["logistics-title"]} onSave={this.onSave("logistics-title")} />
              </h2>
              <p className="max-width-500">
                <EditableText content={content["logistics-description"]} onSave={this.onSave("logistics-description")} />
              </p>
            </Grid>

            <Grid item md={4} sm={12} className="bg-gray pl-20 p-10 text-white gray-extension">
              <EditableParagraph content={content["logistics-details"]} onSave={this.onSave("logistics-details")} />
            </Grid>
          </Grid>
        </Section>

        <Section id="open-space-week" className="text-white">
          <Grid container>
            <Grid item md={8}>
              <h2 className="text-bold">
                <EditableText content={content["open-space-title"]} onSave={this.onSave("open-space-title")} />
              </h2>
              <EditableParagraph content={content["open-space-description"]} onSave={this.onSave("open-space-description")} />
              <p className="text-small">{`Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}</p>
            </Grid>

            <Grid item md={12}>
              <Calendar content={content["open-space-events"]} onSave={this.onSave("open-space-events")} />
            </Grid>
          </Grid>
        </Section>

        <Section id="holding-space-week" className="text-white">
          <Grid container>
            <Grid item md={8}>
              <h2 className="text-bold">
                <EditableText content={content["holding-space-title"]} onSave={this.onSave("holding-space-title")} />
              </h2>
              <EditableParagraph content={content["holding-space-description"]} onSave={this.onSave("holding-space-description")} />
              <p className="text-small">{`Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}</p>
            </Grid>

            <Grid item md={12}>
              Calendar goes here
            </Grid>
          </Grid>
        </Section>

        <Section id="gallery" className="text-white">
          <Grid container>
            <Grid item md={8} className="mb-4">
              <h2 className="text-bold">
                <EditableText content={content["gallery-title"]} onSave={this.onSave("gallery-title")} />
              </h2>
              <EditableParagraph content={content["gallery-description"]} onSave={this.onSave("gallery-description")} />
            </Grid>

            <Grid item md={12}>
              <Gallery content={content["gallery-collection"]} onSave={this.onSave("gallery-collection")} />
            </Grid>
          </Grid>
        </Section>

        <Section id="social" className="bg-blue text-white">
          <Grid container>
            <Grid item md={8}>
              <h2 className="text-bold">
                <EditableText content={content["social-title"]} onSave={this.onSave("social-title")} />
              </h2>
              <EditableParagraph content={content["social-description"]} onSave={this.onSave("social-description")} />
            </Grid>

            <Grid item md={12}>
              Twitter feed goes here
            </Grid>
          </Grid>
        </Section>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
      id
      content
      title
      description
      slug
    }
  }
`;


