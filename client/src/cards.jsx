import { Link } from 'react-router'

export function CardList({ entries, filteredText, onCardClick }) {
  const cards = entries
    .filter(entry => entry.title.toLowerCase().includes(filteredText.toLowerCase()))
    .map(entry => (
      <Card
        id_post={entry.id_post} 
        key={entry.id_post} 
        entry={entry} 
        onCardClick={onCardClick} 
      />
    ));

  return (
    <div className='card-list'>
      {cards}
    </div>
  )
}

export function Card({ entry, onCardClick, id_post}){
  return(
    <div className='card'>
      <Link to={'/blog/'+id_post}>
        <img src={entry.image} alt={entry.title} />
        <h1>{entry.title}</h1>
      </Link>
    </div>
  )
}