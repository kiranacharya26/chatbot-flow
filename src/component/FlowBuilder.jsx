import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDrop } from 'react-dnd';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

const initialNodes = [];
const initialEdges = [];

let id = 0;
//  generate ID for nodes
const getId = () => `${id++}`;

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // Callback for connecting nodes with edges
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleDrop = useCallback(
    (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const position = {
        x: clientOffset.x - 200,
        y: clientOffset.y,
      };

      const newNode = {
        id: getId(),
        type: item.type,
        position,
        data: { label: `${item.label}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'node',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const updateNodeText = (nodeId, text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
    setSelectedNode((prev) => (prev && prev.id === nodeId ? { ...prev, data: { ...prev.data, label: text } } : prev));
  };

  const handleSave = () => {
    const emptyTargetNodes = nodes.filter((node) =>
      edges.every((edge) => edge.target !== node.id)
    );

    if (nodes.length > 1 && emptyTargetNodes.length > 1) {
      alert('Error: More than one node has empty target handles.');
      return;
    }

    const flowData = { nodes, edges };
    console.log('Saved Flow:', flowData);
    alert('Flow saved successfully!');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <NodesPanel />
      {selectedNode && (
        <SettingsPanel selectedNode={selectedNode} updateNodeText={updateNodeText} />
      )}
      <div ref={drop} style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        {isOver && canDrop && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              zIndex: 10,
            }}
          />
        )}
      </div>
      <button onClick={handleSave} style={{ position: 'absolute', bottom: 10, right: 10 }}>
        Save Flow
      </button>
    </div>
  );
}

export default FlowBuilder;
