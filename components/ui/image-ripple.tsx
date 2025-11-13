// "use client"

// import React, { useEffect, useRef, useState } from "react"
// import { OrthographicCamera, useFBO } from "@react-three/drei"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import * as THREE from "three"

// export function Scene({ src }: { src: string }) {
//   const device = useDimension()

//   if (!device.width || !device.height) {
//     return null
//   }

//   const frustumSize = 400 // Fixed size for h-96 (approx 400px)
//   const aspect = device.width / device.height

//   const uniqueSrc = `${src}?t=${Date.now()}`

//   return (
//     <div className="relative flex h-full w-full items-center justify-center">
//       <Canvas>
//         <OrthographicCamera
//           makeDefault
//           args={[
//             (frustumSize * aspect) / -2,
//             (frustumSize * aspect) / 2,
//             frustumSize / 2,
//             frustumSize / -2,
//             -1000,
//             1000,
//           ]}
//           position={[0, 0, 2]}
//         />
//         <Model src={uniqueSrc} />
//       </Canvas>
//     </div>
//   )
// }

// function Model({ src }: { src: string }) {
//   const { viewport } = useThree()
//   const brushTexture = useRef(createRadialGradientTexture()).current
//   const imageTexture = useRef(createImageTexture(src)).current
//   const meshRefs = useRef<(THREE.Mesh | null)[]>([])
//   const [meshes, setMeshes] = useState<JSX.Element[]>([])
//   const mouse = useMouse()
//   const device = useDimension()
//   const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 })
//   const [currentWave, setCurrentWave] = useState(0)
//   const { gl, camera } = useThree()

//   const scene = new THREE.Scene()
//   const max = 30 // Reduced for smoother performance

//   const uniforms = useRef({
//     uDisplacement: { value: new THREE.Texture() },
//     uTexture: { value: imageTexture || createFallbackTexture() },
//     winResolution: { value: new THREE.Vector2(device.width, device.height) },
//   })

//   const fboBase = useFBO(device.width, device.height)
//   const fboTexture = useFBO(device.width, device.height)

//   const { scene: imageScene, camera: imageCamera } = Images(
//     new THREE.Vector2(viewport.width, viewport.height),
//     imageTexture || createFallbackTexture()
//   )

//   useEffect(() => {
//     const generatedMeshes = Array.from({ length: max }).map((_, i) => (
//       <mesh
//         key={i}
//         position={[0, 0, 0]}
//         ref={(el) => (meshRefs.current[i] = el)}
//         rotation={[0, 0, Math.random()]}
//         visible={false}
//       >
//         <planeGeometry args={[30, 30, 1, 1]} /> {/* Smaller waves */}
//         <meshBasicMaterial transparent={true} map={brushTexture} />
//       </mesh>
//     ))
//     setMeshes(generatedMeshes)
//   }, [brushTexture])

//   function setNewWave(x: number, y: number, currentWave: number) {
//     const mesh = meshRefs.current[currentWave]
//     if (mesh) {
//       mesh.position.set(x, y, 0)
//       mesh.visible = true
//       ;(mesh.material as THREE.MeshBasicMaterial).opacity = 0.8
//       mesh.scale.set(1.0, 1.0, 1.0)
//     }
//   }

//   function trackMousePos(x: number, y: number) {
//     if (Math.abs(x - prevMouse.x) > 0.05 || Math.abs(y - prevMouse.y) > 0.05) {
//       setCurrentWave((currentWave + 1) % max)
//       setNewWave(x, y, currentWave)
//     }
//     setPrevMouse({ x, y })
//   }

//   useFrame(({ gl, scene: finalScene }) => {
//     const x = (mouse.x / device.width - 0.5) * viewport.width
//     const y = -(mouse.y / device.height - 0.5) * viewport.height
//     trackMousePos(x, y)

//     meshRefs.current.forEach((mesh) => {
//       if (mesh && mesh.visible) {
//         mesh.rotation.z += 0.04
//         const mat = mesh.material as THREE.MeshBasicMaterial
//         mat.opacity *= 0.92
//         mesh.scale.multiplyScalar(0.98).addScalar(0.05)
//         if (mat.opacity < 0.1) mesh.visible = false
//       }
//     })

//     if (device.width > 0 && device.height > 0) {
//       gl.setRenderTarget(fboBase)
//       gl.clearColor(0, 0, 0, 0)
//       gl.render(scene, camera)
//       uniforms.current.uDisplacement.value = fboBase.texture

//       gl.setRenderTarget(fboTexture)
//       gl.clearColor(0, 0, 0, 0)
//       gl.render(imageScene, imageCamera)
//       uniforms.current.uTexture.value = fboTexture.texture

//       gl.setRenderTarget(null)
//       gl.render(finalScene, camera)

//       uniforms.current.winResolution.value
//         .set(device.width, device.height)
//         .multiplyScalar(device.pixelRatio)
//     }
//   })

//   function Images(viewport: THREE.Vector2, texture: THREE.Texture) {
//     const scene = new THREE.Scene()
//     const camera = new THREE.OrthographicCamera(
//       viewport.width / -2,
//       viewport.width / 2,
//       viewport.height / 2,
//       viewport.height / -2,
//       -1000,
//       1000
//     )
//     camera.position.z = 2
//     scene.add(camera)
//     const geometry = new THREE.PlaneGeometry(1, 1)
//     const material = new THREE.MeshBasicMaterial({ map: texture })
//     const mesh = new THREE.Mesh(geometry, material)
//     // Scale to fit h-96 (approx 400px) and aspect ratio
//     const targetHeight = 400 // Matches h-96
//     const targetWidth = (targetHeight * viewport.width) / viewport.height
//     mesh.scale.set(targetWidth, targetHeight, 1)
//     mesh.position.set(0, 0, 0)
//     scene.add(mesh)
//     return { scene, camera }
//   }

//   function createRadialGradientTexture() {
//     const size = 64
//     const data = new Uint8Array(size * size * 4)
//     const center = size / 2
//     for (let y = 0; y < size; y++) {
//       for (let x = 0; x < size; x++) {
//         const idx = (y * size + x) * 4
//         const dist = Math.sqrt((x - center) ** 2 + (y - center) ** 2)
//         const intensity = Math.max(0, 1 - dist / (size / 2))
//         data[idx] = data[idx + 1] = data[idx + 2] = 255 * intensity
//         data[idx + 3] = 255
//       }
//     }
//     const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
//     texture.needsUpdate = true
//     return texture
//   }

//   function createFallbackTexture() {
//     const size = 64
//     const data = new Uint8Array(size * size * 4)
//     for (let i = 0; i < size * size; i++) {
//       data[i * 4] = 100
//       data[i * 4 + 1] = 100
//       data[i * 4 + 2] = 100
//       data[i * 4 + 3] = 255
//     }
//     const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
//     texture.needsUpdate = true
//     return texture
//   }

//   function createImageTexture(src: string) {
//     const texture = new THREE.Texture()
//     const img = new Image()
//     img.crossOrigin = "anonymous"

//     img.onload = () => {
//       texture.image = img
//       texture.needsUpdate = true
//     }

//     img.onerror = () => {
//       console.warn(`Image load failed for ${src}. Using fallback.`)
//     }

//     img.src = src
//     return texture
//   }

//   return (
//     <group>
//       {meshes}
//       <mesh>
//         <planeGeometry args={[device.width, device.height, 1, 1]} />
//         <shaderMaterial
//           vertexShader={vertex}
//           fragmentShader={fragment}
//           transparent={true}
//           uniforms={uniforms.current}
//         />
//       </mesh>
//     </group>
//   )
// }

// function useMouse() {
//   const [mouse, setMouse] = useState({ x: 0, y: 0, pixelRatio: 0 })

//   useEffect(() => {
//     const handleMove = (e: MouseEvent) => {
//       setMouse({
//         x: e.clientX,
//         y: e.clientY,
//         pixelRatio: Math.min(window.devicePixelRatio, 2),
//       })
//     }
//     window.addEventListener("mousemove", handleMove)
//     return () => window.removeEventListener("mousemove", handleMove)
//   }, [])

//   return mouse
// }

// function useDimension() {
//   const [dimension, setDimension] = useState({
//     width: 0,
//     height: 0,
//     pixelRatio: 1,
//   })

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const resize = () => {
//         setDimension({
//           width: window.innerWidth,
//           height: window.innerHeight,
//           pixelRatio: window.devicePixelRatio,
//         })
//       }
//       resize()
//       window.addEventListener("resize", resize)
//       return () => window.removeEventListener("resize", resize)
//     }
//   }, [])

//   return dimension
// }

// const fragment = `
// uniform sampler2D uTexture;
// uniform sampler2D uDisplacement;
// uniform vec4 winResolution;
// varying vec2 vUv;

// void main() {
//   vec2 uv = gl_FragCoord.xy / winResolution.xy;
//   vec4 displacement = texture2D(uDisplacement, uv);
//   float strength = displacement.r * 0.15; // Increased strength
//   vec2 offset = vec2(cos(displacement.r * 6.28), sin(displacement.r * 6.28)) * strength;
//   vec4 color = texture2D(uTexture, uv + offset);
//   if (color.a < 0.1) discard; // Avoid black artifacts
//   gl_FragColor = vec4(color.rgb, 1.0);
// }
// `

// const vertex = `
// varying vec2 vUv;

// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `

// export default function ImageRipple({ src, alt, className }: { src: string; alt: string; className?: string }) {
//   return (
//     <div className={className}>
//       <Scene src={src} />
//     </div>
//   )
// }