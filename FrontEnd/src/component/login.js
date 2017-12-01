/**
 * Created by chenzhongying on 2017/10/23.
 */
import React from 'react';
import {hashHistory} from 'react-router';
import {
    Form,
    FormCell,
    CellHeader,
    CellBody,
    CellFooter,
    Label,
    Input,
    ButtonArea,
    Button,
    Icon
} from 'react-weui/build/packages';
//import styles
import 'weui';
import weui from 'weui.js';
import '../css/login.css';

var url = 'http://localhost';

var loading;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            code: '',
            time : Math.random()
        }
    }
    codeChange(){
        this.setState({
            time: Math.random()
        });
    }
    handleChange(mark, event) {
        if (mark === 'name') {
            this.setState({
                name: event.target.value
            })
        } else if (mark === 'password') {
            this.setState({
                password: event.target.value
            })
        } else if (mark == 'code') {
            this.setState({
                code: event.target.value
            })
        }
    };

    handleSubmit() {
        if (!this.state.name) {
            weui.alert('请填写用户名');
        } else if (!this.state.password) {
            weui.alert('请填写密码');

        } else if(!this.state.code){
            weui.alert('请填写验证码');
        }else {
            loading = weui.loading('loading', {
                className: 'custom-classname'
            });
           $.ajax({
               url:url+'/Login/CheckLogin',
               data: 'username=' + this.state.name + '&password=' +  $.md5($.trim(this.state.password)) + '&code=' + this.state.code,
               type:'POST',
               complete:function(response){
                   loading.hide();
                   response = JSON.parse(response.responseText);
                    setTimeout(function(){
                        if(response.state == 'success'){
                            hashHistory.push('/home/operate');
                        }else{
                            weui.alert(response.message);
                        }
                    },500);

               }
           })
        }

    };

    render() {
        return (
            <div>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>用户名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" onChange={this.handleChange.bind(this, 'name')}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" onChange={this.handleChange.bind(this, 'password')}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" onChange={this.handleChange.bind(this, 'code')}/>
                        </CellBody>
                        <CellFooter>
                            <img src={url+"/Login/GetAuthCode?time="+this.state.time}alt="" onClick={this.codeChange.bind(this)}/>
                        </CellFooter>
                    </FormCell>
                    <ButtonArea>
                        <Button onClick={this.handleSubmit.bind(this)}>
                            OK
                        </Button>
                    </ButtonArea>
                </Form>
            </div>
        )
    }
}

export default Login;