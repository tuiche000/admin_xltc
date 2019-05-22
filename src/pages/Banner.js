import React, {Component} from 'react';

import Table from '../components/Table';
import Page from '../components/Page';
import Dialog from '../components/Dialog';
import Form from '../components/Form';
import Tabs from '../components/Tabs';

import fetchJson from '../utils/fetch';

class Banner extends Component{
  constructor(...args){
    super(...args);

    this.state={
      datas: [],
      showAddDialog: false,
      showDelConfirm: false,
      showModDialog: false,

      mod_id: 0,
      mod_title: '',
      mod_sub_title: '',
    };
  }

  async loadBanner(){
    let data=await fetchJson('api/banner');

    this.setState({
      datas: data,
    });
  }

  async componentDidMount(){
    // await this.loadBanner();
  }

  fnDelete(id){
    this.id_to_delete=id;
    this.setState({
      showDelConfirm: true
    })
  }

  fnModify(id){
    let mod_data=null;
    this.state.datas.forEach(data=>{
      if(data.ID==id){
        mod_data=data;
      }
    })

    this.setState({
      showModDialog: true,
      mod_id: id,
      mod_title: mod_data.title,
      mod_sub_title: mod_data.sub_title
    });
  }

  showAddDialog(){
    this.setState({showAddDialog: true});
  }
  hideAddDialog(){
    this.setState({showAddDialog: false});
  }

  showModDialog(){
    this.setState({
      showModDialog: true
    });
  }
  hideModDialog(){
    this.setState({
      showModDialog: false
    });
  }

  async submit(){
    let form=this.refs.form1.getFormData();
    await fetchJson('api/banner', {
      method: 'POST',
      body: form
    });

    alert('添加成功');

    this.hideAddDialog();
    await this.loadBanner();
  }

  async submitMod(){
    let id=this.state.mod_id;
    let form=this.refs.form_mod.getFormData();

    await fetchJson(`api/banner/${id}`, {
      method: 'POST',
      body: form
    });

    alert('修改成功');

    this.hideModDialog();
    await this.loadBanner();
  }

  async doDelete(){
    let id=this.id_to_delete;
    delete this.id_to_delete;

    await fetchJson(`api/banner/${id}`, {
      method: 'DELETE'
    });

    this.setState({
      showDelConfirm: false
    });
    await this.loadBanner();
  }

  render(){
    return (
      <div>
        <Tabs
          tabs={[
            {text: '焦点图管理', path: '/', selected: true},
            {text: '车辆管理', path: '/car'}
          ]}
        />
        <button className="btn btn-primary" onClick={this.showAddDialog.bind(this)}>添加</button>
        <Table
          fields={[
            {name: 'title', text: '标题'},
            {name: 'sub_title', text: '副标题'},
          ]}

          datas={this.state.datas}

          onDelete={this.fnDelete.bind(this)}
          onModify={this.fnModify.bind(this)}
        />

        {this.state.showAddDialog?(
          <Dialog
            title="添加"
            shadow={true}
            close_btn={true}
            onClose={this.hideAddDialog.bind(this)}
          >
            <Form
              ref="form1"
              fields={[
                {name: 'title', type: 'text', label: '标题', placeholder: '请输入标题'},
                {name: 'sub_title', type: 'text', label: '副标题', placeholder: '请输入副标题'},
                {name: 'image', type: 'file', label: '图片'},
              ]}

              btns={[
                {text: '添加', type: 'primary', onClick: this.submit.bind(this)},
                {text: '取消', onClick: this.hideAddDialog.bind(this)},
              ]}
            />
          </Dialog>
        ):''}

        {this.state.showDelConfirm?(
          <Dialog
            title="确认"
            shadow={true}
            close_btn={true}
            onClose={()=>{
              this.setState({
                showDelConfirm: false
              })
            }}
          >
            请确认是否真的要删除
            <div>
              <button className="btn btn-danger" onClick={this.doDelete.bind(this)}>删除</button>
              <button className="btn btn-default" onClick={()=>{
                this.setState({
                  showDelConfirm: false
                })
              }}>取消</button>
            </div>
          </Dialog>
        ):''}

        {this.state.showModDialog?(
          <Dialog
            title="修改"
            shadow={true}
            close_btn={true}
            onClose={this.hideModDialog.bind(this)}
          >
            <Form
              ref="form_mod"
              fields={[
                {name: 'title', type: 'text', label: '标题', placeholder: '请输入标题', value: this.state.mod_title},
                {name: 'sub_title', type: 'text', label: '副标题', placeholder: '请输入副标题', value: this.state.mod_sub_title},
                {name: 'image', type: 'file', label: '图片'},
              ]}

              btns={[
                {text: '修改', type: 'primary', onClick: this.submitMod.bind(this)},
                {text: '取消', onClick: this.hideModDialog.bind(this)},
              ]}
            />
          </Dialog>
        ):''}
      </div>
    );
  }
}

export default Banner;
