import { NavLink } from "react-router-dom";

export const Gallery_Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className='portfolio-item'>
      <div className='hover-bg'>
        {' '}
        <a
          href={largeImage}
          title={title}
          data-lightbox-gallery='gallery1'
        >
          <img
            src={smallImage}
            className='img-responsive'
            alt={title}
          />{' '}
        </a>{' '}
      </div>
    </div>
  )
}

export const Program_Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className='program-item'>
      <div className='hover-bg'>
        {' '}
        <NavLink className="nav-link" to="/programs"
          title={title}
          data-lightbox-gallery='gallery1'
        >
          <div className='hover-text'>
            <h4>{title}</h4>
          </div>
          <img
            src={smallImage}
            className='img-responsive'
            alt={title}
          />{' '}
        </NavLink>{' '}
      </div>
    </div>
  )
}