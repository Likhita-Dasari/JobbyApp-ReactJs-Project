import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {profileDetails: '', isLoading: true, failure: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {profile_details} = data
      const {name, profile_image_url, short_bio} = profile_details
      const profileData = {
        name,
        imageUrl: profile_image_url,
        bio: short_bio,
      }
      //console.log(data)
      //console.log(profileData)
      this.setState({
        profileDetails: {...profileData},
        isLoading: false,
        failure: false,
      })
    }
    if (response.status === 401) {
      this.setState({failure: true, isLoading: false})
    }
  }
  render() {
    const {profileDetails, isLoading, failure} = this.state
    return (
      <>
        {isLoading && !failure ? (
          <div className='loading'>
            <div className='loader-container' data-testid='loader'>
              <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
            </div>
          </div>
        ) : failure ? (
          <div className='loading'>
            <button
              type='button'
              className='job-card-failure-view-button'
              onClick={this.getProfileDetails}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className='profile-background'>
            <img
              className='profile-image'
              src={profileDetails.imageUrl}
              alt='profile'
            />
            <h1 className='profile-name'>{profileDetails.name}</h1>
            <p>{profileDetails.bio}</p>
          </div>
        )}
        {''}
      </>
    )
  }
}

export default Profile
