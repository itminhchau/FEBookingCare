import React from "react";
import { connect } from "react-redux";

import './HomeFooter.scss'
class HomeFooter extends React.Component {

    render() {

        return (
            <div className="footer-container">
                <div className="footer-content">
                    <span>	&copy; Copy right 2022, you can visit my channel here <a href="#" >&rarr; Click me &larr;</a></span>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)