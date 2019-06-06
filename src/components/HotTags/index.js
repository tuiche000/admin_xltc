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
  //   console.log('You are interested in: ', nextSelectedTags);
  //   this.setState({ selectedTags: nextSelectedTags });
  // }

  componentDidMount() {
    this.setState({
      selectedTags: this.props.tagsFromServer[0]
    })
  }

  render() {
    const { tagsFromServer, title, fnChange } = this.props
    const { selectedTags } = this.state;
    return (
      <div className="HotTags">
        <h6 style={{ marginRight: 8, display: 'inline' }}>{title || `排序方式`}</h6>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            // onChange={checked => this.handleChange(tag, checked)}
            onChange={checked => {
              this.setState({
                selectedTags: [tag]
              })
              fnChange(tag)
            }}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}