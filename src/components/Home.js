import { collection, onSnapshot, orderBy, query, where, getDocs   } from '@firebase/firestore';
import React, { useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import Dot from './Dot';
import CreateEvent from './CreateEvent'
import { db } from '../firebase'
import { getAuth , signOut} from "firebase/auth";
import Posts from './Posts';
import Pagination from './Pagination'
import { useHistory } from "react-router-dom"

function Home() {
    const [events, setEvents] = useState([{ StartingDate: "NULL", email: "NULL", event: "NULL", id: "123" }])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory();
    
    useEffect(() => {
        const collectionRef = collection(db, "events");
        const q = query(collectionRef, orderBy("timestamp", "desc"))
        const unsub = onSnapshot(q, (snapshot) =>
            setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
        return unsub
    }, []);

    const handleMyEvents = () => {
        const collectionRef = collection(db, "events");
        const q = query(collectionRef, where("email", "==", user.email));
        onSnapshot(q, (snapshot) =>
            setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
    }

    const handleAllEvents = async () => {
        const collectionRef = collection(db, "events");
        try {
            const q = await getDocs(collectionRef);
            setEvents(q.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpcomingEvents = async () => {
        const collectionRef = collection(db, "events");
        try {
            const q = await getDocs(collectionRef);
            let updateEvent = [];
            console.log(Date())
            q.docs.map((doc) => {
                const eventDate = new Date(doc.data().StartingDate);
                console.log(eventDate)
                if (eventDate > new Date()) {
                    updateEvent.push({ ...doc.data(), id: doc.id })
                }
            })
            console.log(updateEvent)
            setEvents(updateEvent)
        } catch (err) {
            console.log(err)
        }
    }

    const handlePastEvents = async () => {
        const collectionRef = collection(db, "events");
        try {
            const q = await getDocs(collectionRef);
            let updateEvent = [];
            console.log(Date())
            q.docs.map((doc) => {
                const eventDate = new Date(doc.data().StartingDate);
                console.log(eventDate)
                if (eventDate < new Date()) {
                    updateEvent.push({ ...doc.data(), id: doc.id })
                }
            })
            console.log(updateEvent)
            setEvents(updateEvent)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful')
            history.push('/login')
          }).catch((error) => {
            console.log('Sign-out Unsuccessful')
          });
    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = events.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            < CreateEvent />
            <Container
                className="d-flex justify-content-center"
                style={{ marginTop: 5 }}
            >
                < button onClick={handleMyEvents} style={{ margin: 5 }} > My Events </button>
                < button onClick={handleAllEvents} style={{ margin: 5 }} > All Events </button>
                < button onClick={handleUpcomingEvents} style={{ margin: 5 }}> Upcoming Events </button>
                < button onClick={handlePastEvents} style={{ margin: 5 }} > Past Events </button>
                < button onClick={ handleSignOut } style={{ margin: 5 }} > SignOut </button>
            </Container>

            <Posts events={currentPosts} loading={loading} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={events.length}
                paginate={paginate}
            />
            {/* Add signOut */}
        </>
    )
}

export default Home;