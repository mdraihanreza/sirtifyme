import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import othersService from '../services/others.service';
import parse from 'html-react-parser';


function PrivacyPolicy() {
    const [Content, setContent] = useState("");
    const Privacy = async () => {
        var responce = await othersService.privacy();
        console.log(responce.data)

        if (responce.data.success) {
            setContent(responce.data.data.content);
        }
    }
    console.log(Content,'content')
   
      useEffect(() => {
        Privacy();
    
    }, [])
    return (
        <>
            {/* =================== status-publish ================================ */}
            <section className="privacy-sec">
                <Container>
                    <Row>
                        <Col lg={12}>
                        <div className='inner_content'>
                            
                            {parse(Content)}
                            </div>
                           
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default PrivacyPolicy