import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const TravelStoryCard = (
    {imgUrl,
     title, 
     story, 
     date, 
     visitedLocation, 
     isFavorite, 
     onEdit, 
     onClick, 
     onFavoriteClick
    }) => {

  return (
    <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer'>
        <img 
        src={imgUrl} 
        alt={title}
        className='w-full h-60 object-cover rounded-lg'
        onClick={onClick}
        />
        <div className='p-4' onClick={onClick}></div>
        <div className='flex items-center gap-3'></div>
        <div className='text-sm font-medium '>{title}</div>
        <span className='text-xs text-slate-500'>
            {date ? moment(date).format('Do MMMM YYYY') : '-'}
        </span>
    </div>
  )
}

export default TravelStoryCard;

TravelStoryCard.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    story: PropTypes.string,
    date: PropTypes.string,
    visitedLocation: PropTypes.string,
    isFavorite: PropTypes.bool,
    onEdit: PropTypes.func,
    onClick: PropTypes.func,
    onFavoriteClick: PropTypes.func
};
