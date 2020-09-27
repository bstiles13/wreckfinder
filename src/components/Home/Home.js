import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sidebar } from 'semantic-ui-react';
import { resetMap, setMapFilterType, setSelectedWreck } from '../../store/actions';
import { SidebarLeft } from './SidebarLeft/SidebarLeft';
import SidebarRight from './SidebarRight/SidebarRight';
import Map from './Map/Map';

import './Home.scss';

export const Home = ({ session, resetMap, setMapFilterType }) => {
  const [activeTab, setActiveTab] = useState(null);

  const [layer, setLayer] = useState({ type: 'Oceans', labels: 'OceansLabels' });

  return (
    <>
      <Sidebar.Pushable>
        <SidebarLeft
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          session={session}
          resetMap={resetMap}
          setMapFilterType={setMapFilterType}
          layer={layer}
          setLayer={setLayer}
        />
        <SidebarRight
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <Sidebar.Pusher className='map-container'>
          <Map
            layer={layer}
            setActiveTab={setActiveTab}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

const mapStateToProps = state => ({
  session: state.session.session
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetMap,
  setMapFilterType,
  setSelectedWreck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
