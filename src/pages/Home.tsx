import { Button } from '../components/Button';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home(){

  const {user, signInWithGoogle} = useAuth();

  const [roomCode, setRoomCode] = useState('');

  const history = useHistory();

  const handleCreateRoom = async() => {
    if(!user){
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  const handleJoinRoom = async(event:FormEvent) => {
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exist!');
      return;
    }

    if(roomRef.val().closedAt){
      alert('Room already closed!')
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie aulas de Q&amp;A ao vivo!</strong>
        <p>Tire as dúvidas da sua audiência em tempo real!</p>
      </aside>

      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          
          <div className='separator'>ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder='Digite o código da sala'
              onChange={event=>setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>

    </div>
  )
}