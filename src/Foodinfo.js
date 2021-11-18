function Foodinfo({...rest}) {

    const {routeNm, stdRestNm, foodNm, foodCost, etc, foodMaterial} = rest

    return (
        <div>
            <h3>{routeNm} - {stdRestNm}</h3>
            <h5>{foodNm} &nbsp;&nbsp;({foodCost}원)</h5>
            <p>{etc}</p>
            <p>원재료명: {foodMaterial}</p>
        </div>
    )
}

export default Foodinfo;