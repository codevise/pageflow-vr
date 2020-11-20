import React, {useRef} from 'react';

import {
  useContentElementEditorState,
  useContentElementLifecycle,
  useFile,
  Figure,
  ViewportDependentPillarBoxes
} from 'pageflow-scrolled/frontend';

import styles from './VrView.module.css';

export function VrView({configuration}) {
  const {shouldLoad} = useContentElementLifecycle({
    onActivate() {
      if (frameRef.current) {
        frameRef.current.contentWindow.postMessage({type: 'autopan'},
                                                   window.location.origin);
      }
    }
  });
  const {isEditable, isSelected} = useContentElementEditorState();
  const frameRef = useRef();

  const imageFile = useFile({collectionName: 'imageFiles', permaId: configuration.image});

  return (
    <div style={{pointerEvents: isEditable && !isSelected ? 'none' : undefined}}>
      <Figure caption={configuration.caption}>
        <ViewportDependentPillarBoxes aspectRatio={configuration.position === 'full' ? 0.5 : 0.75}
                                      position={configuration.position}
                                      opaque={!!configuration.caption}>
          {renderLazyIframe(configuration, imageFile, shouldLoad, frameRef)}
        </ViewportDependentPillarBoxes>
      </Figure>
    </div>
  );
}

function renderLazyIframe(configuration, imageFile, shouldLoad, frameRef) {
  const source = getSource(imageFile, configuration)

  if (shouldLoad && source) {
    return renderIframe(source, frameRef);
  }
}

function renderIframe(source, frameRef) {
  return (
    <iframe ref={frameRef}
            className={styles.view}
            allowFullScreen
            frameBorder="0"
            src={source}>
    </iframe>
  );
}

function getSource(imageFile, {startYaw}) {
  if (!imageFile || !imageFile.isReady) {
    return null;
  }

  return url({
    image: imageFile.urls.ultra,
    is_stereo: imageFile.configuration.projection == 'equirectangular_stereo' ? 'true' : 'false',
    start_yaw: startYaw,
    is_vr_off: true,
    is_autopan_off: true,
    no_autoplay: true
  });
}

function url(params) {
  const paramsString = Object.keys(params).map((key) =>
    `${key}=${params[key]}`
  ).join('&');

  return `/pageflow_vr/vrview2.html?${paramsString}`;
}
