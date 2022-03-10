import { useState } from "react"
import { participantState } from '../App'

type FormProps = {
    participant: participantState['participant']
    setParticipant: React.Dispatch<React.SetStateAction<participantState['participant']>>
}

export const Form = ({ participant, setParticipant }: FormProps) => {

    const [input, setInput] = useState({
        name: "",
        age: "",
        note: ""
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setParticipant([
            ...participant,
            {
                name: input.name,
                age: parseInt(input.age),
                note: input.note
            }
        ]);
        input.name='';
        input.age='';
        input.note='';
    }

  return (
    <div className="container col-lg-3">
        <h1 className="my-3">Event Participant Registration</h1>
        <form onSubmit={onSubmitHandler}>
            <input className="form-control my-3" type="text" placeholder="Name" name="name" value={input.name} onChange={onChangeHandler} aria-label="Name" required></input>
            <input className="form-control my-3" type="text" placeholder="Age" name="age" value={input.age} onChange={onChangeHandler} aria-label="Age" required></input>
            <textarea className="form-control my-3" placeholder="Note" name="note" value={input.note} onChange={onChangeHandler} aria-label="Note" />
            <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
    </div>
  )
}
