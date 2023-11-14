import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import othersService from '../services/others.service';
import parse from 'html-react-parser';


function TermsCondition() {
    // const [Content, setContent] = useState("");
    // const Terms = async () => {
    //     var responce = await othersService.terms();
    //     console.log(responce.data)

    //     if (responce.data.success) {
    //         setContent(responce.data.data.content);
    //     }
    // }
    // console.log(Content,'content')
   
    //   useEffect(() => {
    //     Terms();
    
    // }, [])
    return (
        <>
            {/* =================== status-publish ================================ */}
            <section className="privacy-sec">
                <Container>
                    <Row>
                        <Col lg={12}>
                        <div className='inner_content'>
                            
                        Terms and Conditions

1. Acceptance of Terms

By accessing or using this website (the "Site"), you agree to comply with and be bound by these terms and conditions (the "Terms"). If you do not agree to these Terms, please refrain from using the Site.

2. Use of the Site

You may use the Site for personal and non-commercial purposes only. You must not use the Site for any unlawful or prohibited purpose.

3. Intellectual Property

All content on this Site, including text, images, logos, and trademarks, is the property of [Your Company Name] or its licensors and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from this Site without our prior written consent.

4. Privacy Policy

Your use of this Site is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.

5. Links to Third-Party Websites

This Site may contain links to third-party websites for your convenience. We do not endorse or control these websites and are not responsible for their content or practices. Your use of third-party websites is at your own risk.

6. Disclaimer of Warranties

This Site is provided "as is" and "as available" without any warranties, express or implied. We do not warrant that the Site will be error-free or uninterrupted or that the information provided is accurate, complete, or reliable.

7. Limitation of Liability

In no event shall [Your Company Name] be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site.

8. Changes to Terms

We reserve the right to modify these Terms at any time without notice. Your continued use of the Site after such modifications will constitute your acceptance of the revised Terms.

9. Governing Law

These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from or relating to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].

10. Contact Us

If you have any questions or concerns about these Terms, please contact us at [Your Contact Information].
                            </div>
                           
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default TermsCondition