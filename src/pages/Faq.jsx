import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import faqbanner from '../assets/images/faq-banner.jpg';


function Faq() {
    const [Faqdata, setFaqdata] = useState([]);
    var getFaq = async () => {

        var response = await UserService.getFaq()
        console.log("faqdata ", response.data.data)

        if (response.data.success) {
            setFaqdata(response.data.data)
            console.log(response.data, 'responsedata')

        }
    }


    useEffect(() => {
        getFaq();

    }, []);

    return (
        <>


            {/* =================== Inner banner start ================================ */}
            <section className="inner-page" style={{ backgroundImage: `url(${faqbanner})` }}>
                <div className="container">
                    <div className="inner-content">
                        <h1>FAQ</h1>
                      
                    </div>
                </div>
            </section>
            {/* ===== Inner banner end ====== */}
            {/* ===== Contact section start ====== */}
            <section className="faq">
                <div className="container">
                    <div className="faq-inner">
                        <h2 className="text-center">Frequently Asked Questions</h2>
                        <div className="accordion" id="myAccordion">
                            {Faqdata.map((item, index) => {
                                return (<>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                type="button"
                                                className="accordion-button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapseOne${index}`}
                                            >
                                               {item.question}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapseOne${index}`}
                                            className="accordion-collapse collapse "
                                            data-bs-parent="#myAccordion"
                                        >
                                            <div className="card-body">
                                                <p>
                                                {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            })}
                            {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
            >
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#myAccordion"
          >
            <div className="card-body">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod. Tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
            >
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
              Nonumy Eirmod?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#myAccordion"
          >
            <div className="card-body">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod. Tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
            >
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#myAccordion"
          >
            <div className="card-body">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod. Tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
            >
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
              Nonumy Eirmod?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#myAccordion"
          >
            <div className="card-body">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod. Tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              type="button"
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
            >
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr?
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#myAccordion"
          >
            <div className="card-body">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod. Tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Contact section end ====== */}
        </>
    )
}

export default Faq