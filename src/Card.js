import './App.css';



function Card(props){
const { dispImage, title, author, id, style } = props
console.log(style)
  return ( 
    <div className='box' style={style}>
      <div className='textbox' draggable>
        <img src={dispImage} />
        <p>{title}</p>
        <h5 className='author'>{author}</h5>
        <h5 className='idlabel'>{id}</h5>
      </div>
    </div>
  )
}
export default Card;
