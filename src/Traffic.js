function Traffic({unitName, exDivName, inoutName, trafficAmout, sumTm}) {

    return (
        <div>
            <div>
                <h2>{unitName}</h2>
                <h3>{exDivName} - {inoutName}</h3>
                <p>{trafficAmout} - {sumTm}</p>
            </div>
        </div>
    )
}
export default Traffic;