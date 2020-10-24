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
import Hashtags from "../components/common/Hashtags"


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
    isEditingPage: state.adminTools.isEditingPage,
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
      tweets: [],
      tweetCount: 2
    }

    this.props.onLoadPageData(initialPageData);
  }

  componentDidMount() {
    this.loadTwitterFeed()
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageData?.content?.hashtags !== prevProps.pageData?.content?.hashtags) {
      this.loadTwitterFeed()
    }
  }

  loadTwitterFeed = () => {
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);
    const hashtags = Object.values(content["hashtags"]).filter(t => t?.text)
    const query = hashtags
                    .map(t => `tweets[]=${encodeURIComponent(t.text)}`)
                    .join('&')

    console.log(`Loading Twitter feed for query: ${query}`)
    fetch(`https://us-central1-rlgna-staging.cloudfunctions.net/tweets?${query}`, {
      headers: {
        'Accept': 'application/json'
      },
    }).then(response => response.json())
      .then(data => this.setState({ tweets: data.statuses.filter(t => !t.retweeted_status) }))
      .catch(e => console.error(e));
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
                <Hidden smDown>
                <Grid container justify="flex-end">
                  <Grid item xs={12} md={8}>
                    <form onSubmit={this.onAccessCodeSubmit} autoComplete="off" className="login-form mt-10 mb-6 display-flex align-center justify-right">
                      <div className="help-text text-white text-bold">
                        <label id="access-code-label"><EditableText id="access-code" content={content["access-code"]} onSave={this.onSave("access-code")} /></label>
                      </div>
                      <input aria-labelledby="access-code-label" type="text" className="ml-2" id="access-code" onChange={e => this.setState({ accessCode: e.currentTarget.value })} />
                      <input type="submit" value="Enter site" className="btn ml-2" />
                    </form>
                  </Grid>
                </Grid>
                </Hidden>
              </Container>
            </section>
          </EditableBackgroundImage>
          <Hidden mdUp>
            <section id="login-mobile" className="bg-light">
              <Container>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <form onSubmit={this.onAccessCodeSubmit} autoComplete="off" className="login-form mt-10 mb-6 display-flex flex-column">
                      <div className="help-text text-white text-bold mb-2">
                        <label id="access-code-label"><EditableText id="access-code" content={content["access-code"]} onSave={this.onSave("access-code")} /></label>
                      </div>
                      <input aria-labelledby="access-code-label" type="text" className="ml-2" id="access-code" onChange={e => this.setState({ accessCode: e.currentTarget.value })} />
                      <input type="submit" value="Enter site" className="btn ml-2" />
                    </form>
                  </Grid>
                </Grid>
              </Container>
            </section>
          </Hidden>
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

        <Section id="intro" className={`position-relative bg-blue`}>
          <Grid container className="title" justify="flex-start" data-aos="fade-up">
            <Grid item xs={12} md={8}>
              <h2 className="text-white">
                <EditableText content={content["intro-title"]} onSave={this.onSave("intro-title")} />
              </h2>
              <EditableParagraph classes="text-white" content={content["intro-text"]} onSave={this.onSave("intro-text")} />
            </Grid>
          </Grid>
          <Grid container className="title" justify="flex-end" data-aos="fade-up">
          </Grid>
        </Section>

        <Section id="program-elements">
          <h2>
            <EditableText content={content["program-elements-title"]} onSave={this.onSave("program-elements-title")} />
          </h2>
          <ProgramElements
            content={content["program-elements-collection"]}
            onSave={this.onSave("program-elements-collection")}
          />
        </Section>

        <Section id="logistics" className="bg-white">
          <Grid container>
            <Grid item xs={12} md={8}>
              <div className="">
                <h2 className="text-bold">
                  <EditableText content={content["logistics-title"]} onSave={this.onSave("logistics-title")} />
                </h2>
                <div className="font-size-h4">
                  <EditableText content={content["logistics-description"]} onSave={this.onSave("logistics-description")} />
                </div>
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
            <Grid item xs={12}>
              <h2 className="text-bold">
                <EditableText content={content["social-title"]} onSave={this.onSave("social-title")} />
              </h2>
              <Hashtags
                content={content["hashtags"]}
                onSave={this.onSave("hashtags")}
              />
            </Grid>

            <Grid item xs={12}>
              <div className="mt-10 mb-5">Featured Tweet</div>
              <div className="margin-center max-width-600" data-aos="fade-up">
                <EditableParagraph classes="font-size-h4" content={content["social-featured-tweet"]} onSave={this.onSave("social-featured-tweet")} />
              </div>
            </Grid>
          </Grid>
          <div className="mt-10 mb-5">Twitter Live Feed</div>
          <Grid container>
            {
              this.state.tweets.slice(0, this.state.tweetCount).map(tweet => (
                <Grid item md={6} key={tweet.created_at}>
                  <div className="twitter-live-feed mb-4" data-aos="fade-up" dangerouslySetInnerHTML={{__html: tweet.full_text}}>
                  </div>
                </Grid>
              ))
            }
            {
              this.state.tweetCount < this.state.tweets.length &&
              <Grid container justify="center" className="mt-6">
                <Grid item>
                  <button className="btn" onClick={() => this.setState({tweetCount: this.state.tweetCount + 2})}>Load more
                  </button>
                </Grid>
              </Grid>
            }
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


