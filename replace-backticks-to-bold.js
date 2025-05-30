 // Function to convert backticks to bold text
        function convertBackticksToBold(text) {
            // Replace double backticks first
            text = text.replace(/``(.*?)``/g, '<strong>$1</strong>');
            // Replace single backticks
            text = text.replace(/`([^`]+)`/g, '<strong>$1</strong>');
            return text;
        }

        // Process all text nodes in the document
        function processTextNodes(node) {
            if (node.nodeType === 3) { // Text node
                const newText = convertBackticksToBold(node.textContent);
                if (newText !== node.textContent) {
                    const span = document.createElement('span');
                    span.innerHTML = newText;
                    node.parentNode.replaceChild(span, node);
                }
            } else if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                // Skip script and style tags but process all other nodes
                Array.from(node.childNodes).forEach(processTextNodes);
            }
        }

        // Run the conversion when the document is loaded
        document.addEventListener('DOMContentLoaded', () => {
            processTextNodes(document.body);
        });
