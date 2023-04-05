import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    last7DaysVaccinationList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedSevenDaysVaccinatedData = data.last_7_days_vaccination.map(
        eachItem => ({
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
          vaccineDate: eachItem.vaccine_date,
        }),
      )
      const updatedVaccinationByAge = data.vaccination_by_age.map(eachItem => ({
        count: eachItem.count,
        age: eachItem.age,
      }))

      const updatedVaccinationByGender = data.vaccination_by_gender.map(
        eachItem => ({
          count: eachItem.count,
          gender: eachItem.gender,
        }),
      )
      this.setState({
        last7DaysVaccinationList: updatedSevenDaysVaccinatedData,
        vaccinationByAgeList: updatedVaccinationByAge,
        vaccinationByGenderList: updatedVaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationDetails = () => {
    const {
      last7DaysVaccinationList,
      vaccinationByGenderList,
      vaccinationByAgeList,
    } = this.state

    return (
      <div>
        <VaccinationCoverage
          last7DaysVaccinationList={last7DaysVaccinationList}
        />
        <VaccinationByGender
          vaccinationByGenderList={vaccinationByGenderList}
        />
        <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinDashboard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="website-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="cowin-heading">Co-WIN</p>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {this.renderCowinDashboard()}
      </div>
    )
  }
}

export default CowinDashboard
