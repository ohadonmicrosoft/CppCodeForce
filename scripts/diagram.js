/*************************************************************
 * diagram.js
 * Minimal Konva example: Draggable BFS nodes
 *************************************************************/

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("konvaContainer");
    if (!container) return;
  
    // We'll create a stage & layer
    const stageWidth = 800;
    const stageHeight = 600;
    const stage = new Konva.Stage({
      container: 'konvaContainer',
      width: stageWidth,
      height: stageHeight
    });
    const layer = new Konva.Layer();
    stage.add(layer);
  
    // Helper: create a circle node
    function createNode(x, y, label) {
      const group = new Konva.Group({ x, y, draggable: true });
      const circle = new Konva.Circle({
        radius: 30,
        fill: '#FFDADA',
        stroke: '#FF7F7F',
        strokeWidth: 2
      });
      const text = new Konva.Text({
        text: label,
        fontSize: 16,
        fontFamily: 'ADLaM Display',
        fill: '#333',
        x: -10, y: -8
      });
      group.add(circle);
      group.add(text);
      layer.add(group);
      return group;
    }
  
    // Create some BFS nodes
    const nodeA = createNode(100, 100, 'A');
    const nodeB = createNode(300, 200, 'B');
    const nodeC = createNode(500, 150, 'C');
  
    layer.draw();
  });
  