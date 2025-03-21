import Header from '../Header'

import './index.css'

import {Link} from 'react-router-dom'
//Home Section
const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div>
          <h1>
            Find The Job That <br /> Fits Your Life{' '}
          </h1>
          <p>
            Millions of people are searching for jobs,salary <br />
            information, company reviews. Find the job that fits your <br />
            ablities and potential.
          </p>
          <Link to="/jobs">
            <button className="home-find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
