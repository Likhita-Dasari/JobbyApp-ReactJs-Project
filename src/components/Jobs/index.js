import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import Profile from '../Profile'

import Checkbox from '../Checkbox'

import Radiobox from '../Radiobox'

import JobCard from '../JobCard'

import './index.css'
//Jobs section
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    checkboxList: {
      INTERNSHIP: false,
      FREELANCE: false,
      PARTTIME: false,
      FULLTIME: false,
    },
    salaryRange: '',
    searchValue: '',
    companyList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCompanysList()
  }

  getCompanysList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchValue, salaryRange, checkboxList} = this.state
    const jobType = Object.keys(checkboxList)
      .filter(key => checkboxList[key] === true)
      .join(',')
    //console.log(jobType)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${salaryRange}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const fetchedJobsData = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState(prevstate => ({
        companyList: [...fetchedJobsData],
        apiStatus: apiStatusConstants.success,
      }))
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateCheckboxList = (name, ischecked) => {
    this.setState(
      prevstate => ({
        checkboxList: {...prevstate.checkboxList, [name]: ischecked},
        apiStatus: apiStatusConstants.inProgress,
      }),
      this.getCompanysList,
    )
  }

  updateSalaryRange = value => {
    this.setState(
      prevstate => ({
        salaryRange: value,
        apiStatus: apiStatusConstants.inProgress,
      }),
      this.getCompanysList,
    )
  }

  onChangeSearchInput = e => {
    this.setState(prevstate => ({
      searchValue: e.target.value,
    }))
  }

  onClickSearch = () => {
    this.setState(
      {apiStatus: apiStatusConstants.inProgress},
      this.getCompanysList,
    )
  }

  renderJobsLoadingView = () => (
    <div className="job-card-failure-view">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobsFailureView = () => (
    <div className="job-card-failure-view">
      <img
        height="250px"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <div>
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="job-card-failure-view-button"
          onClick={this.getCompanysList}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobCard = () => {
    const {companyList} = this.state
    return (
      <>
        {companyList.length === 0 ? (
          <div className="job-not-found-container">
            <img
              className="no-jobs-image"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <div color="#ffffff">
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </div>
          </div>
        ) : (
          <ul>
            {companyList.map(each => (
              <JobCard key={each.id} jobDetails={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const {checkboxList, apiStatus, salaryRange, searchValue} = this.state
    //console.log(salaryRange)

    return (
      <div className="jobs-section-background">
        <Header />
        <div className="jobs-section-container">
          <div className="jobs-profile-content">
            <Profile />
            <hr className="horizontal-line" />
            <p>Type of Employment</p>
            <ul>
              {employmentTypesList.map(each => (
                <Checkbox
                  key={each.label}
                  jobType={each}
                  checkValue={checkboxList[each.employmentTypeId]}
                  updateCheckboxList={this.updateCheckboxList}
                />
              ))}
            </ul>
            <hr className="horizontal-line" />
            <p>Salary Range</p>
            <ul>
              {salaryRangesList.map(each => (
                <Radiobox
                  key={each.label}
                  salaryDetails={each}
                  ischecked={salaryRange === each.salaryRangeId}
                  updateSalaryRange={this.updateSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="search-input-container">
              <input
                className="search-input"
                type="search"
                value={searchValue}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
              />
              <button
                type="button"
                className="search-input-button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {(() => {
              switch (apiStatus) {
                case apiStatusConstants.success:
                  return this.renderJobCard()
                case apiStatusConstants.inProgress:
                  return this.renderJobsLoadingView()
                case apiStatusConstants.failure:
                  return this.renderJobsFailureView()
                default:
                  return null
              }
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
