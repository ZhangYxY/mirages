/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';

import { useSpring, animated } from 'react-spring';

function Dropdown (props) {
  const [show, setShow] = useState(false);
  const { s } = useSpring({
    s: show ? 1 : 0,
    from: show ? { s: 0 } : { s: 1 },
  });
  const onClick = () => {
    setShow(!show);
    window.removeEventListener('click', onClick, true);
  };

  if (show) {
    window.addEventListener('click', onClick, true);
  }
  
  const onChildrenClick = (e) => {
    e.stopPropagation();
    setShow(!show);    
  }
  return (
    <DropdownWrapper>
      <div onClick={onChildrenClick}>
        { props.children }
      </div>
      <AnimatedWrapper style={{
        transform: s
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [0, 0.25, 0.45, 0.65, 0.85, 1.05, 1.25, 1]
          })
          .interpolate(x => `scale(${x})`),
          opacity: show ? 1 : 0
      }}>
        {props.menu}
      </AnimatedWrapper>
    </DropdownWrapper>
  );
}

export default Dropdown;

const DropdownWrapper = styled.div`
  position: relative;
  margin-right: 6px;
  width: 64px;
  text-align: center;
`

const CurrentIcon = styled.img`
  width: 24px;
  height: 24px;
`

const AnimatedWrapper = styled(animated.div)`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 60px;
  height: 220px;
  transform-origin: top center;
  overflow: hidden;
`

const IconListWrapper = styled.li`
  position: absolute;
  display: flex;
  top: 6px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);

  &::after {
    content: '';
    position: absolute;
    top: -6px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: block;
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-bottom: 6px solid rgba(255, 255, 255, 1);
  }
`

const IconItem = styled.ul`
  margin: 0 4px;
  padding: 3px 12px;
  border-bottom: 1px solid #ada;
`

const IconImg = styled.img`
  width: 24px;
  height: 24px;
`