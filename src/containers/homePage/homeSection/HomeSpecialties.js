import React from "react";
import { connect } from "react-redux";
import "./HomeSpecialties.scss"
import Slider from "react-slick";
class HomeSpecialties extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div className="section-containner specialty-containner">
                <div className="section-content specialty-content">
                    <div className="section-header">
                        <span className="section-header-title">Chuyên Khoa Phổ biến</span>
                        <button className="section-header-btn"> Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image specialty-image"></div>
                                <span className="section-item-title">Khoa xương khớp</span>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSpecialties)
