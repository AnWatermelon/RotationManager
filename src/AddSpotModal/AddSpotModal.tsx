import React, { useState } from 'react';
import './AddSpotModal.css';

export interface AddSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (spot: { id: string; owner?: string; name?: string }) => void;
}

const AddSpotModal: React.FC<AddSpotModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [id, setId] = useState('');
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id.trim()) {
      setError('Id is required');
      return;
    }
    setError('');
    onSubmit({ id, owner: owner || undefined, name: name || undefined });
    setId('');
    setOwner('');
    setName('');
  };

  return (
    <div className="add-spot-modal-overlay">
      <div className="add-spot-modal">
        <button className="add-spot-modal-close" onClick={onClose}>×</button>
        <h2>Add Spot</h2>
        <form className="add-spot-modal-form" onSubmit={handleSubmit}>
            <label>
            Id<span className="required-asterisk">*</span>:<br />
            <input value={id} onChange={e => setId((e.target as HTMLInputElement).value)} required />
            </label>
          <label>
            Owner:<br />
            <input value={owner} onChange={e => setOwner((e.target as HTMLInputElement).value)} />
          </label>
          <label>
            Name:<br />
            <input value={name} onChange={e => setName((e.target as HTMLInputElement).value)} />
          </label>
          {error && <div className="add-spot-modal-error">{error}</div>}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddSpotModal;
