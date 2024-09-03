import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CountryPopup from './CountryPopup.jsx';
import { availableCountries } from "../../../utils/countries.js";
import CountrySelector from './CountrySelector.jsx';

const Globe = ({ onConversationClick }) => {
    const mountRef = useRef(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isAnimatingToCountry, setIsAnimatingToCountry] = useState(false);

    const MIN_ZOOM = 10;
    const MAX_ZOOM = 20;

    const countries = availableCountries.map(entry => ({
        capitalName: entry.capital,
        countryName: entry.name,
        latitude: entry.latitude,
        longitude: entry.longitude,
        code: entry.code,
    }));

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

        const pinMeshes = addCountryPins(scene, globeGroup);

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
            if (isPopupVisible) return; // Non eseguire l'azione se il popup è visibile

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(pinMeshes);

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                if (clickedObject.userData.country) {
                    setSelectedCountry(clickedObject.userData.country);
                    setIsPopupVisible(true);
                    setIsAnimatingToCountry(true);
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

            if (!isAnimatingToCountry) {
                globeGroup.rotation.y += rotationSpeed;
            } else if (selectedCountry) {
                animateToCountry(camera, controls, selectedCountry, () => setIsAnimatingToCountry(false));
            }

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
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
    }, [selectedCountry, isPopupVisible]); // Aggiunto isPopupVisible alle dipendenze

    const createGlobe = () => {
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const texture = new THREE.TextureLoader().load('/8kearth.jpeg');
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

    const createLabel = (text, position) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = 'Normal 24px monospace';
        const textWidth = context.measureText(text).width;
        const textHeight = 24;

        canvas.width = textWidth;
        canvas.height = textHeight;

        context.font = 'Normal 24px monospace';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(text, textWidth / 2, textHeight - 4);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);

        sprite.scale.set(textWidth / 120, textHeight / 120, 1);
        sprite.position.copy(position);

        return sprite;
    };

    const addCountryPins = (scene, globeGroup) => {
        const globeRadius = 5;
        const additionalDistance = globeRadius / 12;
        const totalDistance = globeRadius + additionalDistance;

        const pinMeshes = [];
        const labelMeshes = new Map();

        countries.forEach(country => {
            const position = latLonToVector3(country.latitude, country.longitude, globeRadius);

            const collisionRadius = 0.3;
            const collisionGeometry = new THREE.SphereGeometry(collisionRadius, 16, 16);
            const collisionMaterial = new THREE.MeshBasicMaterial({ visible: false });
            const collisionMesh = new THREE.Mesh(collisionGeometry, collisionMaterial);
            collisionMesh.position.copy(position.clone().add(new THREE.Vector3(0, 0.1, 0)));
            collisionMesh.userData = { country };
            globeGroup.add(collisionMesh);

            const pinGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const pinMaterial = new THREE.MeshBasicMaterial({ color: '#e2601a' });
            const pinMesh = new THREE.Mesh(pinGeometry, pinMaterial);
            pinMesh.position.copy(position.clone().add(new THREE.Vector3(0, 0.1, 0)));
            globeGroup.add(pinMesh);

            const normalizedPosition = position.clone().normalize();
            const labelPosition = normalizedPosition.multiplyScalar(totalDistance);

            const label = createLabel(country.countryName, labelPosition);
            labelMeshes.set(country.countryName, label);
            globeGroup.add(label);

            pinMeshes.push(collisionMesh);
        });

        labelMeshes.forEach((label, name) => {
            label.visible = selectedCountry ? selectedCountry.countryName === name : false;
        });

        return pinMeshes;
    };

    const animateToCountry = (camera, controls, country, callback) => {
        const globeRadius = 5;
        const countryPosition = latLonToVector3(country.latitude, country.longitude, globeRadius);

        const step = 0.1;

        camera.position.lerp(countryPosition.clone().setLength(globeRadius * 2), step);
        camera.lookAt(countryPosition);

        controls.update();

        if (camera.position.distanceTo(countryPosition.clone().setLength(globeRadius * 2)) < 0.01) {
            if (callback) callback();
        }
    };

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setIsPopupVisible(true);
        setIsAnimatingToCountry(true);
    };

    return (
        <div className="relative w-full h-full flex">
            <div ref={mountRef} className="w-3/4 h-full" />
            {isPopupVisible && (
                <CountryPopup
                    country={selectedCountry}
                    onClose={() => {
                        setIsPopupVisible(false);
                        setSelectedCountry(null);
                    }}
                    onConversationClick={onConversationClick}
                />
            )}
            {!selectedCountry && (
                <CountrySelector
                    countries={countries}
                    onCountryClick={handleCountryClick}
                />
            )}
        </div>
    );
};

export default Globe;