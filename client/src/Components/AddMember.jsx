import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    ThemeProvider,
    Container,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";


const AddMember = () => {
    const [values, setValues] = useState({
        id: "",
        name: "",
        country: "",
        address: ""
    });

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required('Id is required number*'),
        name: Yup.string()
            .required('Name is required*')
            .min(5, 'Name must be at least 5 characters*'),
        country: Yup.string()
            .required('Country is required*'),
        address: Yup.string()
            .required('Address is required*')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors } = formState;
    const [countries, setCounties] = useState([]);


    //call fetch function
    useEffect(() => {
        fetchCountry();
    }, []);

    //fetching countries
    const fetchCountry = async () => {

        try {            
            const response = await axios.get(`http://localhost:8010/v1/countries/`);
            if (!response.data.error) setCounties(response.data.countries);

        } catch (error) {            
            toast(error.response.data.message, { type: toast.TYPE.ERROR });
        }
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };


    const onSubmit = async (data) => {

        try {

            const response = await axios.post(`http://localhost:8010/v1/members/`, data);

            if (response.status === 201) {
                toast(response.data.message, { type: toast.TYPE.SUCCESS });
                reset();

                // setTimeout to 2.5s and navigate back to ViewMember page
                setTimeout(() => {
                    window.location = "/";
                }, 2500);
                setTimeout();
            }

        } catch (error) {
            toast(error.response.data.message, { type: toast.TYPE.ERROR });
            //toast.error("You have an Error in Adding members 🛑");
        }
    }


    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container className='body-wrapper'>
                <div className='title'>
                    <h1><span style={{ border: '2px solid gray' }} />&nbsp;Add Members</h1>
                </div>

                <div className='content'>
                    <Row>
                        <Col />
                        <Col id='form'>                            
                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-id-card" />
                                    </span>
                                    <input
                                        name="id"
                                        type="number"
                                        placeholder="ID Number"
                                        // value={values.id}
                                        onChange={handleChange}
                                        {...register('id')}
                                        className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">{errors.id?.message}</div>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-user" />
                                    </span>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                        // value={values.name}
                                        {...register('name')}
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.name?.message}</div>
                                </div>

                                <div class="input-group mb-3">
                                    <label className="input-group-text" for="inputGroupSelect01">
                                        <i className="fas fa-flag" />
                                    </label>
                                    <select
                                        name="country"
                                        // value={values.country}
                                        onChange={handleChange}
                                        {...register('country')}
                                        className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Select Country</option>

                                        {/* retrieve countries in country collection */}
                                        {countries.map((country, key) => {
                                            return (
                                                <option value={country.name} >{country.name}</option>
                                            );
                                        })}
                                    </select>
                                    <div className="invalid-feedback">{errors.country?.message}</div>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-map-marker-alt" />
                                    </span>
                                    <textarea
                                        name="address"
                                        type="text"
                                        rows={1}
                                        placeholder="Address"
                                        onChange={handleChange}
                                        // value={values.address}
                                        {...register('address')}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">{errors.address?.message}</div>
                                </div>

                                <Row style={{ marginTop: '40px' }}>
                                    <Col>
                                        <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                            Create
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col />
                    </Row>
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default AddMember