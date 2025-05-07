import React from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/hooks/useChatStore';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const models = [
  { id: 'gpt-4.1', label: 'GPT-4.1 (Mojo)', color: '#f38d8d' },
  { id: 'gpt-o3', label: 'GPT-o3 (Reasoning)', color: '#faecc5' },
  { id: 'gpt-image-1', label: 'gpt-image-1 (Image)', color: '#f7e5b6' },
];

const ModelSwitcher: React.FC = () => {
  const currentModel = useChatStore((state) => state.model);
  const setModel = useChatStore((state) => state.setModel);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (id: string) => {
    setModel(id);
    setOpen(false);
  };

  const selected = models.find((m) => m.id === currentModel) || models[0];

  return (
    <div style={{ position: 'relative', display: 'inline-block', fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
      <Button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: selected.color,
          color: '#222',
          borderRadius: 18,
          fontWeight: 700,
          fontSize: 15,
          boxShadow: '2px 2px 0 #f7e5b6',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        variant="default"
      >
        {selected.label}
        <ChevronDownIcon className="h-5 w-5" />
      </Button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '2px 2px 0 #faecc5',
            zIndex: 10,
            minWidth: 180,
            padding: 4,
          }}
        >
          {models.map((model) => (
            <Button
              key={model.id}
              onClick={() => handleSelect(model.id)}
              style={{
                background: model.color,
                color: '#222',
                borderRadius: 14,
                fontWeight: 600,
                fontSize: 14,
                margin: 2,
                width: '100%',
                justifyContent: 'flex-start',
              }}
              variant={model.id === currentModel ? 'default' : 'ghost'}
            >
              {model.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSwitcher;