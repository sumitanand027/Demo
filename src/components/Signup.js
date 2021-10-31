import React, { useState } from 'react'
import { Form, Button, Card } from "react-bootstrap"
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth'
import { Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"

const auth = getAuth();
function Signup() {

    const [ email , setEmail ] = useState( '' );
    const [ password , setPassword ] = useState( '' );
    const [ confirmpassword , setConfirmpassword ] = useState( '' );
    const history = useHistory()

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        if( confirmpassword !== password ) {
            console.log( 'wrong input')
            return alert( 'wrong input' );
        }

        try {
            await createUserWithEmailAndPassword( auth , email , password );
        } catch(err) {
            console.log( "Error while signup " , err )
        }   
        history.push('/')
    }

    const handleInputEmail = ( e ) => {
        console.log( e.target.value );
        setEmail(  e.target.value );
    }

    const handleInputPassword = ( e ) => {
        console.log( e.target.value );
        setPassword(  e.target.value );
    }

    const handleInputConfirmPassword = ( e ) => {
        console.log( e.target.value );
        setConfirmpassword(  e.target.value );
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
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange = { (e) => handleInputEmail(e) } required />
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"   onChange = { (e) => handleInputPassword(e) } required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password"  onChange = { (e) => handleInputConfirmPassword(e) } required />
                        </Form.Group>
                        <Button className="w-100" type="submit"  >
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </Container>
        </>
    )
}

export default Signup