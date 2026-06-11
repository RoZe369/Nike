import mermaid from 'mermaid';

/**
 * Inicializa Mermaid.js para diagramas
 */
export const initMermaid = () => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'Segoe UI, sans-serif',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    classDiagram: {
      useMaxWidth: true
    }
  });
};

/**
 * Renderiza un diagrama de Mermaid
 * @param {string} elementId - ID del elemento DOM
 * @param {string} definition - Definición del diagrama
 */
export const renderDiagram = async (elementId, definition) => {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = definition;
      await mermaid.run({
        nodes: [element]
      });
    }
  } catch (error) {
    console.error('Error renderizando diagrama:', error);
  }
};

export default mermaid;