import React from 'react';
import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

const CandidateCard = ({ candidate, index, onClick }) => (
    <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
        {(provided) => (
            <Card
                className="candidate-card mb-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => onClick(candidate)}
            >
                <Card.Body className="candidate-card-body">
                    <Card.Title className="candidate-card-title">{candidate.name}</Card.Title>
                    <div className="candidate-card-rating">
                        {candidate.rating === 0 && Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} role="img" aria-label="rating">⚪</span>
                        ))}
                        {Array.from({ length: candidate.rating }).map((_, i) => (
                            <span key={i} role="img" aria-label="rating">🟢</span>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        )}
    </Draggable>
);

export default CandidateCard;
