import React from "react";
import Button from "@material-ui/core/Button"
import { connect } from "react-redux";

import GalleryItem from "./GalleryItem"
import BreakpointMasonry from "./BreakpointMasonry"

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
  };
};


class Gallery extends React.Component {
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

  render() {
    const itemsKeys = Object.keys(this.props.content);

    return (
      <div className={`collection mt-6 ${this.props.classes}`}>
        {
          this.props.isEditingPage &&
          <div className="row mb-4">
            <div className="col-12">
              <Button onClick={this.onAddItem} color="default" variant="contained">Add item</Button>
            </div>
          </div>
        }
        <BreakpointMasonry>
          {itemsKeys.reverse().filter(k => this.props.content[k]).map((key,index) => {
            const content = this.props.content[key];
            return(
              <GalleryItem
                index={index}
                content={content}
                onSave={this.onSaveItem(key)}
                onDelete={this.onDeleteItem(key)}
                key={key}
              />
            )
          })}
        </BreakpointMasonry>
      </div>
    );
  }
}

Gallery.defaultProps = {
  content: {},
  classes: "",
  onSave: () => { console.log('Implement a function to save changes') }
}

export default connect(mapStateToProps)(Gallery)

