import React from 'react';
import { Modal, Icon, Segment } from 'semantic-ui-react';

import './About.scss';

export const About = () => {
  const onClick = (href) => {
    window.open(href, '_blank');
  };

  return (<>
    <Modal.Header>
      About Wreck Finder
    </Modal.Header>
    <Modal.Content className='about-content'>
      <Segment className='about-content-segment'>
        Search for over 24,000 shipwrecks and obstructions recorded in United States and territorial waters. Visit the links below for more information.
      </Segment>
      <div className='about-content-links'>
        <div
          className='about-content-link'
          onClick={() => onClick('https://github.com/bstiles13/wreckfinder')}
        >
          <Icon name='github' />
          GitHub
        </div>
        <div
          className='about-content-link'
          onClick={() => onClick('https://nauticalcharts.noaa.gov/data/docs/wrecks-and-obstructions/awois-users-guide-2013.pdf')}
        >
          <Icon name='download' />
          User Guide
        </div>
        <div
          className='about-content-link'
          onClick={() => onClick('https://www.iambrandonstiles.com/contact')}
        >
          <Icon name='phone' />
          Contact
        </div>
      </div>
    </Modal.Content>
  </>);
};
