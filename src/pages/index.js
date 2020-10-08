import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
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
import ProgramElements from "../components/common/ProgramElements"


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
          <EditableBackgroundImage
            classes="header-bg-image animate__animated animate__fadeIn"
            content={content["landing-bg-image"]}
            onSave={this.onSave("landing-bg-image")}
            uploadImage={uploadImage}
            styles={{ backgroundPosition: 'bottom' }}
          >
            <section id="landing" className="animate__animated animate__fadeIn">
              <Container maxWidth="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Grid container>
                  <Grid item md={8}>
                    <div className="mb-4">
                      <div className="text-white font-size-h4 mb-4">
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
                    <form onSubmit={this.onAccessCodeSubmit} autoComplete="off" className="login-form mt-10 mb-6 display-flex align-center justify-right">
                      <div className="help-text text-white text-bold">
                        <label id="access-code-label"><EditableText id="access-code" content={content["access-code"]} onSave={this.onSave("access-code")} /></label>
                      </div>
                      <input aria-labelledby="access-code-label" type="text" className="ml-2" id="access-code" onChange={e => this.setState({ accessCode: e.currentTarget.value })} />
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
        <EditableBackgroundImage
          classes="header-bg-image animate__animated animate__fadeIn"
          content={content["landing-bg-image"]}
          onSave={this.onSave("landing-bg-image")}
          uploadImage={uploadImage}
          styles={{ backgroundPosition: 'bottom' }}
        >
          <section id="landing" data-aos="fade-down">
            <Container maxWidth="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Grid container>
                <Grid item md={8}>
                  <div className="mb-4">
                      <div className="text-white font-size-h4 mb-4">
                        <EditableText content={content["landing-subtitle"]} onSave={this.onSave("landing-subtitle")} />
                      </div>
                    </div>
                    <div className="">
                      <h1 className="text-white"><EditableText content={content["landing-title"]} onSave={this.onSave("landing-title")} /></h1>
                    </div>
                </Grid>
              </Grid>
            </Container>
          </section>
        </EditableBackgroundImage>
        <Hidden mdUp>
          <Section id="intro" className={`position-relative bg-dark`}>
            <Grid container className="title" justify="center">
              <Grid item xs={12} sm={10} md={9} lg={8} data-aos="fade-up" >
                <div className="intro-text bg-blue">
                  <EditableParagraph content={content["intro-text"]} onSave={this.onSave("intro-text")} />
                </div>
              </Grid>
            </Grid>
          </Section>
        </Hidden>
        <Hidden smDown>
          <Section id="intro" className={`position-relative bg-light`}>
            <Grid container className="title" justify="center">
              <Grid item xs={12} sm={10} md={9} lg={8} data-aos="fade-up" >
                <div className="intro-text bg-blue">
                  <EditableParagraph content={content["intro-text"]} onSave={this.onSave("intro-text")} />
                </div>
              </Grid>
            </Grid>
          </Section>
        </Hidden>
        <Section id="program-elements">
          <h2>
            <EditableText content={content["program-elements-title"]} onSave={this.onSave("program-elements-title")} />
          </h2>
          <ProgramElements
            content={content["program-elements-collection"]}
            onSave={this.onSave("program-elements-collection")}
          />
        </Section>

        <Section id="logistics">
            <Grid container alignItems="stretch" spacing={4}>
              <Grid item md={7}>
                <div className="">
                  <h2 className="text-bold">
                    <EditableText content={content["logistics-title"]} onSave={this.onSave("logistics-title")} />
                  </h2>
                  <div className="font-size-h4">
                    <EditableText content={content["logistics-description"]} onSave={this.onSave("logistics-description")} />
                  </div>
                </div>
              </Grid>
              <Hidden smDown>
                <Grid item md={5}>
                  <div className="text-white width-100 height-100 display-flex align-center link-area">
                    <EditableParagraph content={content["logistics-details"]} onSave={this.onSave("logistics-details")} />
                  </div>
                </Grid>
              </Hidden>
            </Grid>
        </Section>
          <Hidden mdUp>
            <Section id="logistics-links" className="bg-dark">
              <Grid container>
                <Grid item xs={12}>
                  <div className="bg-dark text-white width-100 height-100 display-flex align-center link-area">
                    <EditableParagraph content={content["logistics-details"]} onSave={this.onSave("logistics-details")} />
                  </div>
                </Grid>
              </Grid>
            </Section>
          </Hidden>

        <Section id="open-space-week">
          <Grid container>
            <Grid item md={8}>
              <h2 className="text-bold">
                <EditableText content={content["open-space-title"]} onSave={this.onSave("open-space-title")} />
              </h2>
              <EditableParagraph classes="font-size-h4" content={content["open-space-description"]} onSave={this.onSave("open-space-description")} />
              <p className="text-small text-bold">{`Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}</p>
            </Grid>

            <Grid item xs={12}>
              <Calendar
                content={content["open-space-events"]}
                onSave={this.onSave("open-space-events")}
              />
            </Grid>
          </Grid>
        </Section>

        <Section id="holding-space-week" className="bg-green text-white">
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
            <Gallery content={content["gallery-collection"]} onSave={this.onSave("gallery-collection")} />
          </Grid>
        </Section>

        <Section id="social" className="bg-blue text-white">
          <Grid container>
            <Grid item md={12}>
              <h2 className="text-bold">
                <EditableText content={content["social-title"]} onSave={this.onSave("social-title")} />
              </h2>
              <div className="hashtags">
                <EditableParagraph classes="font-size-h4" content={content["social-description"]} onSave={this.onSave("social-description")} />
              </div>
            </Grid>

            <Grid item md={12}>
              <div className="mt-10 mb-5">Featured Tweet</div>
              <div className="margin-center max-width-600" data-aos="fade-up">
                <EditableParagraph classes="font-size-h4" content={content["social-featured-tweet"]} onSave={this.onSave("social-featured-tweet")} />
              </div>
            </Grid>
          </Grid>
          <div className="mt-10 mb-5">Twitter Live Feed</div>
          <Grid container>
            <Grid item md={6}>
              <div className="twitter-live-feed mb-4" data-aos="fade-up">
                <EditableParagraph content={content["social-live-feed-1"]} onSave={this.onSave("social-live-feed-1")} />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="twitter-live-feed mb-4" data-aos="fade-up" data-aos-delay={200}>
                <EditableParagraph content={content["social-live-feed-2"]} onSave={this.onSave("social-live-feed-2")} />
              </div>
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


