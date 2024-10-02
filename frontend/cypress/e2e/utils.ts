// @flow
const prefix: string = 'data-rbd';

const dragHandle = (() => {
  const base = `${prefix}-drag-handle`;

  return {
    base,
    draggableId: `${base}-draggable-id`,
    contextId: `${base}-context-id`,
  };
})();

const droppable = (() => {
  const base: string = `${prefix}-droppable`;
  return {
    base,
    contextId: `${base}-context-id`,
    id: `${base}-id`,
  };
})();

export function getDroppableSelector(droppableId?: string) {
  if (droppableId) {
    return `[${droppable.id}="${droppableId}"]`;
  }
  return `[${droppable.id}]`;
}

export function getHandleSelector(draggableId?: string) {
  if (draggableId) {
    return `[${dragHandle.draggableId}="${draggableId}"]`;
  }
  return `[${dragHandle.draggableId}]`;
}

