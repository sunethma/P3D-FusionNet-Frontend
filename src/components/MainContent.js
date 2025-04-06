import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ImageDisplay from './ImageDisplay';
import ReviewPopup from './ReviewPopup';
import ReviewNotification from './ReviewNotification';
import ImageTypeErrorModal from './ImageTypeErrorModal';


function MainContent() {
  const [showImageTypeErrorModal, setShowImageTypeErrorModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedModel, setGeneratedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showReviewNotification, setShowReviewNotification] = useState(false);
  const modelViewerRef = useRef(null);
  const threeJsContainerRef = useRef(null);
  const sceneRef = useRef(null);

  const fileInputRef = useRef(null);

  const validateImageUpload = async (file) => {
    // Allowed file types
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setShowImageTypeErrorModal(true);
      return false;
    }
    
    // Check file size (10MB limit)
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      alert('File is too large. Maximum file size is 10MB.');
      return false;
    }
    
    return true;
  };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Perform validation first
      const isValid = await validateImageUpload(file);
      
      if (isValid) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          setGeneratedModel(null);
        };
        reader.readAsDataURL(file);
      } else {
        // Reset file input if validation fails
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };


  const clearContent = () => {
    setSelectedImage(null);
    setGeneratedModel(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Clear Three.js scene if exists
    if (threeJsContainerRef.current) {
      threeJsContainerRef.current.innerHTML = '';
    }
  };

  const generateModel = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    setLoadingProgress(0);
  
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append('file', blob, 'uploaded_image.png');
  
      const apiResponse = await fetch('https://Sunethma-p3d-fusionnet-backend.hf.space/generate', {
        method: 'POST',
        body: formData
      });
  
      const result = await apiResponse.json();
  
      if (result.objData) {
        setGeneratedModel(result.objData);
        setLoadingProgress(100);
        // Show review notification after model generation
        setShowReviewNotification(true);
      } else {
        throw new Error('No model generated');
      }
    } catch (error) {
      console.error('Error generating model:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const downloadModel = () => {
    if (generatedModel) {
      const blob = new Blob([generatedModel], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generated_model.obj';
      link.click();
    }
  };

  useEffect(() => {
    if (generatedModel && threeJsContainerRef.current) {
      // Clean up previous scene
      if (sceneRef.current) {
        const currentScene = sceneRef.current;
        currentScene.children.forEach(child => {
          if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      }
  
      // Create scene with high-quality settings
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
  
      // Calculate container dimensions
      const containerWidth = threeJsContainerRef.current.clientWidth;
      const containerHeight = threeJsContainerRef.current.clientHeight;
  
      const camera = new THREE.PerspectiveCamera(
        75, 
        containerWidth / containerHeight, 
        0.1, 
        1000
      );
  
      const renderer = new THREE.WebGLRenderer({ 
        antialias: false,  // Disable anti-aliasing for blocky look
        alpha: true,
        precision: "highp"
      });
      renderer.setSize(containerWidth, containerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      threeJsContainerRef.current.innerHTML = '';
      threeJsContainerRef.current.appendChild(renderer.domElement);
  
      // Enhanced lighting for better visibility
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
  
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(5, 5, 5);
      scene.add(directionalLight1);
  
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);
  
      // Advanced OBJ loading with voxel-like rendering
      const loader = new OBJLoader();
      
      // Create a blob from the model data
      const modelBlob = new Blob([generatedModel], { type: 'text/plain' });
      const modelUrl = URL.createObjectURL(modelBlob);
      
      loader.load(
        modelUrl, 
        (object) => {
          // Create a voxel-like representation
          const voxelGroup = new THREE.Group();
  
          object.traverse((child) => {
            if (child.isMesh) {
              // Compute bounding box to understand model dimensions
              const box = new THREE.Box3().setFromObject(child);
              const size = box.getSize(new THREE.Vector3());
              const center = box.getCenter(new THREE.Vector3());
  
              // Create a voxel grid
              const voxelSize = 0.54; // Adjust this for more/less detailed voxels
              const gridHelper = new THREE.GridHelper(
                Math.max(size.x, size.y, size.z) * 1.2, 
                Math.ceil(Math.max(size.x, size.y, size.z) / voxelSize),
                0x808080, 
                0x808080
              );
              gridHelper.position.copy(center);
              scene.add(gridHelper);
  
              // Create a more blocky material
              const material = new THREE.MeshBasicMaterial({
                color: 0x808080,  // Gray color similar to the second image
                wireframe: false,
                transparent: false,
                opacity: 1
              });
  
              // Iterate through vertices and create cube voxels
              child.geometry.attributes.position.array.forEach((coord, index) => {
                if (index % 3 === 0) {
                  const x = coord;
                  const y = child.geometry.attributes.position.array[index + 1];
                  const z = child.geometry.attributes.position.array[index + 2];
  
                  const voxelGeometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
                  const voxelMesh = new THREE.Mesh(voxelGeometry, material);
                  
                  // Position voxel relative to model's center
                  voxelMesh.position.set(
                    x - center.x, 
                    y - center.y, 
                    z - center.z
                  );
  
                  voxelGroup.add(voxelMesh);
                }
              });
  
              scene.add(voxelGroup);
            }
          });
  
          // Camera positioning
          camera.position.z = 20;
          camera.lookAt(scene.position);
  
          // Advanced orbit controls with improved center and zoom
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.rotateSpeed = 0.5;
          controls.zoomSpeed = 1.2;
          controls.screenSpacePanning = false;
          controls.maxPolarAngle = Math.PI;
          
          // Ensure model is centered and fills view
          controls.target.copy(scene.position);
          controls.update();
  
          // Render loop with performance optimization
          function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          }
          animate();
  
          sceneRef.current = scene;
        },
        // Progress callback
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% model loaded');
        },
        // Error callback
        (error) => {
          console.error('Error loading OBJ model:', error);
        }
      );
  
      // Responsive resize handler
      const handleResize = () => {
        const newWidth = threeJsContainerRef.current.clientWidth;
        const newHeight = threeJsContainerRef.current.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener('resize', handleResize);
  
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [generatedModel]);

  return (
    <div className="app relative">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-message">
              Generating 3D Model...
            </div>
          </div>
        </div>
      )}

      {/* Review Notification */}
      {showReviewNotification && (
        <ReviewNotification 
          onClose={() => setShowReviewNotification(false)}
          onReview={() => setShowReviewPopup(true)}
        />
      )}

      {/* Review Popup */}
      {showReviewPopup && (
        <ReviewPopup 
          onClose={() => {
            setShowReviewPopup(false);
            setShowReviewNotification(false);
          }}
          onCancelKeepNotification={() => {
            setShowReviewPopup(false);
          }}
        />
      )}
      {/* Image Type Error Modal */}
      {showImageTypeErrorModal && (
        <ImageTypeErrorModal 
          onClose={() => setShowImageTypeErrorModal(false)} 
        />
      )}
    
      <main className="main-content">
        <div className="display-container">
          <div className="display-box">
            <ImageDisplay 
              ref={fileInputRef}
              image={selectedImage} 
              alt="Uploaded Image" 
              placeholder="Upload an image" 
              onChange={handleImageUpload} 
            />
            <button 
              className="action-button generate-button" 
              onClick={generateModel} 
              disabled={!selectedImage || isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className="display-box">
            {generatedModel ? (
              <div 
                ref={threeJsContainerRef} 
                className="model-viewer"
                style={{ width: '100%', height: '400px' }}
              />
            ) : (
              <ImageDisplay 
                image={null} 
                alt="Generated 3D Model" 
                placeholder="3D model will appear here" 
                readOnly 
              />
            )}
            <button 
              className="action-button download-button" 
              onClick={downloadModel}
              disabled={!generatedModel || isLoading}
            >
              Download
            </button>
          </div>
        </div>

        {/* Clear Button */}
        {(selectedImage || generatedModel) && (
          <button 
            className="clear-button" 
            onClick={clearContent}
            >
            <span>Clear</span>
          </button>
        )}
      </main>
    </div>
  );
}

export default MainContent;