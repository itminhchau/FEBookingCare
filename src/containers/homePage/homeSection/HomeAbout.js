import React from "react";
import { connect } from "react-redux";
import "./HomeAbout.scss"
class HomeAbout extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {

        return (
            <div className="section-containner home-about-containner">
                <div className="section-content home-about-content">
                    <div className="section-header">
                        <span className="section-header-title">Truyền Thông Nói Về BookingCare</span>
                    </div>
                    <div className="section-body home-about-body">
                        <div className="about-video">
                            <iframe width="100%" height="360px" src="https://www.youtube.com/embed/OASGscJQXp0" title="BookingCare: Hệ thống đặt khám trực tuyến" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                        </div>
                        <span className="about-title">Bệnh viện hay nhà thương là một tổ chức chăm sóc sức khỏe cung cấp điều trị bệnh nhân với các nhân viên y tế và điều dưỡng chuyên ngành và thiết bị y tế. </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeAbout)
