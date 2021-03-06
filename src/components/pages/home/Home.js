import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import playbutton from "../SvgIcons/playbutton.svg";
import calculatorIcon from "../SvgIcons/calculator.svg";
import HomeData from "./HomeData.js";
import { useNavigate } from "react-router-dom";

import { Carousel } from "antd";
import {
  HomeDataPolicy,
  whyEbeemaData,
  howWorkData,
  testimonialData,
} from "./HomeData.js";
import { Modal, Select } from "antd";
import { fetchAllCategory } from "../redux/calculator/categoryAction";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [youtubeVisible, setYoutubeVisible] = useState(false);
  const [slideNO, setSlideNo] = useState(3);
  const navigate = useNavigate();

  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const [dataProducts, setdataProducts] = useState([]);
  const products = useSelector((state) => state.allProducts.products);
  const { Option } = Select;

  useEffect(() => {
    if (products?.data) {
      setdataProducts(products?.data?.catagories);
      // console.log("products", products);
    }
  }, [products]);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);

  const handleChangeCategory = (value, index) => {
    setInfo(value);
  };

  // console.log("slideNO", slideNO);
  const showYoutubeModal = () => {
    setYoutubeVisible(true);
  };

  const handleYoutubeCancel = () => {
    setYoutubeVisible(false);
  };

  useEffect(() => {
    if (window.innerWidth < 800) {
      setSlideNo(1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 800) {
        console.log("event fired");
        setSlideNo(1);
      } else {
        setSlideNo(3);
      }
    });
  });

  const gotoNextPage = () => {
    navigate("/calculator", {
      state: { info },
    });
  };

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const items = [
    {
      title: "Term Life Plans",
      image: (
        <img
          className=""
          src="./image/homeImages/termlife-home-banner.png"
          alt="term life plan image"
        />
      ),
      desc: "Protect your family even when you aren't around",
    },
    {
      title: "Child Plans",
      image: (
        <img
          className=""
          src="./image/homeImages/child-home-banner.png"
          alt="childplan Image"
        />
      ),
      desc: "Give wings to your child's future",
    },
  ];

  return (
    <>
      <section className="banner-section">
        <div className="home-container">
          <div className="banner-wrapper">
            <div className="left-banner-wrapper">
              <div className="left-banner-text">
                <h1>
                  Compare the <b>Best Insurance Policies</b> for you and your
                  family.
                </h1>
                <div className="video-block">
                  <div className="video-wrapper">
                    <div className="video-play-button" id="stepTwo">
                      <a href="#" className="oveflowHidden">
                        <img
                          onClick={showYoutubeModal}
                          src={playbutton}
                          alt="tutorial playbutton"
                        />
                      </a>
                    </div>
                    <Modal
                      className="youtube-modal"
                      visible={youtubeVisible}
                      style={{ top: "25%" }}
                      footer={null}
                      maskClosable={true}
                      onCancel={handleYoutubeCancel}
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://youtube.com/embed/foFSEi24BpI"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        title="video"
                      />
                    </Modal>
                    <div className="video-text">
                      <h5>Watch tutorials</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="select-insurance-type">
                <form
                  className="insurance-product-compare"
                  method="get"
                  action="#"
                >
                  <div>
                    <Select
                      // size="large"
                      className="home-dropdown-category"
                      placeholder="Select Category"
                      onChange={(value, index) => {
                        handleChangeCategory(value, index);
                      }}
                    >
                      {dataProducts?.map((data, index) => (
                        <Option key={index} value={data.category_code}>
                          {data.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <a onClick={gotoNextPage} className="insurance-type-submit">
                    <p> Compare</p>
                    <img src={calculatorIcon} alt="compare calculator" />
                  </a>
                </form>
              </div>
            </div>
            <div className="right-banner-wrapper">
              <Carousel dotPosition="right" autoplay className="home-carousel">
                {items.map((data) => {
                  return (
                    <div className="home-banner-wrapper">
                      <div className="banner-title">
                        {data.title}
                        <p className="banner-desc">{data.desc}</p>
                      </div>
                      <div className="banner-image">{data.image}</div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="banner-insurance-product-wrapper1">
            <div className="insurance-product-wrapper">
              <div className="list-of-insurance-policy">
                {HomeData.map((plan) => {
                  return (
                    <div className="plan-container">
                      <div className="plan-img">{plan.image}</div>
                      <div className="plan-desc">
                        <p>
                          <b>{plan.title}</b>
                          <p>{plan.desc}</p>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="banner-insurance-product-wrapper2">
            <div className="insurance-product-wrapper2">
              <div className="list-of-insurance-policy">
                {HomeDataPolicy.map((policy) => {
                  return (
                    <div className="plan-container">
                      <div className="plan-img">{policy.image}</div>
                      <div className="plan-desc">
                        <p>
                          <b>{policy.title}</b>
                          <p>{policy.desc}</p>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="corporate-plan-section">
        <div className="corporate-plan-content">
          <h1>Corporate plan</h1>
          <p>if you want to know more about plans for your employees.</p>
          <div class="get-assistance">
            <button type="button" className="corporate-plan">
              Get assistance
            </button>
          </div>
        </div>
      </section>
      <section className="why-different">
        <div className="why-diff-title">
          <h1> Why eBeema?</h1>
        </div>
        <div className="why-diff-description">
          <div className="why-diff-left">
            <div className="diff-top">
              <h2>
                Why are we different
                <a href="#">
                  <img
                    className="arrow-img"
                    src="https://ebeema.com/frontend/img/different-arrow.png"
                    alt="arrow"
                  />
                </a>
              </h2>
            </div>

            <p>
              Leveraging cutting edge technology and data driven software, we
              combine the latest with our old fashioned values of customer
              service at the highest level to provide you with an unparalleled
              experience and service.We do everything to make insurance
              accessible and simple.
            </p>
          </div>
          <div className="why-diff-right">
            {whyEbeemaData.map((why) => {
              return (
                <div className="why-diff-right-each">
                  <a className="why-diff-right-img">{why.image}</a>
                  <h1>{why.title}</h1>
                  <p>{why.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="how-it-works">
        <div className="container-fluid">
          <div className="how-work-title">
            <h2>How eBeema works</h2>
          </div>
          <div className="working-bar">
            {howWorkData.map((work) => {
              return (
                <div className="working-bar-text">
                  {work.image}
                  <p className="how-first-prag">{work.title}</p>
                  <p>{work.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="compare-now">
        <div className="compare-color">
          <div className="compare-left-img">
            <img
              src="https://ebeema.com/uploads/compare.png"
              alt="compare insurance"
            />
          </div>
          <div className="compare-right">
            <h3>You???ve made it here!</h3>
            <p>
              We try to make your life as easy as cheese. Compare insurance to
              see which plan fits your needs.
            </p>
            <Link to="/calculator" className="fa fa-calculator compare-btn">
              Compare Now
            </Link>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </section>
      <section className="testimonials-section">
        <div className="training-title">
          <h1>What our customers say</h1>
        </div>

        <div className="carousel">
          <Carousel
            slidesToShow={slideNO}
            dots="false"
            // centerMode={true}
            // swipeToSlide={true}
            // focusOnSelect={true}
            autoplay
          >
            {testimonialData.map((data, index) => {
              return (
                <div className="testimonial-cards1">
                  <div className="testimoial-img">
                    <img
                      className="pageImage"
                      src="./image/pageImages/default-testimonial.png"
                      height="50%"
                      width="50%"
                    />
                  </div>
                  <div className="testimonial-desc">
                    <p>{data.desc}</p>
                  </div>
                  <div className="testimonial-rating">{data.rating}</div>
                  <p className="testimonial-name">{data.name}</p>
                  <span className="testimonial-type">{data.type}</span>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>
      <section className="contsiner-associations">our associations</section>
    </>
  );
}
export default Home;
