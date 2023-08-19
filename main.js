import {loadGLTF, loadVideo} from "./loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './note.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    //1st video

    const video = await loadVideo("https://cdn.glitch.global/cbd27f38-f96a-4cdb-813d-cdb87a43f01f/video2.dr?v=1692458728653");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 204/480);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0.1, 0); // Update the position of the video
    plane.rotation.set(0, THREE.MathUtils.degToRad(0), 0); // Update the rotation of the video
    plane.scale.set(1.5, 1.5, 1.5); // Update the scale of the video

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
        video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });

  
    // Second Video
    const video2 = await loadVideo("https://cdn.glitch.global/cbd27f38-f96a-4cdb-813d-cdb87a43f01f/video2.dr?v=1692458728653"); // Replace 'second-video.mp4' with the path to your second video
    const texture2 = new THREE.VideoTexture(video2);

    const geometry2 = new THREE.PlaneGeometry(1, 204/480);
    const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    const plane2 = new THREE.Mesh(geometry2, material2);
    plane2.position.set(0, 0.1, 0); // Update the position of the second video
    plane2.rotation.set(0, THREE.MathUtils.degToRad(0), 0); // Update the rotation of the second video
    plane2.scale.set(1.5, 1.5, 1.5); // Update the scale of the second video

    const anchor2 = mindarThree.addAnchor(1); // Use a different anchor index for the second video
    anchor2.group.add(plane2);

    anchor2.onTargetFound = () => {
      video2.play();
    };
    anchor2.onTargetLost = () => {
      video2.pause();
    };
    video2.addEventListener('play', () => {
      // You can set any desired starting time for the second video here
      // For example, to start at 10 seconds:
      video2.currentTime = 10;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
