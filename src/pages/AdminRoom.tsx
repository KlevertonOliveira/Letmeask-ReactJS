import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss'
import { database } from '../services/firebase';
import { useTheme } from '../contexts/ThemeContext';

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  const history = useHistory();
  const {theme, toggleTheme} = useTheme();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions, title} = useRoom(roomId);

  const handleCheckQuestionAsAnswered = async(questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  const handleHighlightQuestion = async(questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  const handleDeleteQuestion = async(questionId: string) => {
    if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  const handleEndRoom = async() => {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    });

    history.push('/');
  }

  return(
    <div id='page-room' className={theme}>
      <header>
        <div className='content'>
          <img src={logoImg} alt='letmeask' />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
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
          </div>
        </div>
      </header>

      <main>
        
        <div className='room-title'>
          <h1 className={theme}>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map(question=>{
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                
                {!question.isAnswered && (
                  <>

                    <button type='button' onClick={()=>handleCheckQuestionAsAnswered(question.id)}>
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button type='button' onClick={()=>handleHighlightQuestion(question.id)}>
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>

                  </>
                )}

                <button type='button' onClick={()=>handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
              )
          })}
        </div>

      </main>
    </div>
  )
}