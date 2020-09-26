import React from 'react';

import './Trivia.scss';

export const Trivia = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <div>Trivia</div>
  );
};
