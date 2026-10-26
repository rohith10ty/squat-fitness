/**
 * Coordinates for the 6 3D cubes.
 * The cubes start EXACTLY where the centered arch logo is in the middle of the viewport (top: ~33%, left: ~50%),
 * tumble forward through 3D space with perspective rotation,
 * and expand outward to form the signature arch framing Header 2 in the center.
 */
export const cubesData = {
  "cube-1": {
    initial: {
      top: 29.5,
      left: 46.5,
      rotateX: 360,
      rotateY: -360,
      rotateZ: -48,
      z: -7000,
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
      top: 36.5,
      left: 46.0,
      rotateX: -360,
      rotateY: 360,
      rotateZ: 90,
      z: -7000,
    },
    final: {
      top: 75,
      left: 24,
      rotateX: 1,
      rotateY: 2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-3": {
    initial: {
      top: 29.5,
      left: 50.0,
      rotateX: -360,
      rotateY: -360,
      rotateZ: -180,
      z: -7000,
    },
    final: {
      top: 25,
      left: 24,
      rotateX: -1,
      rotateY: 2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-4": {
    initial: {
      top: 36.5,
      left: 50.0,
      rotateX: -360,
      rotateY: -360,
      rotateZ: -180,
      z: -7000,
    },
    final: {
      top: 75,
      left: 76,
      rotateX: 1,
      rotateY: -2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-5": {
    initial: {
      top: 29.5,
      left: 53.5,
      rotateX: 360,
      rotateY: 360,
      rotateZ: -135,
      z: -7000,
    },
    final: {
      top: 25,
      left: 76,
      rotateX: -1,
      rotateY: -2,
      rotateZ: 0,
      z: 0,
    },
  },
  "cube-6": {
    initial: {
      top: 36.5,
      left: 54.0,
      rotateX: -180,
      rotateY: -360,
      rotateZ: -180,
      z: -7000,
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
