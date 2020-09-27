import React from 'react';
import {
  Icon,
  Sidebar,
  Menu
} from 'semantic-ui-react';
import Content from './Content/Content';

const SidebarRight = ({ activeTab, setActiveTab }) => {
  return (
    <Sidebar
      className='map-sidebar-right'
      as={Menu}
      animation='overlay'
      icon='labeled'
      vertical
      width='thin'
      direction='right'
      visible={!!activeTab}
    >
      <div className='map-sidebar-content'>
        <div className='map-sidebar-content-header'>
          <div className='app-title'>Wreck Finder</div>
          <Icon
            className='map-sidebar-toggle'
            name='angle double left'
            size='large'
            onClick={() => setActiveTab(null)}
          />
        </div>
        <div className='content-container'>
          <Content activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </Sidebar>
  );
};

export default React.memo(SidebarRight, (props, nextProps) => {
  if (nextProps.activeTab === 'settings') {
    return true;
  }
});
