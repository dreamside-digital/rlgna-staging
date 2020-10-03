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

    this.props.onLoadPageData(initialPageData);
  }

  onSave = id => content => {
    this.props.onUpdatePageData("home", id, content);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout theme="gray" location={this.props.location}>
        <EditableBackgroundImage content={content["landing-bg-image"]} onSave={this.onSave("landing-bg-image")} uploadImage={uploadImage}>
          <section id="landing">
            <Container>
              <Grid container className="title">
                <Grid item md={8}>
                  <div className="mb-4">
                    <h3 className="text-light display-inline bg-black text-bold">
                      <EditableText content={content["landing-subtitle"]} onSave={this.onSave("landing-subtitle")} />
                    </h3>
                  </div>
                  <div className="">
                    <h1 className="text-light display-inline bg-black"><EditableText content={content["landing-title"]} onSave={this.onSave("landing-title")} /></h1>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>
        </EditableBackgroundImage>
        <section id="intro" className="position-relative pb-10">
          <Container>
            <Grid container className="title" justify="center">
              <Grid item md={8}>
                <div className="bg-black p-10 text-white mt--10">
                  <EditableParagraph content={content["intro-text"]} onSave={this.onSave("intro-text")} />
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
        <section id="program-elements">
          <Container>
            <Grid container className="position-relative">
              <Grid item md={8}>
                <h2 className="text-bold max-width-200">
                  <EditableText content={content["program-elements-title"]} onSave={this.onSave("program-elements-title")} />
                </h2>
              </Grid>
              <Grid item md={4} className="display-flex">
                <div className="black-underline" />
              </Grid>
            </Grid>
            <div className="program-box mt-15">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h4 className="text-bold max-width-200">
                    <EditableText content={content["program-box-title-1"]} onSave={this.onSave("program-box-title-1")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-1"]} onSave={this.onSave("program-box-date-1")} />
                  </h3>
                </Grid>
                <Grid item md={8}>
                  <p className="text-dark">
                    <EditableText content={content["program-box-state-1"]} onSave={this.onSave("program-box-state-1")} />
                  </p>
                  <p>
                    <EditableParagraph content={content["program-box-desc-1"]} onSave={this.onSave("program-box-desc-1")} />
                  </p>
                </Grid>
              </Grid>
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h4 className="text-bold max-width-200">
                    <EditableText content={content["program-box-title-2"]} onSave={this.onSave("program-box-title-2")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-2"]} onSave={this.onSave("program-box-date-2")} />
                  </h3>
                </Grid>
                <Grid item md={8}>
                  <p className="text-blue">
                    <EditableText content={content["program-box-state-2"]} onSave={this.onSave("program-box-state-2")} />
                  </p>
                  <p>
                    <EditableParagraph content={content["program-box-desc-2"]} onSave={this.onSave("program-box-desc-2")} />
                  </p>
                </Grid>
              </Grid>
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h4 className="text-bold max-width-200">
                    <EditableText content={content["program-box-title-3"]} onSave={this.onSave("program-box-title-3")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-3"]} onSave={this.onSave("program-box-date-3")} />
                  </h3>
                </Grid>
                <Grid item md={8}>
                  <p className="text-blue">
                    <EditableText content={content["program-box-state-3"]} onSave={this.onSave("program-box-state-3")} />
                  </p>
                  <p>
                    <EditableParagraph content={content["program-box-desc-3"]} onSave={this.onSave("program-box-desc-3")} />
                  </p>
                </Grid>
              </Grid>
            </div>
            <div className="program-box">
              <Grid container className="position-relative">
                <Grid item md={4}>
                  <h4 className="text-bold max-width-200">
                    <EditableText content={content["program-box-title-4"]} onSave={this.onSave("program-box-title-4")} />
                  </h4>
                  <h3>
                    <EditableText content={content["program-box-date-4"]} onSave={this.onSave("program-box-date-4")} />
                  </h3>
                </Grid>
                <Grid item md={8}>
                  <p className="text-blue">
                    <EditableText content={content["program-box-state-4"]} onSave={this.onSave("program-box-state-4")} />
                  </p>
                  <p>
                    <EditableParagraph content={content["program-box-desc-4"]} onSave={this.onSave("program-box-desc-4")} />
                  </p>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
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


