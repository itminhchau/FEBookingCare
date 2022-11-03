import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import './HomeFeaturedDoctor.scss'
class HomeFeaturedDoctor extends React.Component {

    render() {

        return (
            <div className="section-containner featuredDoctor-containner">
                <div className="section-content">
                    <div className="section-header">
                        <span className="section-header-title">Bác Sĩ Nổi Bật Tuần Qua</span>
                        <button className="section-header-btn"> Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title text-center">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
                            </div>
                            <div className="section-item">
                                <div className="outer-image">
                                    <div className="section-item-image featuredDoctor-image"></div>
                                </div>
                                <div className="outer-title">
                                    <span className="section-item-name">Nguyễn Văn A</span>
                                    <span className="section-item-position">Giáo sư tiến sĩ</span>
                                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeFeaturedDoctor)