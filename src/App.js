import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Card from './Card'
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

// here we generate mock data
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    groupName: `Column ${k}`,
    id: `item-${k + offset}-${new Date().getTime()}`,
    cardData: {
        id: `id : ${k}`,
        title:  ` Homies always help homies` ,
        dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
        author:  `Jake`
    }
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const columnData = [
    getItems(3),
    getItems(1),
    getItems(4),
    getItems(2)
]

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "150px",
  backgroundColor: "white",
  borderRadius: "5px",
  color: "#282c34",
  fontWeight: "bold",
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `5px 0 ${grid}px`,
 // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "lightgrey",
  border : isDraggingOver ? "black" : "yellow",
  padding: grid,
  width: 250,
  
});

function App() {
 const [state, setState] = useState(columnData);

  function onDragEnd(result) {
    const { source, destination } = result;

    // if its dropped outside the column
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                <h3 className='grp-title'>{`Column ${ind}`}</h3>
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          
                        >
                        <Card
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                            {...item.cardData}
                        />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
  );
}
export default App;