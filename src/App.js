import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Foodinfo from './Foodinfo';
import axios from 'axios';
import Button from './Button'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
      numOfRows: 5,
      pageNo: 1,
      pageSize: null,
    }
  }

  getFoodInfo() {
    const API_KEY = process.env.REACT_APP_API_KEY
    const BASE_URL = `http://data.ex.co.kr/openapi/restinfo/restBestfoodList?key=${API_KEY}&type=json&numOfRows=${this.state.numOfRows}&pageNo=${this.state.pageNo}`
    axios(BASE_URL)
      .then( (res) => {
    const data = res.data.list
    const pageSize = res.data.pageSize
    this.setState({loading: false, data, pageSize})
    })
  }

  nextPage = () => {
    const nextPage = this.state.pageNo + 1
    this.setState({ pageNo: nextPage <= this.state.pageSize ? nextPage : this.state.pageNo }, () => {
      this.getFoodInfo()
    })
  }

  prevPage = () => {
    const prevPage = this.state.pageNo - 1
    this.setState({ pageNo: (prevPage > 0) ? prevPage : this.state.pageNo }, () => {
      this.getFoodInfo()
    })
  }

  changeRows = () => {
    this.setState({ numOfRows: (this.state.numOfRows) == 10 ? this.state.numOfRows = 5 : this.state.numOfRows = 10 })
    this.getFoodInfo()
  }


  componentDidMount() {
    this.getFoodInfo()
  }


  render() {
    const { loading, data, pageNo, pageSize } = this.state
    const { nextPage, prevPage, changeRows } = this

    if(loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div>
        {data.map((d, index) => {
          return (
            <div>
            <Foodinfo
            key={index}
            routeNm={d.routeNm}
            stdRestNm={d.stdRestNm}
            foodNm={d.foodNm}
            foodCost={d.foodCost}
            etc={d.etc}
            foodMaterial={d.foodMaterial}
            ></Foodinfo>
            </div>
          )
        })}
        <Button handleClick={prevPage}>이전 페이지</Button>
            {pageNo}/{pageSize}
            <Button handleClick={nextPage}>다음 페이지</Button>
            <Button handleClick={changeRows}>{this.state.numOfRows == 10 ? 5 : 10}개씩 보기</Button>
      </div>
      )
    }
  }


}
export default App;
