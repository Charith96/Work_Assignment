import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import swl from 'sweetalert';
import {
  ThemeProvider,
  Container,
  Row,
  Col,
  Stack
} from "react-bootstrap";


const ViewMembers = () => {

  const [members, setMembers] = useState([]);

  //call fetch function
  useEffect(() => {
    fetchData();
  }, []);

  //fetching all members data
  const fetchData = async () => {

    try {

      const response = await axios.get(`http://localhost:8010/v1/members/`);
      if (response.status === 200) {
        //initialized new values to fields 
        setMembers(response.data.members)
      };

    } catch (error) {
      toast(error.response.data.message, { type: toast.TYPE.ERROR });
    }
  };


  //delete member function
  const deleteMember = (id) => {

    swl({
      title: "Are you sure",
      text: "You want to delete this member ?",
      icon: "warning",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8010/v1/members/${id}`).then((res) => {

            swl('Member successfully Deleted', {
              icon: "success",
            });
            //refresh the home page
            fetchData();
          });
        }
      });

  }

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
      <Container className='body-wrapper'>


        <div className='title'>
          <h1><span style={{ border: '2px solid gray' }} />&nbsp;All Members</h1>
        </div>

        <div className='button'>
          <Link id='create' to="/members"><i class="fas fa-user-plus" />&nbsp;Add New Member</Link>
        </div>

        <div className='content'>
          <Row className='text-center row-wrapper'>
            <Col>Name</Col>
            <Col>Address</Col>
            <Col>Country</Col>
            <Col>Register Date</Col>
            <Col>Action</Col>
          </Row>

          {members.map((member) => {
            return (
              <Row className='text-center row-wrapper2' key={member._id}>
                <Col>{member.name}</Col>
                <Col>{member.address}</Col>
                <Col>{member.country}</Col>
                <Col>{member.registerDate.substring(0, 10)}</Col>
                <Col>
                  <Stack gap={2} className="col-md-5 mx-auto">
                    <Link className='btn btn-warning' to={`/members/${member._id}`} id="actionButton"><i class="far fa-edit" />&nbsp;Update Member</Link>
                    <Link className='btn btn-outline-danger' to='' onClick={() => deleteMember(member._id)} id="actionButton1"><i className="far fa-trash-alt" />&nbsp;Delete Member</Link>
                  </Stack>
                </Col>
              </Row>
            )
          })}
        </div>

      </Container>
    </ThemeProvider>
  )
}

export default ViewMembers