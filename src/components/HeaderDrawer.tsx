import React, { ReactNode, useEffect } from 'react'
import withOpenDrawer from 'containers/withOpenDrawer'
import Router, { withRouter } from 'next/router'
import { compose } from 'recompose'
import { toggleDrawer } from 'store/actions'
import styled from 'styled-components'

import SvgIcon from './SvgIcon'

const HeaderDrawerBase = styled.div<{ visible: boolean }>`
  background-color: #fff;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 100%;
  padding: 1em;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(${({ visible }) => (visible ? '0' : '100%')});
  transition: ${({ visible }) =>
    visible ? '.5s all ease-out' : '.3s all ease-in'};
  z-index: 1000;

  @media only screen and (min-width: 768px) {
    right: 0;
    top: 74px;
    max-width: 600px;
    min-width: 480px;
  }

  div:first-child {
    flex: 1;
  }

  div {
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transition: 0.2s opacity
      ${({ visible }) => (visible ? '.3s ease-in' : 'ease-out')};
  }
`

const StyledAnchor = styled.a`
  position: absolute;
  right: 50px;
  top: 45px;
`

interface Props {
  children: ReactNode
  dispatch
}

const HeaderDrawer = props => {
  const { children, dispatch, visible } = props

  const handleCloseClick = () => {
    dispatch(toggleDrawer(''))
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', handleCloseClick)
  }, [])

  return (
    <HeaderDrawerBase visible={visible}>
      {children}
      <StyledAnchor onClick={handleCloseClick}>
        <SvgIcon type="close" />
      </StyledAnchor>
    </HeaderDrawerBase>
  )
}

HeaderDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default compose(withRouter, withOpenDrawer)(HeaderDrawer)
