import React from "react";
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet";
import { connect } from "react-redux";
import withRoot from '../utils/withRoot';

import Notification from "../components/notifications/Notification";
import AccountButton from "../components/navigation/AccountButton"
import Footer from "../components/navigation/Footer"
import Header from "../components/navigation/Header"
import CreatePageModal from "../components/editing/CreatePageModal";

import {
  EditablesContext,
  theme
} from 'react-easy-editables';

import {
  setPages,
} from "../redux/actions"

import "../assets/sass/less-cms/base.scss";
import "../assets/sass/custom.scss";

import favicon from '../assets/images/icon.png'

export const editorTheme = {
  ...theme,
  primaryColor: "#44968d",
  editContainerHighlight: {
    ...theme.editContainerHighlight,
    outline: "1px solid #44968d",
  },
  actions: {
    ...theme.actions,
    backgroundColor: "#44968d",
  }
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: '1'
  }
}

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
    pageData: state.page.data,
    pages: state.pages.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPages: pages => {
      dispatch(setPages(pages));
    }
  };
};


class DefaultLayout extends React.Component {
  componentDidMount() {
    this.props.setPages(this.props.allPages)
  }

  render() {
    const { props } = this;
    const themeClass = props.theme === "gray" ? "theme-gray" : "theme-light"
    return(
      <div style={styles.container} className={`nl-page ${props.className || ""} ${themeClass}`}>
        <Helmet>
          <title>
            {this.props.data.site.siteMetadata.title}
          </title>
          <meta
            charSet="utf-8"
            description={this.props.data.site.siteMetadata.description}
            keywords=""
            viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
          />
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Helmet>
        <Notification />
        <AccountButton />

        <EditablesContext.Provider value={ { theme: editorTheme, showEditingControls: props.isEditingPage } }>
          <div className="page-wrapper">
            <Header { ...props } />
            <main>{props.children}</main>
            <Footer { ...props } />
          </div>
          <CreatePageModal />
        </EditablesContext.Provider>
      </div>
    )
  }
}

const LayoutContainer = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              id
              title
              slug
              next
              head
              content
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            url
          }
        }
      }
    `}
    render={data => {
      const pagesArr = data.allPages.edges.map(edge => edge.node);
      const pages = pagesArr.reduce((obj, page) => {
        obj[page.id] = page
        return obj
      }, {})

      return(
        <DefaultLayout data={data} allPages={pages} {...props} />
      )
    }}
  />
)

export default withRoot(connect(mapStateToProps, mapDispatchToProps)(LayoutContainer));

