import './App.css';
import Card from './Card';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Column(props){
    const { groupName, cardData } = props;
    return (
        <div className='drag-n-drop'>
          <div className='dnd-group'>
            <h3 className='grp-title'>{groupName}</h3>
            {
              cardData && cardData.map((card, idx) => {
              return <Card
                key={idx}
                id={card.id}
                dispImage= {card.dispImage}
                title={card.title}
                author={card.author}
              />
              })
            }
          </div>
        </div>
    )
}
export default Column