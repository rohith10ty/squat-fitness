/**
 * Centered 3D cubes coordinates:
 * Mathematically projected under perspective: 10000px and z: -30000px to start
 * EXACTLY where the centered arch logo is (top: 36%, left: 50%) in the middle of the viewport,
 * tumble forward through 3D space, and expand outward into the framing positions around Header 2.
 */
export const cubesData = {
  "cube-1": {
    initial: {
      top: -11,
      left: 37.5,
      rotateX: 360,
      rotateY: -360,
      rotateZ: -48,
      z: -30000,
    },
    final: {
      top: 50,
      left: 15,
      rotateX: 0,
      rotateY: 3,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-2": {
    initial: {
      top: 9,
      left: 32.5,
      rotateX: -360,
      rotateY: 360,
      rotateZ: 90,
      z: -30000,
    },
    final: {
      top: 75,
      left: 25,
      rotateX: 1,
      rotateY: 2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-3": {
    initial: {
      top: -21,
      left: 50,
      rotateX: -360,
      rotateY: -360,
      rotateZ: -180,
      z: -30000,
    },
    final: {
      top: 25,
      left: 25,
      rotateX: -1,
      rotateY: 2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-4": {
    initial: {
      top: 9,
      left: 50,
      rotateX: -360,
      rotateY: -360,
      rotateZ: -180,
      z: -30000,
    },
    final: {
      top: 75,
      left: 75,
      rotateX: 1,
      rotateY: -2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-5": {
    initial: {
      top: -11,
      left: 62.5,
      rotateX: 360,
      rotateY: 360,
      rotateZ: -135,
      z: -30000,
    },
    final: {
      top: 25,
      left: 75,
      rotateX: -1,
      rotateY: -2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-6": {
    initial: {
      top: 9,
      left: 67.5,
      rotateX: -180,
      rotateY: -360,
      rotateZ: -180,
      z: -30000,
    },
    final: {
      top: 50,
      left: 85,
      rotateX: 0,
      rotateY: -3,
      rotateZ: 0,
      z: 0,
    },
  },
};
