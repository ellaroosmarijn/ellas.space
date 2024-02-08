'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import styles from './3d-scene.module.css'

// TODO: add file and put in correct file path
const fileUrl = '/assets/torch.glb'

function MeshComponent() {
  const mesh = useRef<Mesh>(null!),
    gltf = useLoader(GLTFLoader, fileUrl),
    [clicks, setClicks] = useState(0)

  useFrame(() => {
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      ref={mesh}
      onClick={(e) => {
        e.stopPropagation(),
          console.log(clicks, 'CLICKED!', e),
          setClicks((c) => c + 1)
      }}
    >
      <primitive object={gltf.scene} scale={0.33} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div className={styles['scene-container']}>
      <Canvas className={styles.canvas}>
        <OrbitControls />
        <pointLight args={[0xffbbbb, 10, 100]} position={[0, 2, 2]} />
        <pointLight args={[0xbbbbff, 10, 100]} position={[2, 2, 2]} />
        <pointLight args={[0xeeffee, 10, 100]} position={[2, -2, 0]} />
        <MeshComponent />
      </Canvas>
    </div>
  )
}
