import React, {Component} from 'react';

import Dialog from '../components/Dialog';
import Table from '../components/Table';
import Page from '../components/Page';
import Form from '../components/Form';
import Tabs from '../components/Tabs';

import fetchJson from '../utils/fetch';

class Car extends Component{
  constructor(...args){
    super(...args);

    this.state={
      datas: [],

      showAddDialog: false,
      showDelConfirm: false,
      showModDialog: false,

      id_to_delete: 0,

      page_count: 0,
      cur_page: 1,

      mod_id: 0,
      mod_title: '',
      mod_price: 0,
      mod_description: ''
    };
  }

  hideAddDialog(){
    this.setState({
      showAddDialog: false
    });
  }

  async componentDidMount(){
    //获取车辆信息
    let datas=await fetchJson('api/carlist/1');

    //获取车辆页数
    let count=await fetchJson('api/car_page');

    this.setState({
      datas,
      page_count: count,
    })
  }

  async loadPage(page){
    let datas=await fetchJson(`api/carlist/${page}`);

    this.setState({
      cur_page: page,
      datas
    });
  }

  async pageChange(page){
    await this.loadPage(page);
  }

  hideDelConfirm(){
    this.setState({
      showDelConfirm: false
    });
  }


  deleteCar(id){
    this.setState({
      showDelConfirm: true,
      id_to_delete: id
    })
  }

  async doDelete(){
    let id=this.state.id_to_delete;

    await fetchJson(`api/car/${id}`, {
      method: 'DELETE'
    });

    await this.loadPage(this.state.cur_page);

    this.setState({
      showDelConfirm: false
    });
  }

  showAddDialog(){
    this.setState({
      showAddDialog: true
    });
  }

  createFeature(arr){
    let result=[];

    arr.forEach(str=>{
      result.push({name: 'feature_name', type: 'hidden', value: str});
      result.push({name: 'feature_value', type: 'text', label: str});
    });

    return result;
  }

  async submit(){
    let form=this.refs.form1.getFormData();
    await fetchJson('api/car', {
      method: 'POST',
      body: form
    });

    await this.loadPage(this.state.cur_page);
    this.setState({
      showAddDialog: false
    });
  }

  hideModDialog(){
    this.setState({
      showModDialog: false
    });
  }

  async modCar(id){
    let car=await fetchJson(`api/car/${id}`);

    this.setState({
      mod_id: id,
      mod_title: car.title,
      mod_price: car.price,
      mod_description: car.description,

      showModDialog: true
    });
  }

  async doMod(){
    let form=this.refs.form2.getFormData();
    await fetchJson(`api/car/${this.state.mod_id}`, {
      method: 'POST',
      body: form
    });

    await this.loadPage(this.state.cur_page);

    this.setState({
      showModDialog: false
    });
  }

  render(){
    return (
      <div>
        <Tabs
          tabs={[
            {text: '焦点图管理', path: '/'},
            {text: '车辆管理', path: '/car', selected: true}
          ]}
        />

        <button className="btn btn-primary" onClick={this.showAddDialog.bind(this)}>添加</button>

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
                {name: 'title', type: 'text', label: '车辆标题', placeholder: '请输入标题'},
                {name: 'price', type: 'text', label: '车辆价格', placeholder: '请输入价格'},
                {name: 'description', type: 'text', label: '描述'},
                {name: 'images', type: 'file', label: '车辆图片', isArray: true},
                ...this.createFeature(['上牌时间', '表显里程', '本车排量', '变速箱', '排放标准', '车辆性质', '车辆颜色', '维修保养', '年检到期', '商业险到期', '交强险到期', '档位个数', '驱动方式', '综合油耗', '车身结构', '发动机缸数', '最大功率', '进气类型'])

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
            close_btn={true}
            shadow={true}
            onClose={this.hideDelConfirm.bind(this)}
          >
            <p>
              请问是否确定要删除
            </p>
            <button type="button" className="btn btn-danger" onClick={this.doDelete.bind(this)}>删除</button>
            <button type="button" className="btn btn-default" onClick={this.hideDelConfirm.bind(this)}>取消</button>
          </Dialog>
        ):''}

        {this.state.showModDialog?(
          <Dialog
            title="修改"
            close_btn={true}
            shadow={true}
            onClose={this.hideModDialog.bind(this)}
          >
            <Form
              ref="form2"
              fields={[
                {name: 'title', type: 'text', label: '标题', value: this.state.mod_title},
                {name: 'price', type: 'text', label: '价格', value: this.state.mod_price},
                {name: 'description', type: 'text', label: '描述', value: this.state.mod_description},
              ]}
              btns={[
                {text: '修改', type: 'primary', onClick: this.doMod.bind(this)},
                {text: '取消', onClick: this.hideModDialog.bind(this)},
              ]}
            />
          </Dialog>
        ):''}

        <Table
          fields={[
            {name: 'title', text: '名称'},
            {name: 'price', text: '价格'},
          ]}

          datas={this.state.datas}

          onDelete={this.deleteCar.bind(this)}
          onModify={this.modCar.bind(this)}
        />

        <Page
          cur={this.state.cur_page}
          count={this.state.page_count}
          onChange={this.pageChange.bind(this)}
        />

      </div>
    );
  }
}

export default Car;
