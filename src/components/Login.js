import React, { useState } from 'react'
import { Form, Button, Card } from "react-bootstrap"
import { getAuth, signInWithEmailAndPassword   } from 'firebase/auth'
import { Container } from "react-bootstrap"
import {  Link , useHistory } from "react-router-dom"

const auth = getAuth();
function Signup() {

    const [ email , setEmail ] = useState( '' );
    const [ password , setPassword ] = useState( '' );
    const history = useHistory()

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        try {
            await signInWithEmailAndPassword ( auth , email , password );
            history.push("/")
        } catch(err) {
            console.log( "Error while signup " , err )
        }   

    }

    const handleInputEmail = ( e ) => {
        console.log( e.target.value );
        setEmail(  e.target.value );
    }

    const handleInputPassword = ( e ) => {
        console.log( e.target.value );
        setPassword(  e.target.value );
    }

    return (
        <>
        <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login  </h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange = { (e) => handleInputEmail(e) } required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"   onChange = { (e) => handleInputPassword(e) } required />
                        </Form.Group>
                        <Button className="w-100" type="submit"  style={{ marginTop: 5 }}  >
                            Login
                        </Button>
                        <Link to="/signup" ><Button className="w-100" style={{ marginTop: 5 }}  >
                            Sign Up
                        </Button></Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </Container>
        </>
    )
}

export default Signup
