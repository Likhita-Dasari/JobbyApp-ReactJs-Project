import {Component} from 'react'
import {FaRegStar, FaShoppingBag, FaLocationArrow, FaCopy} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'
//JobCard Details

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobCardDetails extends Component {
  state = {
    cardDetails: [],
    similarCardDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCardDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    skills: data.skills,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
  })

  getSimilarFormattedData = data => {
    const similarData = data.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      rating: each.rating,
      title: each.title,
      location: each.location,
      jobDescription: each.job_description,
    }))
    return similarData
  }

  getCardDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const cardData = this.getFormattedData(data.job_details)
      const similarCardData = this.getSimilarFormattedData(data.similar_jobs)
      this.setState({
        cardDetails: {...cardData},
        similarCardDetails: [...similarCardData],
        apiStatus: apiStatusConstants.success,
      })
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobCardDetails = () => {
    const {cardDetails, similarCardDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      title,
      rating,
      skills,
    } = cardDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="jobs-section-background">
        <Header />
        <div className="job-card-details">
          <div className="jobcard-container">
            <div className="company-profile">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="company logo"
              />
              <div>
                <h1 className="jobcard-title">{title}</h1>
                <div className="company-profile">
                  <FaRegStar className="rating-star" color="#fbbf24" />
                  <p>{rating} </p>
                </div>
              </div>
            </div>
            <div className="logos-flex">
              <div className="company-profile">
                <div className="company-profile">
                  <FaLocationArrow className="react-icons" color="#ffffff" />
                  <p>{location}</p>
                </div>
                <div className="company-profile">
                  <FaShoppingBag
                    className="react-icons"
                    color="#ffffff"
                    height="20"
                  />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="job-card-skills1">
              <h1 className="jobcard-title">Description</h1>
              <a color="#6366f1" href={companyWebsiteUrl}>
                Visit
              </a>
            </div>
            <p>{jobDescription}</p>
            <h1 className="jobcard-title">Skills</h1>
            <ul className="job-card-skills">
              {skills.map(each => (
                <li key={each.name} className="job-card-skills-list">
                  <img
                    className="job-card-skills-image"
                    src={each.image_url}
                    alt={each.name}
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="jobcard-title">Life at Company</h1>
            <div className="job-card-skills1">
              <p>{description}</p>
              <img
                className="job-card-details-comapany-image"
                src={imageUrl}
                alt="similar job company logo"
              />
            </div>
          </div>
          <div>
            <h1 className="jobcard-title" color="#ffffff">
              Similar Jobs
            </h1>
            <ul className="job-card-skills1">
              {similarCardDetails.map(each => (
                <li key={id} className="jobcard-container">
                  <div className="company-profile">
                    <img
                      className="company-logo"
                      src={each.companyLogoUrl}
                      alt="company logo"
                    />
                    <div>
                      <h1 className="jobcard-title">{each.title}</h1>
                      <div className="company-profile">
                        <FaRegStar className="rating-star" color="#fbbf24" />
                        <p>{each.rating} </p>
                      </div>
                    </div>
                  </div>
                  <h1 className="jobcard-title">Description</h1>
                  <p>{each.jobDescription}</p>
                  <div className="company-profile">
                    <div className="company-profile">
                      <FaLocationArrow
                        className="react-icons"
                        color="#ffffff"
                      />
                      <p>{each.location}</p>
                    </div>
                    <div className="company-profile">
                      <FaShoppingBag
                        className="react-icons"
                        color="#ffffff"
                        height="20"
                      />
                      <p>{each.employmentType}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
    //console.log(cardDetails)
  }

  renderLoadingView = () => (
    <div className="jobs-section-background">
      <Header />
      <div className="job-card-failure-view">
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-section-background">
      <Header />
      <div className="job-card-failure-view">
        <div>
          <img
            height="250px"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button
            type="button"
            className="job-card-failure-view-button"
            onClick={this.getCardDetails}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobCardDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobCardDetails
