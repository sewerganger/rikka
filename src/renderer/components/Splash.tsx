import React from 'react';
import { Transition } from 'react-transition-group';
import { Center } from '@/components';
import { fullScreen } from '@/utils/css';

const transitionStyles: any = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

const logoTransitionStyles: any = {
  entering: { transform: 'scale(1)', opacity: 1 },
  entered: { transform: 'scale(1)', opacity: 1 },
  exiting: { transform: 'scale(1.5)', opacity: 0 },
  exited: { transform: 'scale(1.5)', opacity: 0 }
};

const launcherCovers = [
  require('../assets/image/launcher/launcher1.jpg'),
  require('../assets/image/launcher/launcher2.jpg'),
  require('../assets/image/launcher/launcher3.jpg'),
  require('../assets/image/launcher/launcher4.jpg')
];

export default (props: any) => {
  return (
    <Transition in={props.inProp} timeout={props.duration}>
      {state => {
        return (
          <div
            style={{
              position: 'absolute',
              ...fullScreen,
              zIndex: 10000
            }}
          >
            <Center width={180} height={180} top="30%" style={{ zIndex: 1000 }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${require('../assets/image/icon/bilibili-fill.svg')})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  ...logoTransitionStyles[state],
                  transition: `transform ${props.duration}ms ease, opacity ${props.duration}ms ease-in-out`
                }}
              />
            </Center>
            <div
              className="full-box splashCover"
              style={{
                ...transitionStyles[state],
                transition: `opacity ${props.duration}ms ease-in-out`,
                backdropFilter: 'saturate(180%) blur(10px)',
                backgroundColor: '#352f518a'
              }}
            />
            <div
              className="full-box"
              style={{
                ...transitionStyles[state],
                transition: `opacity ${props.duration}ms ease-in-out`,
                backgroundImage: `url(${launcherCovers[Math.round(Math.random() * 3)]})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                zIndex: -1000
              }}
            />
          </div>
        );
      }}
    </Transition>
  );
};
