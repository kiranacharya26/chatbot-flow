// src/NodesPanel.js
import React from 'react';
import { useDrag } from 'react-dnd';

const nodeTypes = [
    { id: 'text', label: 'Text Node', type: 'text' },
];

const NodeItem = ({ node }) => {
    const [, drag] = useDrag(() => ({
        type: 'node',
        item: node,
    }));

    return (
        <div ref={drag} style={{ padding: '8px', border: '1px solid gray', marginBottom: '4px', cursor: 'move' }}>
            {node.label}
        </div>
    );
};

const NodesPanel = () => {
    return (
        <div style={{ padding: '10px', width: '200px', borderRight: '1px solid gray' }}>
            <h3>Nodes Panel</h3>
            {nodeTypes.map((node) => (
                <NodeItem key={node.id} node={node} />
            ))}
        </div>
    );
};

export default NodesPanel;
