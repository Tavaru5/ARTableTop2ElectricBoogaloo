// @flow
import React from 'react';

import { ViroBox, ViroMaterials } from 'react-viro';

type Props = {
  width: number,
  height: number,
  squareSize: number,
};

function colorForTile(tileNum: number, height: number) {
  let tileNumUsed = tileNum;
  if (Math.floor(tileNum / height) % 2) {
    tileNumUsed += 1;
  }
  if (tileNumUsed % 2) {
    return 'black';
  }
  return 'white';
}

function Board(props: Props) {
  const buffer = [];
  // Space between a tile and the tile next to it, in percentage of tile
  const emptinessScale = 0.1;
  // Height scale, based on size
  const heightScale = 0.2;
  // Default size
  let size = 0.05;
  if (props.squareSize != null) {
    size = props.squareSize;
  }
  let i;
  for (i = 0; i < props.width * props.height; i++) {
    buffer.push(
      <ViroBox
        position={[
          props.width / (2 / size) - size * Math.floor(i / props.width),
          0,
          props.height / (2 / size) - size * (i % props.height),
        ]}
        height={heightScale * size}
        length={size * (1 - emptinessScale)}
        width={size * (1 - emptinessScale)}
        materials={colorForTile(i, props.width)}
      />,
    );
  }
  return buffer;
}

ViroMaterials.createMaterials({
  black: {
    diffuseColor: 'black',
  },
  white: {
    diffuseColor: 'white',
  },
});

export default Board;
