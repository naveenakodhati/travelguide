import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './App.css'

// Replace your code here
class App extends Component {
  state = {travelData: [], isLoading: true}

  componentDidMount() {
    this.travelData()
  }

  travelData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updateData = data.packages.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      imageUrl: eachData.image_url,
      description: eachData.description,
    }))
    this.setState({travelData: updateData, isLoading: false})
  }

  render() {
    const {travelData, isLoading} = this.state

    return isLoading ? (
      <div testid="loader" className="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    ) : (
      <div className="main-container">
        <h1 className="heading">Travel Guide</h1>
        <ul className="ul-container">
          {travelData.map(eachItem => (
            <li className="li-element" key={eachItem.id}>
              <img
                className="image"
                src={eachItem.imageUrl}
                alt={eachItem.name}
              />
              <div className="title-container">
                <h1 className="li-title-1">{eachItem.name}</h1>
                <p className="li-title-2">{eachItem.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
