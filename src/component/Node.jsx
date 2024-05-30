
import React, { useState } from 'react';

function NodeAdder({ onAddNode }) {
    const [nodeLabel, setNodeLabel] = useState('');

    const handleAddNode = () => {
        onAddNode(nodeLabel);
        setNodeLabel('');
    };

    return (
        <div style={{ margin: '10px' }}>
            <input
                type="text"
                value={nodeLabel}
                onChange={(e) => setNodeLabel(e.target.value)}
                placeholder="Node Label"
            />
            <button onClick={handleAddNode}>Add Node</button>
        </div>
    );
}

export default NodeAdder;
