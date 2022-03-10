import { Fragment, useState } from 'react';
import { participantState } from '../App'

type ParticipantListProps = {
    participant: participantState['participant']
    setParticipant: React.Dispatch<React.SetStateAction<participantState['participant']>>
}

type ParticipantStatusProps = {
    participant: {
        name: string
        age: number
        note?: string
    }
    index: number | null
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participant, setParticipant }) => {

    const [editParticipantID, setEditParticipantID] = useState<number| null>(null);
    const [participantStatus, setParticipantStatus] = useState<ParticipantStatusProps['participant']>({
        name: '',
        age: parseInt(""),
        note: ''
    });

    const editClickHandler = ({participant, index}: ParticipantStatusProps) => {
        setEditParticipantID(index);
        setParticipantStatus({
            name: participant.name,
            age: participant.age,
            note: participant.note
        })
    }

    const deleteParticipant = (index: number | null) => {
        setParticipant(participant.filter((participant, i) => {
            return index !== i
        }))
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParticipantStatus({
            ...participantStatus,
            [event.target.name]: event.target.value
        });
    }

    const saveClickHandler = () => {
        setParticipant(participant.filter((participant, index: number | null) => {
                if(editParticipantID===index){
                    participant.name = participantStatus.name;
                    participant.age = participantStatus.age;
                    participant.note = participantStatus.note
                }
                return participant
            })
        );
        setEditParticipantID(null);
    }
    
    const cancelClickHandler = () => {
        setEditParticipantID(null);
    }

    const renderPraticipantList = (): JSX.Element[] => {
        return participant.map((participant, index: number | null) => {
            return (<Fragment key={index}>
                {index===editParticipantID ? (
                    <tr>
                        <td>
                            <input className="form-control my-3" type="text" placeholder="Name" name="name" value={participantStatus.name} onChange={onChangeHandler} aria-label="Name" required />
                        </td>
                        <td>
                            <input className="form-control my-3" type="text" placeholder="Age" name="age" value={participantStatus.age} onChange={onChangeHandler} aria-label="Age" required />
                        </td>
                        <td>
                            <input className="form-control my-3" type="text" placeholder="Note" name="note" value={participantStatus.note} onChange={onChangeHandler} aria-label="Note" />
                        </td>
                        <td><button type="button" className="btn btn-success" onClick={() => {saveClickHandler()}}>Save</button></td>
                        <td><button type="button" className="btn btn-secondary" onClick={()=>{cancelClickHandler()}}>Cancel</button></td>
                    </tr>
                ):(
                    <tr>
                        <td>{participant.name}</td>
                        <td>{participant.age}</td>
                        <td>{participant.note}</td>
                        <td><button type="button" className="btn btn-secondary" onClick={() => {editClickHandler({participant, index})}}>Edit</button></td>
                        <td><button type="button" className="btn btn-danger" onClick={()=>{deleteParticipant(index)}}>Delete</button></td>
                    </tr>
                )}
            </Fragment>
            )
        })
    }

  return (
    <div className="container">
        <h1>Participants</h1>
        <table className="table">
            <thead>
                {participant.length!==0 &&<tr>
                    <th scope="col" style={{width: '25%'}}>Name</th>
                    <th scope="col" style={{width: '25%'}}>Age</th>
                    <th scope="col" style={{width: '25%'}}>Note</th>
                    <th scope="col" style={{width: '25%'}}>Actions</th>
                </tr>}
            </thead>
            <tbody>
                {renderPraticipantList()}
            </tbody>
        </table>
    </div>
  )
}
