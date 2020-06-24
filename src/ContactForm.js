import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Container, Alert, Table, Row, Col  } from 'reactstrap';
import validator from "validator";
import { Textbox } from 'react-inputs-validation';

export default class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            phone: '',
            image : '',
            empty:false,
            data:[],
            editid:0,
            contacts:[],
            load:false
        }
    }

    componentDidMount(){

        this.getContacts();
    }

    

    submitForm = () => {
        const {name, email, phone, image} = this.state;

        if(name && email && phone && image) {

            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('image', image);

            // let contactInfo = {
            //     name: name,
            //     email: email,
            //     phone: phone
            // }

            //console.log(contactInfo)

            fetch('http://localhost/projects/react-php-curd/api/api/contact', {
                method: 'POST',
                body: formData
            })
            .then(res=> res.json())
            .then(fres=>{
                console.log(fres)
                if(fres){
                    this.getContacts();
                    this.setState({
                        name:'',
                        email:'',
                        phone:'',
                        image:''
                    })
                }
            }).catch(err =>{
                console.log(err)
            })

        }else {

            this.setState({
                empty:true
            })
        }
    }

    
    removeMe = (id) => {

        let data = {
            'id' : id
        }

        fetch('http://localhost/projects/react-php-curd/api/api/contactdelete', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(fres=>{
                if(fres){
                    console.log(fres)
                    this.getContacts();
                }
            }).catch(err =>{
                console.log(err)
            })
    }

    editMe = (data, id) => {

        this.setState({
            name : data.name,
            email: data.email,
            phone: data.phone,
            image: data.image,
            editid: id
        })

    }

    updateRecord = (id) => {

        const {name, email, phone, image} = this.state;

        if(name && email && phone && image) {

            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('image', image);

            formData.append('id', id);

            fetch('http://localhost/projects/react-php-curd/api/api/updatecontact', {
                method: 'POST',
                body: formData
            })
            .then(res=> res.json())
            .then(fres=>{
                console.log(fres)
                if(fres){
                    this.getContacts();
                    this.setState({
                        name:'',
                        email:'',
                        phone:'',
                        image:'',
                        editid:0
                    })
                }
            }).catch(err =>{
                console.log(err)
            })

        }


    }

    updatePhoto = (image)=>{
        console.log(image)
        this.setState({image})
    }

    getContacts = () => {

        fetch('http://localhost/projects/react-php-curd/api/api/contacts')
        .then(res=> res.json())
        .then(fres=>{
            this.setState({
                load:true,
                contacts:fres
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    render() {

        return (
            <Container>
                {this.state.empty &&
                    <Alert color="info">
                        Please fill all inputs!
                    </Alert>
                }
                <Form>
                    <FormGroup>
                        <Label for="exampleName">Email</Label>
                        <Textbox
                            attributesInput={{
                                id: 'Name',
                                name: 'Name',
                                type: 'text',
                                placeholder: 'Enter your Name',
                            }}
                            value={this.state.name}
                            onChange={(name, e) => {
                                this.setState({ name });
                            }} 
                            onBlur={(e) => {}} 
                            validationOption={{
                                name: 'Name',
                                check: true, 
                                required: true
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Textbox
                            attributesInput={{
                                id: "email",
                                placeholder: "Place your email here",
                                type: "text"
                            }}
                            value={this.state.email}
                            onChange={(email, e) => {
                                this.setState({ email });
                            }}
                            onBlur={e => {}}
                            validationOption={{
                                name: "email", 
                                check: true,
                                required: true,
                                customFunc: email => {
                                const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if (reg.test(String(email).toLowerCase())) {
                                    return true;
                                } else {
                                    return "is not a valid email address";
                                }
                                }
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleMobile">Mobile</Label>
                        <Textbox
                            attributesInput={{
                                id: "phone",
                                placeholder: "Place your phone here",
                                type: "text"
                            }}
                            value={this.state.phone}
                            onChange={(phone, e) => {
                                this.setState({ phone });
                            }}
                            onBlur={e => {}}
                            validationOption={{
                                name: "phone",
                                check: true,
                                required: true,
                                customFunc: phone => {
                                if (validator.isMobilePhone(phone, "en-US")) {
                                    return true;
                                } else {
                                    return "is not a valid phone number";
                                }
                                }
                            }}
                            />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleImage">Image</Label>
                        <input type="file" onChange={(e)=>this.updatePhoto(e.target.files[0])} />
                    </FormGroup>

                    {this.state.editid === 0 &&
                        <Button onClick={this.submitForm}>Submit</Button>
                    }

                    {this.state.editid > 0 &&
                        <Button onClick={()=>this.updateRecord(this.state.editid)}>Update</Button>
                    }

                    
                </Form>
                        <Row style={{marginTop:"20px"}}>
                            <Col lg="12">
                            {this.state.load && this.state.contacts.length > 0 &&
                                <Table>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.contacts.map((item, index)=>{
                                                let image_is = require('./placeholder.jpg');
                                                if(item.image){
                                                     image_is = item.image;
                                                }
                                                return (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.name}</td>
                                                        <td><img src={image_is} alt={item.name} style={{width:'100px'}} /></td>
                                                        <td>{item.email}</td>
                                                        <td>{item.mobile}</td>
                                                        <td><span onClick={()=>this.removeMe(item.id)}>Delete</span> | 
                                                        <span  onClick={()=>this.editMe(item, item.id)}> Edit</span></td>
                                                    </tr>
                                                )
                                            })
                                                
                                        }
                                    </tbody>
                                </Table>
                            }  

                            {this.state.contacts.length ===0 &&
                                <h2>Records not Found!</h2>
                            }

                            </Col>
                        </Row>
                    </Container>
        )
    }
}
