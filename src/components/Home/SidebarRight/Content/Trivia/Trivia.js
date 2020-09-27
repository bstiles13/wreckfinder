import React from 'react';
import { Step } from 'semantic-ui-react';

import './Trivia.scss';

export const Trivia = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <div className='trivia'>
      <div className='trivia-content'>Triva Placeholder</div>
      <Step.Group size='mini' style={{ marginTop: '0.5rem' }}>
        <Step disabled><Step.Content><Step.Title>MENU</Step.Title></Step.Content></Step>
        <Step><Step.Content><Step.Title>TRIVIA</Step.Title></Step.Content></Step>
      </Step.Group>
    </div>
  );
};
