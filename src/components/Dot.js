import React from 'react'

function Dot(props) {
    return (
        <>
            <div class="card bg-light mb-3" style={{maxWidth: 300}}>
                <div class="card-header">Event</div>
                <div class="card-body">
                    <h5 class="card-title">{props.startingDate}</h5>
                    <p class="card-text"> {props.event} </p>
                </div>
            </div>
        </>
    )
}

export default Dot;