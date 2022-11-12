import React from "react";
import { connect } from "react-redux";
import HomeHeader from "./homeHeader/HomeHeader";
import HomeBanner from "./homeBanner/HomeBanner";
import HomeSpecialties from "./homeSection/HomeSpecialties";
import HomeMedicalFacility from "./homeSection/HomeMedicalFacility";
import HomeFeaturedDoctor from "./homeSection/HomeFeaturedDoctor";
import HomeHandBook from "./homeSection/HomeHandBook";
import HomeAbout from "./homeSection/HomeAbout";
import HomeFooter from "./homeFooter/HomeFooter";
import './HomePage.scss'
class HomePage extends React.Component {

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        return (
            <>
                <HomeHeader />
                <HomeBanner />
                <HomeSpecialties
                    settings={settings}
                />
                <HomeMedicalFacility
                    settings={settings}
                />
                <HomeFeaturedDoctor
                    settings={settings}
                />
                <HomeHandBook
                />
                <HomeAbout
                />
                <HomeFooter
                />
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)