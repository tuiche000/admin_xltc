import React from 'react'
import { Tag } from 'antd';
import './index.css'
const CheckableTag = Tag.CheckableTag;

export default class HotTags extends React.Component {
  state = {
    selectedTag: "",
  };

  // handleChange(tag, checked) {
  //   const { selectedTags } = this.state;
  //   const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
  //   
  //   this.setState({ selectedTags: nextSelectedTags });
  // }

  componentDidMount() {
    // this.setState({
    //   selectedTags: this.props.tagsKey[0]
    // })
  }

  render() {
    const { tags, title, fnChange } = this.props
    const { selectedTag } = this.state;
    return (
      <div className="HotTags">
        <h6 style={{ marginRight: 8, display: 'inline' }}>{title || `排序方式`}</h6>
        {
          tags.map(item => {
            return (
              <CheckableTag
                key={item.key}
                checked={selectedTag === item.key}
                // onChange={checked => this.handleChange(tag, checked)}
                onChange={checked => {
                  this.setState({
                    selectedTag: item.key
                  })
                  fnChange(item.key)
                }}
              >
                {item.name}
              </CheckableTag>
            )
          })
        }
      </div>
    );
  }
}