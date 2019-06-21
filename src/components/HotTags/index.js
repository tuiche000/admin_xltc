import React from 'react'
import { Tag } from 'antd';
import './index.css'
const CheckableTag = Tag.CheckableTag;

export default class HotTags extends React.Component {
  state = {
    selectedTags: [
    ],
  };

  // handleChange(tag, checked) {
  //   const { selectedTags } = this.state;
  //   const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
  //   
  //   this.setState({ selectedTags: nextSelectedTags });
  // }

  componentDidMount() {
    this.setState({
      selectedTags: this.props.tagsKey[0]
    })
  }

  render() {
    const { tagsKye, tagsVal, title, fnChange } = this.props
    const { selectedTags } = this.state;
    return (
      <div className="HotTags">
        <h6 style={{ marginRight: 8, display: 'inline' }}>{title || `排序方式`}</h6>
        {tagsKye && tags.map(key => {
          return (
            <CheckableTag
              key={key}
              checked={selectedTags.indexOf(key) > -1}
              // onChange={checked => this.handleChange(tag, checked)}
              onChange={checked => {
                this.setState({
                  selectedTags: key
                })
                fnChange(key)
              }}
            >
              {tagsVal[key]}
            </CheckableTag>
          )
        })}
      </div>
    );
  }
}