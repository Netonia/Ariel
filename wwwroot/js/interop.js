// Theme management
window.setTheme = function (theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Update Mermaid theme
    if (window.mermaid) {
        window.mermaid.initialize({
            startOnLoad: false,
            theme: theme === 'dark' ? 'dark' : 'default',
            securityLevel: 'loose'
        });
        
        // Re-render if there's content
        const previewDiv = document.getElementById('mermaid-preview');
        if (previewDiv && previewDiv.innerHTML) {
            // Trigger re-render by clearing and letting Blazor call renderMermaid again
        }
    }
};

// Extract mermaid code from markdown
function extractMermaidCode(markdown) {
    const mermaidRegex = /```mermaid\s+([\s\S]*?)```/g;
    const matches = [];
    let match;
    
    while ((match = mermaidRegex.exec(markdown)) !== null) {
        matches.push(match[1].trim());
    }
    
    return matches;
}

// Render Mermaid diagrams
window.renderMermaid = async function (markdown) {
    const previewDiv = document.getElementById('mermaid-preview');
    if (!previewDiv || !window.mermaid) {
        console.error('Preview div or Mermaid not found');
        return;
    }
    
    try {
        // Extract mermaid code blocks
        const mermaidCodes = extractMermaidCode(markdown);
        
        if (mermaidCodes.length === 0) {
            previewDiv.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 2rem;">No Mermaid diagrams found. Add a ```mermaid code block to see the preview.</div>';
            return;
        }
        
        // Clear previous content
        previewDiv.innerHTML = '';
        
        // Render each diagram
        for (let i = 0; i < mermaidCodes.length; i++) {
            const code = mermaidCodes[i];
            const diagramId = `mermaid-diagram-${i}-${Date.now()}`;
            
            try {
                const { svg } = await window.mermaid.render(diagramId, code);
                
                const container = document.createElement('div');
                container.className = 'mermaid-diagram';
                container.innerHTML = svg;
                container.style.margin = '1rem 0';
                
                previewDiv.appendChild(container);
            } catch (error) {
                console.error('Error rendering diagram:', error);
                const errorDiv = document.createElement('div');
                errorDiv.style.color = '#ff6b6b';
                errorDiv.style.padding = '1rem';
                errorDiv.style.border = '1px solid #ff6b6b';
                errorDiv.style.borderRadius = '4px';
                errorDiv.style.margin = '1rem 0';
                errorDiv.textContent = `Error rendering diagram ${i + 1}: ${error.message}`;
                previewDiv.appendChild(errorDiv);
            }
        }
    } catch (error) {
        console.error('Error in renderMermaid:', error);
        previewDiv.innerHTML = `<div style="color: #ff6b6b; padding: 1rem;">Error: ${error.message}</div>`;
    }
};

// Export diagram as SVG
window.exportDiagramAsSvg = function () {
    const previewDiv = document.getElementById('mermaid-preview');
    if (!previewDiv) return;
    
    const svg = previewDiv.querySelector('svg');
    if (!svg) {
        alert('No diagram to export');
        return;
    }
    
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Export diagram as PNG
window.exportDiagramAsPng = function () {
    const previewDiv = document.getElementById('mermaid-preview');
    if (!previewDiv) return;
    
    const svg = previewDiv.querySelector('svg');
    if (!svg) {
        alert('No diagram to export');
        return;
    }
    
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'diagram.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
};
