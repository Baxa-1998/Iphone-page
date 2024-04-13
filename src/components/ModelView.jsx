import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"

import * as THREE from 'three'
import Lights from './Lights';
import Loader from './Loader';
import IPhone from './IPhone';
import { Suspense } from "react";
import MobileDetect from "mobile-detect";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  const md = new MobileDetect(window.navigator.userAgent) 
  const isMobile = md.mobile();
  
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />
    {!isMobile && (
         <OrbitControls 
         makeDefault
         ref={controlRef}
         enableZoom={!isMobile}
         enablePan={!isMobile}
         enabled={!isMobile}
         rotateSpeed={0.4}
         target={new THREE.Vector3(0, 0 ,0)}
         onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
       /> 

    )}
     

      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0 ,0]}>
        <Suspense fallback={<Loader />}>
          <IPhone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView