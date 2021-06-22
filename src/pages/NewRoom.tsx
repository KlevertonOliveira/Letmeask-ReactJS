import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { useAuth } from '../contexts/AuthContext';

export function NewRoom(){

  const { user } = useAuth();

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
          <h2>Criar uma nova sala</h2>
          
          <form>
            <input
              type="text"
              placeholder='Nome da sala' 
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