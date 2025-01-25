import {FaRegStar, FaShoppingBag, FaLocationArrow} from 'react-icons/fa'
//import {FaLocationDot, FaBagShopping} from 'react-icons/fa6'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    packagePerAnnum,
    title,
  } = jobDetails
  const path = `/jobs/${id}`
  //console.log(id);
  return (
    <li className='jobcard-container'>
      <Link to={path} className='job-link'>
        <div className='company-profile'>
          <img
            className='company-logo'
            src={companyLogoUrl}
            alt='company logo'
          />
          <div>
            <h1 className='jobcard-title'>{title}</h1>
            <div className='company-profile'>
              <FaRegStar className='rating-star' color='#fbbf24' />
              <p>{rating} </p>
            </div>
          </div>
        </div>
        <div className='logos-flex'>
          <div className='company-profile'>
            <div className='company-profile'>
              <FaLocationArrow className='react-icons' color='#ffffff' />
              <p>{location}</p>
            </div>
            <div className='company-profile'>
              <FaShoppingBag
                className='react-icons'
                color='#ffffff'
                height='20'
              />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className='jobcard-title'>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
