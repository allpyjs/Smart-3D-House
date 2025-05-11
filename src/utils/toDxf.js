export function toDxfFromMesh(meshOrGroup) {
    const header = `0\nSECTION\n2\nHEADER\n0\nENDSEC\n`;
    const tables = `0\nSECTION\n2\nTABLES\n0\nENDSEC\n`;
    const blocks = `0\nSECTION\n2\nBLOCKS\n0\nENDSEC\n`;
    const entitiesStart = `0\nSECTION\n2\nENTITIES\n`;
  
    let entities = "";
  
    const meshes = [];
  
    // Recursively find meshes
    meshOrGroup.traverse((obj) => {
      if (obj.isMesh && obj.geometry?.isBufferGeometry) {
        meshes.push(obj);
      }
    });
  
    meshes.forEach((mesh) => {
      const geometry = mesh.geometry.clone();
      geometry.applyMatrix4(mesh.matrixWorld); // Apply world transforms
  
      const pos = geometry.getAttribute("position");
  
      for (let i = 0; i < pos.count; i += 3) {
        const x1 = pos.getX(i).toFixed(3);
        const y1 = pos.getY(i).toFixed(3);
        const z1 = pos.getZ(i).toFixed(3);
  
        const x2 = pos.getX(i + 1).toFixed(3);
        const y2 = pos.getY(i + 1).toFixed(3);
        const z2 = pos.getZ(i + 1).toFixed(3);
  
        const x3 = pos.getX(i + 2).toFixed(3);
        const y3 = pos.getY(i + 2).toFixed(3);
        const z3 = pos.getZ(i + 2).toFixed(3);
  
        // Add 3 lines to form the triangle
        entities += createDxfLine(x1, y1, z1, x2, y2, z2);
        entities += createDxfLine(x2, y2, z2, x3, y3, z3);
        entities += createDxfLine(x3, y3, z3, x1, y1, z1);
        entities += createDxf3DFace(x1, y1, z1, x2, y2, z2, x3, y3, z3);

      }
    });
  
    const entitiesEnd = `0\nENDSEC\n0\nEOF`;
  
    return header + tables + blocks + entitiesStart + entities + entitiesEnd;
  }
  
  function createDxfLine(x1, y1, z1, x2, y2, z2) {
    return `0\nLINE\n8\n0\n10\n${x1}\n20\n${y1}\n30\n${z1}\n11\n${x2}\n21\n${y2}\n31\n${z2}\n`;
  }
  
  function createDxf3DFace(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    // Repeat the third vertex to create a 3-point face
    return `0\n3DFACE\n8\n0\n10\n${x1}\n20\n${y1}\n30\n${z1}\n11\n${x2}\n21\n${y2}\n31\n${z2}\n12\n${x3}\n22\n${y3}\n32\n${z3}\n13\n${x3}\n23\n${y3}\n33\n${z3}\n`;
  }
  