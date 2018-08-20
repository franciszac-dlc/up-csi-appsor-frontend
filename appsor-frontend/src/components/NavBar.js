import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Menu, Responsive, Sidebar, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import upcsi from '../assets/images/upcsi.png';

const NavBarMobile = ({
  handleClick,
  handlePusher,
  handleToggle,
  visible,
  items,
}) => (
  <Sidebar.Pushable
    style={{
      position: 'fixed',
      width: '100%',
      zIndex: 1000,
    }}
  >
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
    >
      {items.map(item => (
        <Menu.Item
          key={item.key}
          name={item.name}
          onClick={() => {
            handlePusher();
            handleClick(item.route);
          }}
        />
      ))}
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={handlePusher}
      style={{ minHeight: '100vh' }}
    >
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image className="navbar-logo" src={upcsi} size="mini" />
        </Menu.Item>
        <Menu.Item onClick={handleToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
      </Menu>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({
  activeItem,
  handleClick,
  items,
}) => (
  <Menu id="navbar">
    <Image className="navbar-logo" src={upcsi} size="mini" />
    <Menu.Menu position="right">
      {items.map(item => (
        <Menu.Item
          key={item.key}
          name={item.name}
          className="navbar-item"
          active={activeItem === item.route}
          onClick={() => handleClick(item.route)}
        />
      ))}
    </Menu.Menu>
  </Menu>
);

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeItem: '/committees',
    };

    this.handlePusher = this.handlePusher.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlePusher() {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  }

  handleToggle() {
    this.setState({ visible: !this.state.visible });
  }

  handleClick(route) {
    this.setState({ activeItem: route });
    this.props.history.push(route);
  }

  render() {
    const props = {
      ...this.state,
      handlePusher: this.handlePusher,
      handleToggle: this.handleToggle,
      handleClick: this.handleClick,
      items: [
        { name: 'Form', route: '/form', key: 'Form' },
        { name: 'Committees', route: '/committees', key: 'Committees' },
      ],
    };

    if (this.props.location.pathname === '/') return null;
    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile {...props} />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop {...props} />
        </Responsive>
      </div>
    );
  }
}

NavBarMobile.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handlePusher: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    route: PropTypes.string,
    key: PropTypes.string,
  })).isRequired,
};

NavBarDesktop.propTypes = {
  activeItem: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    route: PropTypes.string,
    key: PropTypes.string,
  })).isRequired,
};

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
