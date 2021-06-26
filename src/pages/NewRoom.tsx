import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { useTheme } from '../contexts/ThemeContext';

export function NewRoom(){
  
  const { user } = useAuth();
  const {theme, toggleTheme} = useTheme();

  const [newRoom, setNewRoom] = useState('');

  const history = useHistory();

  const handleCreateRoom = async(event:FormEvent) =>{
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id='page-auth' className={theme}>
      <aside>
        <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie aulas de Q&amp;A ao vivo!</strong>
        <p>Tire as dúvidas da sua audiência em tempo real!</p>
      </aside>

      <main>
        <div className='main-content'>

          <button onClick={toggleTheme} className={`toggle-theme ${theme}`}>
            {theme==='light' ? 
              (<div>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
                ) 
              : 
              (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
                ) 
              }
          </button>

          <img src={logoImg} alt="Letmeask" />
          <h2 className={theme}>Criar uma nova sala</h2>
          
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder='Nome da sala'
              onChange={event=>setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? 
            <Link to='/'>clique aqui</Link>
          </p>

        </div>
      </main>

    </div>
  )
}