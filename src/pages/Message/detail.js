import React from 'react'
import { Form, Drawer, Row, Col, Divider } from 'antd';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};
const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

@Form.create()
export default class regiosForm extends React.Component {
  state = {
    data: {},
  };

  fnNoticeId = async (id) => {
    let data = await window._api.noticeId(id)
    this.setState({
      data
    })
  }

  componentDidMount() {
    this.fnNoticeId(this.props.id)
  }

  render() {
    const { visible, onClose } = this.props;
    const { data } = this.state;
    return (
      <Drawer
        width={640}
        title={`${data.id}详情`}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {/* <p style={{ ...pStyle, marginBottom: 24 }}>{data.id}</p> */}
        <p style={pStyle}>{data.title}</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="问题类型" content={data.noticeType} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="发送日期" content={data.publish} />{' '}
          </Col>
        </Row>
        {/* <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="消息内容"
              content={data.context}
            />
          </Col>
        </Row>
        {/* <Divider />
        <p style={pStyle}>Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="AFX" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p style={pStyle}>Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                  </a>
              }
            />
          </Col>
        </Row> */}
      </Drawer>
    );
  }
}