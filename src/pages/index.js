import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Help } from '@material-ui/icons';
import { EditableText, EditableParagraph, EditableBackgroundImage } from "react-easy-editables";

import {
  updatePage,
  loadPageData,
  validateAccessCode,
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
    validateAccessCode: (code) => {
      dispatch(validateAccessCode(code));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isLoggedIn: state.adminTools.isLoggedIn,
    accessGranted: state.adminTools.accessGranted,
  };
};

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { accessCode: '' }
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  onSave = id => content => {
    this.props.onUpdatePageData("home", id, content);
  };

  onAccessCodeSubmit = e => {
    e.preventDefault()
    this.props.validateAccessCode(this.state.accessCode)
    this.setState({ accessCode: '' })
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);
    if (!this.props.accessGranted) {
      return(
        <Layout theme="gray" location={this.props.location}>
          <EditableBackgroundImage content={content["landing-bg-image"]} onSave={this.onSave("landing-bg-image")} uploadImage={uploadImage}>
            <section id="landing">
              <Container maxWidth="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Grid container>
                  <Grid item md={8}>
                    <div className="mb-4">
                      <div className="text-white text-bold font-size-h4 mb-4">
                        <EditableText content={content["landing-subtitle"]} onSave={this.onSave("landing-subtitle")} />
                      </div>
                    </div>
                    <div className="">
                      <h1 className="text-white"><EditableText content={content["landing-title"]} onSave={this.onSave("landing-title")} /></h1>
                    </div>
                  </Grid>
                </Grid>
                <Grid container justify="flex-end">
                  <Grid item md={8}>
                    <form onSubmit={this.onAccessCodeSubmit} autoComplete="off" className="login-form mt-10 mb-6 display-flex align-right justify-right">
                      <div className="help-text text-white text-bold">
                        <label htmlFor="access-code">Access code:<span id="help-icon" aria-label="Help text: Your access code was sent to you by email. Contact us if you need us to resend it."><Help /></span></label>
                      </div>
                      <input type="text" className="ml-2" id="access-code" onChange={e => this.setState({ accessCode: e.currentTarget.value })} />
                      <input type="submit" value="Enter site" className="btn ml-2" />
                    </form>
                  </Grid>
                </Grid>
              </Container>
            </section>
          </EditableBackgroundImage>
        </Layout>
      )
    }

    return (
      <Layout theme="gray" location={this.props.location}>
        <EditableBackgroundImage content={content["landing-bg-image"]} onSave={this.onSave("landing-bg-image")} uploadImage={uploadImage}>
          <section id="landing">
            <Container maxWidth="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Grid container>
                <Grid item md={8}>
                  <div className="text-white text-bold font-size-h4 mb-4">
                    <EditableText content={content["landing-subtitle"]} onSave={this.onSave("landing-subtitle")} />
                  </div>
                  <h1 className="text-white mt-0 pb-6"><EditableText content={content["landing-title"]} onSave={this.onSave("landing-title")} /></h1>
                </Grid>
              </Grid>
            </Container>
          </section>
        </EditableBackgroundImage>
        <Section id="intro" className="position-relative">
          <Grid container className="title" justify="center">
            <Grid item xs={12} sm={10} md={9} lg={8}>
              <div className="intro-text bg-dark font-size-h4">
                <EditableParagraph content={content["intro-text"]} onSave={this.onSave("intro-text")} />
              </div>
            </Grid>
          </Grid>
        </Section>
        <Section id="program-elements">
          <h2>
            <EditableText content={content["program-elements-title"]} onSave={this.onSave("program-elements-title")} />
          </h2>
            <div className="program-box mt-5">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h3 className="text-bold mt-2">
                    <EditableText content={content["program-box-title-1"]} onSave={this.onSave("program-box-title-1")} />
                  </h3>
                  <div className="font-size-h6">
                    <EditableText content={content["program-box-date-1"]} onSave={this.onSave("program-box-date-1")} />
                  </div>
                </Grid>
                <Grid item md={8}>
                  <p className="text-muted">
                    <EditableText content={content["program-box-state-1"]} onSave={this.onSave("program-box-state-1")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-1"]} onSave={this.onSave("program-box-desc-1")} />
                </Grid>
              </Grid>
              <a href="#" className="zoom-link">Zoom Link</a>
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h3 className="text-bold mt-2">
                    <EditableText content={content["program-box-title-2"]} onSave={this.onSave("program-box-title-2")} />
                  </h3>
                  <div className="font-size-h6">
                    <EditableText content={content["program-box-date-2"]} onSave={this.onSave("program-box-date-2")} />
                  </div>
                </Grid>
                <Grid item md={8}>
                  <p className="text-blue">
                    <EditableText content={content["program-box-state-2"]} onSave={this.onSave("program-box-state-2")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-2"]} onSave={this.onSave("program-box-desc-2")} />
                </Grid>
              </Grid>
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h3 className="text-bold mt-2">
                    <EditableText content={content["program-box-title-3"]} onSave={this.onSave("program-box-title-3")} />
                  </h3>
                  <div className="font-size-h6">
                    <EditableText content={content["program-box-date-3"]} onSave={this.onSave("program-box-date-3")} />
                  </div>
                </Grid>
                <Grid item md={8}>
                  <p className="text-blue">
                    <EditableText content={content["program-box-state-3"]} onSave={this.onSave("program-box-state-3")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-3"]} onSave={this.onSave("program-box-desc-3")} />
                </Grid>
              </Grid>
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h3 className="text-bold mt-2">
                    <EditableText content={content["program-box-title-4"]} onSave={this.onSave("program-box-title-4")} />
                  </h3>
                  <div className="font-size-h6">
                    <EditableText content={content["program-box-date-4"]} onSave={this.onSave("program-box-date-4")} />
                  </div>
                </Grid>
                <Grid item md={8}>
                  <p className="text-blue">
                    <EditableText content={content["program-box-state-4"]} onSave={this.onSave("program-box-state-4")} />
                  </p>
                  <EditableParagraph content={content["program-box-desc-4"]} onSave={this.onSave("program-box-desc-4")} />
                </Grid>
              </Grid>
            </div>
        </Section>

        <Section id="logistics">
            <Grid container alignItems="stretch" spacing={4}>
              <Grid item md={7}>
                <div className="">
                  <h2 className="text-bold">
                    <EditableText content={content["logistics-title"]} onSave={this.onSave("logistics-title")} />
                  </h2>
                  <p>
                    <EditableText content={content["logistics-description"]} onSave={this.onSave("logistics-description")} />
                  </p>
                </div>
              </Grid>

              <Grid item md={5}>
                <div className="bg-dark text-white width-100 height-100 display-flex align-center pl-6">
                  <EditableParagraph content={content["logistics-details"]} onSave={this.onSave("logistics-details")} />
                </div>
              </Grid>
            </Grid>
        </Section>

        <Section id="open-space-week">
          <Grid container>
            <Grid item md={8}>
              <h2 className="text-bold">
                <EditableText content={content["open-space-title"]} onSave={this.onSave("open-space-title")} />
              </h2>
              <EditableParagraph classes="font-size-h4" content={content["open-space-description"]} onSave={this.onSave("open-space-description")} />
              <p className="text-small">{`Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}</p>
            </Grid>

            <Grid item md={12}>
              <Calendar content={content["open-space-events"]} onSave={this.onSave("open-space-events")} />
            </Grid>
          </Grid>
        </Section>

        <Section id="holding-space-week" className="bg-gradient text-white">
          <Grid container>
            <Grid item md={8}>
              <h2 className="text-bold">
                <EditableText content={content["holding-space-title"]} onSave={this.onSave("holding-space-title")} />
              </h2>
              <EditableParagraph classes="font-size-h4" content={content["holding-space-description"]} onSave={this.onSave("holding-space-description")} />
            </Grid>
          </Grid>
        </Section>

        <Section id="gallery">
          <Grid container>
            <Grid item md={8} className="mb-4">
              <h2 className="text-bold">
                <EditableText content={content["gallery-title"]} onSave={this.onSave("gallery-title")} />
              </h2>
              <EditableParagraph classes="font-size-h4" content={content["gallery-description"]} onSave={this.onSave("gallery-description")} />
            </Grid>

            <Grid item xs={12}>
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
              <EditableParagraph classes="font-size-h4" content={content["social-description"]} onSave={this.onSave("social-description")} />
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


