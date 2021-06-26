import { ReactNode } from 'react';

import cn from 'classnames';

import '../styles/question.scss';
import { useTheme } from '../contexts/ThemeContext';

type QuestionProps = {
  content: string;
  author:{
    name: string;
    avatar:  string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question(
  {content, 
   author,
   children, 
   isAnswered = false, 
   isHighlighted = false,
  }: QuestionProps){

  const { theme } = useTheme();

  return(
    <div className={
      cn(
        'question',
        {answered: isAnswered},
        {highlighted: isHighlighted && !isAnswered},
        theme
      )
    }>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className='action-buttons'>
          {children}
        </div>
      </footer>
    </div>
  )
}