import React from 'react';
import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

const CandidateCard = ({ candidate, index, onClick, stageTitle }) => (
    <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
        {(provided) => (
            <Card
                className="mb-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => onClick(candidate)}
                data-testid="candidate-card"
            >
                <Card.Body>
                    <Card.Title>{candidate.name}</Card.Title>
                    <Card.Text>{stageTitle}</Card.Text>
                    <div>
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
