import React, {Component} from 'react';

// 参数：
// fields={[
//   {name: 'username', type: 'text', label: '用户名', placeholder: '请输入用户名'},
// ]}
//
// btns={[
//   {text: '登录', type: 'primary', onClick: this.login.bind(this)},
// ]}
class Form extends Component{
  constructor(...args){
    super(...args);

    this.state={
      counts: []
    };
  }

  getInterface(){
    return this.refs.form;
  }

  getFormData(){
    return new FormData(this.refs.form);
  }

  render(){
    this.props.fields||console.error('fields props is required');
    this.props.btns||console.error('btns props is required');

    return (
      <form ref="form">
        {this.props.fields?this.props.fields.map((field,index)=>{
          let id='id_'+Math.floor(Math.random()*10000000);

          if(field.isArray){
            this.state.counts[field.name]=this.state.counts[field.name]||10;
            return (
              <div className="form-group" key={index}>
                <label>{field.label}</label>
                {
                  Array.from(new Array(this.state.counts[field.name])).map((item,index)=>(
                    <input key={id+'_'+index} type={field.type} className="form-control" name={field.name} placeholder={field.placeholder} defaultValue={field.value}/>
                  ))
                }
              </div>
            );
          }else{
            if(field.label){
              return (
                <div className="form-group" key={index}>
                  <label htmlFor={id}>{field.label}</label>
                  <input type={field.type} className="form-control" id={id} name={field.name} placeholder={field.placeholder} defaultValue={field.value}/>
                </div>
              );
            }else{
              return (
                <input type={field.type} className="form-control" id={id} name={field.name} placeholder={field.placeholder} defaultValue={field.value}/>
              );
            }
          }
        }):''}
        <div className="form-group">
          {this.props.btns?this.props.btns.map((btn,index)=>(
            <button key={index} type="button" className={`btn ${btn.type=='primary'?'btn-primary':'btn-default'}`} onClick={btn.onClick}>{btn.text}</button>
          )):''}
        </div>
      </form>
    );
  }
}

export default Form;
