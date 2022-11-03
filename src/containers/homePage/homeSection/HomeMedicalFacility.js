import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import './HomeMedicalFacility.scss'
class HomeMedicalFacility extends React.Component {

    render() {

        return (
            <div className="section-containner mediacalFacilility-containner">
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-header-title">Cơ Sở Y Tế Nổi Bật</span>
                        <button className="section-header-btn"> Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image mediacalFacilility-image"></div>
                                <span className="section-item-title">Bệnh viện chợ rẫy</span>
                            </div>
                        </Slider>
                    </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(HomeMedicalFacility)