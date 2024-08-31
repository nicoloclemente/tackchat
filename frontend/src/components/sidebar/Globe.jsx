import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'tailwindcss/tailwind.css'; // Assicurati di importare Tailwind CSS

const Globe = () => {
    const mountRef = useRef(null);
    const [selectedCapital, setSelectedCapital] = useState(null); // Stato per la capitale selezionata
    const [isPopupVisible, setIsPopupVisible] = useState(false); // Stato per la visibilità del popup

    // Definisci i limiti di zoom
    const MIN_ZOOM = 10;  // Distanza minima dalla scena (ingrandimento massimo)
    const MAX_ZOOM = 20; // Distanza massima dalla scena (ingrandimento minimo)

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const globeGroup = new THREE.Group();
        const globe = createGlobe();
        globeGroup.add(globe);

        scene.add(globeGroup);

        const pinMeshes = addCapitals(scene, globeGroup);

        camera.position.z = (MIN_ZOOM + MAX_ZOOM) / 2;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.minDistance = MIN_ZOOM;
        controls.maxDistance = MAX_ZOOM;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        };

        const onClick = () => {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(pinMeshes);

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                if (clickedObject.userData.capital) {
                    setSelectedCapital(clickedObject.userData.capital);
                    setIsPopupVisible(true);
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        const rotationSpeed = 0.005;

        const animate = () => {
            requestAnimationFrame(animate);

            globeGroup.rotation.y += rotationSpeed;

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Cleanup
            if (mountRef.current) {
                if (renderer.domElement.parentElement) {
                    mountRef.current.removeChild(renderer.domElement);
                }
            }
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
            scene.clear();
            renderer.dispose();
        };
    }, [selectedCapital]);

    const createGlobe = () => {
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const texture = new THREE.TextureLoader().load('/2k_earth_daymap.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        return new THREE.Mesh(geometry, material);
    };

    const latLonToVector3 = (lat, lon, radius) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = - (radius * Math.sin(phi) * Math.cos(theta));
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return new THREE.Vector3(x, y, z);
    };

    const createLabel = (text, position, showFullName) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = 'Bold 24px Arial'; // Font size for calculating text size
        const textWidth = context.measureText(text).width;
        const textHeight = 24; // Assuming font size is 24px

        // Update canvas size and font
        canvas.width = textWidth;
        canvas.height = textHeight;

        context.font = 'Bold 24px Arial'; // Ensure the font is the same as the size for measuring
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(showFullName ? text : text.charAt(0), textWidth / 2, textHeight - 4);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);

        // Scale the text to 1/6 of its original size
        sprite.scale.set(textWidth / 120, textHeight / 120, 1); // Adjusted for new size

        sprite.position.copy(position);

        return sprite;
    };

    const addCapitals = (scene, globeGroup) => {
        const globeRadius = 5; // Raggio del globo
        const additionalDistance = globeRadius / 12; // Un ottavo del raggio
        const totalDistance = globeRadius + additionalDistance; // Distanza totale dal centro del globo

        const capitals = [
            { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964 },
            { name: 'Washington, D.C.', country: 'United States', lat: 38.8951, lon: -77.0369 },
            { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
            { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173 },
            { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917 },
            { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
            { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
            { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.405 },
            { name: 'Canberra', country: 'Australia', lat: -35.2809, lon: 149.1300 },
            { name: 'Brasília', country: 'Brazil', lat: -15.7801, lon: -47.9292 },
            // Add remaining capitals here...
        ];

        const pinMeshes = [];

        capitals.forEach(capital => {
            const position = latLonToVector3(capital.lat, capital.lon, globeRadius);

            const collisionRadius = 0.3;
            const collisionGeometry = new THREE.SphereGeometry(collisionRadius, 16, 16);
            const collisionMaterial = new THREE.MeshBasicMaterial({ visible: false });
            const collisionMesh = new THREE.Mesh(collisionGeometry, collisionMaterial);
            collisionMesh.position.copy(position.clone().add(new THREE.Vector3(0, 0.1, 0)));
            collisionMesh.userData = { capital };
            globeGroup.add(collisionMesh);

            const pinGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const pinMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
            const pinMesh = new THREE.Mesh(pinGeometry, pinMaterial);
            pinMesh.position.copy(position.clone().add(new THREE.Vector3(0, 0.1, 0)));
            globeGroup.add(pinMesh);

            // Calcola e applica l'offset per posizionare il label alla distanza desiderata
            const normalizedPosition = position.clone().normalize(); // Normalizza la posizione
            const labelPosition = normalizedPosition.multiplyScalar(totalDistance);

            const label = createLabel(capital.name, labelPosition, selectedCapital && selectedCapital.name === capital.name);
            globeGroup.add(label);

            pinMeshes.push(collisionMesh);
        });

        return pinMeshes;
    };

    // Funzione per chiudere il popup
    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedCapital(null);
    };

    return (
        <div className="relative w-full h-full">
            <div ref={mountRef} className="w-full h-full" />
            {isPopupVisible && selectedCapital && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded shadow-lg z-10">
                    <p className="text-lg font-bold">{selectedCapital.name}</p>
                    <p className="text-sm">{selectedCapital.country}</p> {/* Added country display */}
                    <button
                        onClick={closePopup}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Globe;