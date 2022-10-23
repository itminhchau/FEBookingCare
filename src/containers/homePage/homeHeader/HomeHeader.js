import React from "react";
import { connect } from "react-redux";

class HomeHeader extends React.Component {

    render() {
        return (
            <div><h1> my header </h1></div>
        )
    }
}

const mapStateToProps = () => {
    return {

    }
}
const mapDispatchToProps = () => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)