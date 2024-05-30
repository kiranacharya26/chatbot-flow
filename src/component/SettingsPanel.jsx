// src/SettingsPanel.js
import React from 'react';

const SettingsPanel = ({ selectedNode, updateNodeText }) => {
    const handleTextChange = (event) => {
        updateNodeText(selectedNode.id, event.target.value);
    };

    return (
        <div style={{ padding: '10px', width: '200px', borderRight: '1px solid gray' }}>
            <h3>Settings Panel</h3>
            <div>
                <label>Node Text:</label>
                <input
                    type="text"
                    value={selectedNode.data.label}
                    onChange={handleTextChange}
                />
            </div>
        </div>
    );
};

export default SettingsPanel;
