import React from 'react'
import logo from './logo.svg';
import './App.css';
import Column from './Column'

const cardData = [
  {
    dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
    title: "A Homies always help homies",
    author:"Jake",
    id:"1"
  },
  {
    dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
    title: "B Homies always help homies",
    author:"Jake",
    id:"1"
  },
  {
    dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
    title: "C Homies always help homies",
    author:"Jake",
    id:"2"
  },
  {
    dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
    title: "D Homies always help homies",
    author:"Jake",
    id:"3"
  },
  {
    dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
    title: "E Homies always help homies",
    author:"Jake",
    id:"4"
  },
  {
    dispImage: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg',
    title: "F Homies always help homies",
    author:"Jake",
    id:"5"
  }
];


const columnData = [
  {
    groupName: "A",
    groupId: 1,
    groupCardData: [cardData[0]]
  },
  {
    groupName: "B",
    groupId: 2,
    groupCardData: cardData
  },
  {
    groupName: "C",
    groupId: 3,
    groupCardData: [cardData[0], cardData[2]]
  },
  {
    groupName: "D",
    groupId: 4,
    groupCardData: cardData
  }
];

const initialState = {
  columnData
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...initialState }
  }

  render () {
    const { columnData } = this.state
    return (
    <div className='App'>
      <header className='App-header'>
        {
          columnData && columnData.map((column, idx) => {
            return <Column
            key={idx}
            groupName={column.groupName}
            groupId={column.groupId}
            cardData={column.groupCardData}
            />
          })
        }
      </header>
    </div>
    )
  }
}
export default App;
