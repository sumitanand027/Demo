import React, { useState } from 'react'
import { Form ,Container } from "react-bootstrap"
import { collection, addDoc , serverTimestamp} from "firebase/firestore"; 
import {db} from '../firebase'
import { getAuth } from "firebase/auth";
import {  useHistory } from "react-router-dom"

function CreateEvent() {
    var curdate = new Date();
    const [ event , setEvent ] = useState('');
    const [ eventDate , setEventDate ] = useState({
        date: curdate
    });
    const history = useHistory()

    const auth = getAuth();
    const user = auth.currentUser;

    const handleInputEvent = (e) => {
        setEvent( e.target.value );
    }

    const handleInputDate = (e) => {
        console.log( e.target.value );
        setEventDate(  e.target.value )
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, "events"), {
                email: user.email,
                StartingDate : eventDate,
                event: event,
                timestamp: serverTimestamp()
              });
              history.push("/")
        } catch ( err ) {
            console.log( err )
        }
    }

    return (
        <>
            <Container
                className="d-flex justify-content-center"
                style={{ minHeight: "20vh" , marginTop: 10}}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Form onSubmit = {handleSubmit } >
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Event Name" onChange = { (e) => handleInputEvent(e) } />
                            </div>
                            <div className="col">
                                <input type="date" className="form-control" placeholder="Last name" onChange = { (e) => handleInputDate(e) } />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style= {{marginTop:3 , marginLeft: 10}}   >Create</button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default CreateEvent
