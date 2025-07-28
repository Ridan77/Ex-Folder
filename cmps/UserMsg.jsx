import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

const demoMsg = {
    type: 'success',
    txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestias, ipsam voluptatibus tempore iste neque.'
}



export function UserMsg() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(closeMsg, 2500)
        })
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return null
    return (
        <section className={`user-msg ${msg.type}`}>

            <h4>{msg.txt}</h4>
            <button onClick={closeMsg} className="close-btn">X</button>
        </section>
    )
}