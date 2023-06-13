import React from "react";
import { connect } from "react-redux";
import "./HomeHandBook.scss"
import Slider from "react-slick";
class HomeHandBook extends React.Component {
    render() {

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        return (
            <div className="section-containner handBook-containner">
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-header-title">Cẩm Nang</span>
                        <button className="section-header-btn"> Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title ">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp Khoa xương khớp Khoa xương khớp Khoa xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="section-item-image handBook-image"></div>
                                <span className="section-item-title handBook-title">Khoa xương khớp</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHandBook)
