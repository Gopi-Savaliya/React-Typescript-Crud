import { useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import { ParticipantList } from './components/ParticipantList';

export interface participantState {
  participant: {
    name: string
    age: number
    note?: string
  }[]
}

function App() {

  const [participant, setParticipant] = useState<participantState['participant']>([{
    name: "Gopi Savaliya",
    age: 23,
    note: "XYZ"
  }]);

  return (
    <div className="App">
      <Form participant={participant} setParticipant={setParticipant} />
      <hr/>
      <ParticipantList participant={participant} setParticipant={setParticipant} />
    </div>
  );
}

export default App;
