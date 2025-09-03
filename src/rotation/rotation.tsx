import React, { useState } from 'react';
import AddSpotModal from '../AddSpotModal/AddSpotModal';
import { SpotComponent } from '../spot/spot';
import { useSpotContext } from '../spot/SpotContext';
import './rotation.css';
const { spots, dispatch } = useSpotContext();



const Rotation: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddSpotClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalSubmit = (spot: { id: string; owner?: string; name?: string }) => {
        dispatch({
            type: 'add',
            payload: {
                id: spot.id,
                owner: spot.owner ?? undefined,
                name: spot.name ?? undefined,
            }
        });
        setModalOpen(false);
    };

    return (
        <div>
            <div className="rotation-container">
                {spots.map((spot) => (
                    <SpotComponent key={spot.id} spot={spot} />
                ))}
            </div>
            <div className="AddSpotButton" onClick={handleAddSpotClick} style={{ cursor: 'pointer' }}>+</div>
            <AddSpotModal isOpen={modalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
        </div>
    );
};

export default Rotation;
