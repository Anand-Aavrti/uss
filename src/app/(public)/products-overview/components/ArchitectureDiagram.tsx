'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DiagramNode {
  id: string;
  name: string;
  type: 'product' | 'integration' | 'external';
  position: { x: number; y: number };
  connections: string[];
}

interface ArchitectureDiagramProps {
  onClose: () => void;
}

export default function ArchitectureDiagram({ onClose }: ArchitectureDiagramProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const nodes: DiagramNode[] = [
    {
      id: 'core',
      name: 'USS Core Platform',
      type: 'product',
      position: { x: 50, y: 30 },
      connections: ['analytics', 'security', 'api'],
    },
    {
      id: 'analytics',
      name: 'Analytics Engine',
      type: 'product',
      position: { x: 20, y: 60 },
      connections: ['core', 'external1'],
    },
    {
      id: 'security',
      name: 'Security Suite',
      type: 'product',
      position: { x: 50, y: 60 },
      connections: ['core', 'external2'],
    },
    {
      id: 'api',
      name: 'API Gateway',
      type: 'product',
      position: { x: 80, y: 60 },
      connections: ['core', 'external3'],
    },
    {
      id: 'external1',
      name: 'Data Warehouse',
      type: 'external',
      position: { x: 20, y: 90 },
      connections: ['analytics'],
    },
    {
      id: 'external2',
      name: 'Identity Provider',
      type: 'external',
      position: { x: 50, y: 90 },
      connections: ['security'],
    },
    {
      id: 'external3',
      name: 'Third-party Apps',
      type: 'external',
      position: { x: 80, y: 90 },
      connections: ['api'],
    },
  ];

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-xl shadow-xl w-full max-w-5xl">
          <div className="p-6">
            <div className="h-96 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-primary text-primary-foreground border-primary';
      case 'integration':
        return 'bg-accent text-accent-foreground border-accent';
      case 'external':
        return 'bg-muted text-foreground border-border';
      default:
        return 'bg-muted text-foreground border-border';
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              Architecture Diagram
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Visual representation of how USS products integrate in enterprise environments
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-300"
            aria-label="Close diagram"
          >
            <Icon name="XMarkIcon" size={24} className="text-foreground" />
          </button>
        </div>

        {/* Diagram */}
        <div className="flex-1 overflow-auto p-6">
          <div className="relative w-full h-[600px] bg-surface rounded-lg border border-border">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map((node) =>
                node.connections.map((targetId) => {
                  const target = nodes.find((n) => n.id === targetId);
                  if (!target) return null;
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={`${node.position.x}%`}
                      y1={`${node.position.y}%`}
                      x2={`${target.position.x}%`}
                      y2={`${target.position.y}%`}
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.5"
                    />
                  );
                })
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${getNodeColor(node.type)} ${
                  selectedNode === node.id ? 'scale-110 shadow-lg' : 'shadow-sm'
                }`}
                style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              >
                <div className="flex items-center space-x-2">
                  <Icon
                    name={
                      node.type === 'product'
                        ? 'CubeIcon'
                        : node.type === 'integration'
                          ? 'LinkIcon'
                          : 'CloudIcon'
                    }
                    size={20}
                  />
                  <span className="text-sm font-medium whitespace-nowrap">{node.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-primary border-2 border-primary" />
              <span className="text-sm text-muted-foreground">USS Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-muted border-2 border-border" />
              <span className="text-sm text-muted-foreground">External Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-accent" style={{ borderTop: '2px dashed #0EA5E9' }} />
              <span className="text-sm text-muted-foreground">Data Flow</span>
            </div>
          </div>

          {/* Selected Node Info */}
          {selectedNode && (
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon
                  name="InformationCircleIcon"
                  size={20}
                  className="text-accent flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {nodes.find((n) => n.id === selectedNode)?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click on nodes to view their connections and integration points in the
                    architecture.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Close Diagram
          </button>
        </div>
      </div>
    </div>
  );
}
