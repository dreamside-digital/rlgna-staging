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
import headerImage from '../assets/images/header-home.jpg'


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
      <Layout theme={true} location={this.props.location}>
        <EditableBackgroundImage content={content["landing-bg-image"]} onSave={this.onSave("landing-bg-image")} uploadImage={uploadImage}>
          <section id="landing">
            <Container>
              <Grid container>
                <Grid item md={8}>
                  <p className="text-light"><EditableText content={content["landing-subtitle"]} onSave={this.onSave("landing-subtitle")} /></p>
                  <h1 className="text-light"><EditableText content={content["landing-title"]} onSave={this.onSave("landing-title")} /></h1>
                </Grid>
              </Grid>
            </Container>
          </section>
        </EditableBackgroundImage>
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


