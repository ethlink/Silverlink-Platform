import React from 'react';
import { Modal, Button, Icon } from 'antd';

const Terms = props => (
  <Modal
    title="Terms of Service"
    width={720}
    footer={[
      <Button key="submit" type="primary" onClick={props.handleOk}>
        Agree to Terms of Service<Icon type="check" />
      </Button>,
    ]}
    visible={props.visible}
  >
    <h2>Welcome to the Silver Link platform</h2>
    <h3>Please take notice of the following:</h3>

    <p>Transactions in virtual currency may be irreversible, and, accordingly, losses due to fraudulent or accidental transactions may not be recoverable, it is your sole responsibility to keep your wallet/address and/or private keys entered into Silver Link Platform safe, Silver Link Platform It’s not a Bank and once the Tokens are minted and we do not have any control over them.</p>

    <p>Please always check you are using <a href="https://silverlink.io">https://silverlink.io URL</a>, there may be several phishing attempts with one or more websites impersonating us.</p>

    <p>Virtual currencies & blockchain assets are not legal tender and they aren’t backed by the government. We will be following the laws of Mexico and the relevant legislations. There will be user identity verification to comply with Know Your Customer & Anti Money Laundering requirements. Limits on our service may be changed in the future. Changes may happen in legislation, virtual currency markets or protocols which may adversely affect the use, transfer, exchange and value of virtual currencies and blockchain assets.</p>

    <h3>Terms of Service</h3>

    <p>This web page represents a legal document that serves as our Terms of Service and it governs the legal terms of our website, http://silverlink.io, sub-domains, and any associated web-based and mobile applications (collectively, &quot;Website&quot;), as owned and operated by Silver Link.</p>

    <p>Capitalized terms, unless otherwise defined, have the meaning specified within the Definitions section below. This Terms of Service, along with our Privacy Policy, any mobile license agreement, and other posted guidelines within our Website, collectively &quot;Legal Terms&quot;, constitute the entire and only agreement between you and Silver Link, and supersede all other agreements, representations, warranties and understandings with respect to our Website and the subject matter contained herein. We may amend our Legal Terms at any time without specific notice to you. The latest copies of our Legal Terms will be posted on our Website, and you should review all Legal Terms prior to using our Website. After any revisions to our Legal Terms are posted, you agree to be bound to any such changes to them. Therefore, it is important for you to periodically review our Legal Terms to make sure you still agree to them.</p>

    <p>By accessing this website, you are agreeing to be bound by these Website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this Website are protected by applicable copyright and trademark law.</p>

    <p>The last update to our Terms of Service was posted on March 21, 2018.</p>

    <h3>Definitions</h3>

    <p>The terms &quot;us&quot; or &quot;we&quot; or &quot;our&quot; refers to Silver Link, the owner of the Website.</p>
    <p>A &quot;Visitor&quot; is someone who merely browses our Website, but has not registered as Member.</p>
    <p>A &quot;Member&quot; is an individual that has registered with us to use our Service.</p>
    <p>Our &quot;Service&quot; represents the collective functionality and features as offered through our Website to our Members.</p>
    <p>A &quot;User&quot; is a collective identifier that refers to either a Visitor or a Member.</p>
    <p>All text, information, graphics, audio, video, and data offered through our Website are collectively known as our &quot;Content&quot;.</p>

    <h3>General Conditions</h3>

    <p>1.1 Terms. You will adhere to all Silver Link rules and regulations including the Policies and risks defined inside this agreement.</p>

    <p>1.2 Support to You. We will provide web-based support only, including email, web forums, and knowledge base support. We will not provide telephone or live support. Our support email is support@linksilver.io</p>

    <h3>Security</h3>

    <p>2.1 Your Security. You will implement reasonable and appropriate measures designed to secure access to (i) any device associated with the email address associated with your account, (ii) private keys required to access any relevant Bitcoin address or LNKS, and (iii) your passphrase, password and any other login or identifying credentials. In the event that you are no longer in possession of any device associated with your account or are not able to provide your login or identifying credentials, we may, in our sole discretion, and only if we are able, grant access to your account to any party providing additional credentials to us. We explicitly reserve the right to determine the additional credentials required, which may include, without limitation, a sworn, notarized statement of identity.</p>

    <p>2.2 Your Information. We may use aggregate statistical information about your activity, including without limitation your activity on the Silver Link Site and logins to various websites, for marketing or any other purpose in our sole discretion. However, we will not release your personally-identifying information to any third party without your consent, except as set forth herein.</p>

    <h3>Your Responsibilities.</h3>

    <p>3.1 Pishing. You will be responsible for always checking that you are entering https://silverlink.io and not any other website, we’ll cannot refund any loss incurred on this.</p>

    <p>3.2 Security and Backup. You are responsible for properly configuring any software in connection with your access to or use of Silver Link Platform. Silver Link log-in credentials are for your internal use only and you may not sell, transfer or sublicense them to any other entity or person, except that you may disclose your credentials to your agents and subcontractors or employees performing work on your behalf.</p>

    <p>3.3 End User Violations. You will be deemed to have taken any action that you permit, assist or facilitate any person or entity to take related to this Agreement. You are responsible for End Users’ donation and use of LNK. You will ensure that all End Users comply with your obligations under this Agreement and that the terms of your agreement with each End User are consistent with this Agreement.</p>

    <h3>Risk disclosure</h3>

    <p>4.1 Risks: you understand that Silver Link, blockchain technology, Ethereum platform, LNK and decentralized hosting platforms are new and untested technologies that can be outside of Silver Link control and adverse changes in market forces or technology, broadly construed, will excuse Ethereum Link performance under this agreement. In particular, and in addition to the terms of this document, you assume all risk of loss resulting from, concerning or associated with other risks explained here.</p>

    <p>4.2 LNKS is not an investment. There is no guarantee – indeed there is no reason to believe – that the LNKS you purchased will increase in value. It may – and probably will at some point – decrease in value. </p>

    <p>4.3 Risks Associated with the protocol, LNK and the Ethereum Link network are based upon the Ethereum protocol. As such, any malfunction, unintended function or unexpected functioning of the Ethereum protocol may cause the Ethereum Link network or LNK to malfunction or function in an unexpected or unintended manner. LNK, the native unit of account of the Ethereum Link Network may itself lose value in ways similar to Bitcoin, and also other ways. </p>

    <p>4.4 Risks Associated with User Credentials. Any third party that gains access to the Donator login credentials or private keys may be able to dispose of the User LNKS. To minimize this risk, the Donator should guard against unauthorized access to their electronic devices.</p>

    <p>4.5 Risk of Unfavorable Regulatory Action in One or More Jurisdictions. Blockchain technologies have been the subject of scrutiny by various regulatory bodies around the world. The functioning of the Silver Link network and LNKS could be impacted by one or more regulatory inquiries or actions, including but not limited to restrictions on the use or possession of digital currencies and tokens like LNKS, which could impede or limit the development of the Silver Link network.</p>

    <p>4.6 Risk of Theft and Hacking. Hackers or other groups or organizations may attempt to interfere with the Silver Link network or the availability of LNKS in any number of ways, including without limitation denial of service attacks, Sybil attacks, spoofing, smurfing, malware attacks, or consensus-based attacks.</p>

    <h3>Use License</h3>

    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Silver Link’s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

    <ul>
      <li>Modify or copy the materials;</li>
      <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
      <li>Attempt to decompile or reverse engineer any software contained on Silver Link’s website;</li>
      <li>Remove any copyright or other proprietary notations from the materials; or</li>
      <li>Transfer the materials to another person or “mirror” the materials on any other server.</li>
      <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Silver Link at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
    </ul>

    <h3>Restricted Uses</h3>

    <p>Listing of offered products on the Website could be used only for lawful purposes by Users of the Website. You could not frame or utilize framing techniques to enclose any hallmark, logo, copyrighted image, or most proprietary details (consisting of images, text, page layout, or type) of Silver Link without express composed consent. You might not use any meta tags or any various other &quot;unseen text&quot; utilizing Silver Link's name or trademarks without the express written consent of Silver Link. You agree not to offer or modify any content found on the Website consisting of, however not limited to, names of Users and Content, or to recreate, display, openly perform, distribute, or otherwise make use of the Material, in any way for any public function, in connection with services or products that are not those of Silver Link, in other way that is likely to trigger confusion among consumers, that disparages or challenges Silver Link or its licensors, that dilutes the strength of Silver Link's or its licensor's residential property, or that otherwise infringes Silver Link's or its licensor's copyright rights. You also agree to abstain from abusing any of the material that appears on the Site. The use of the Material on any other website or in a networked computer system environment for any purpose is prohibited. Any code that Silver Link develops to generate or show any Material of the pages making up the Website is likewise secured by Silver Link's copyright, and you may not copy or adjust such code.</p>

    <p>Silver Link has no duty to keep track of any products published, transferred, or connected to or with the Site. If you think that something on the Website breaches these Terms please contact our marked representative as set forth below.
  If alerted by a User of any products which allegedly do not conform to these Terms, Silver Link could in its single discernment explore the allegation and figure out whether to take other actions or ask for the removal or get rid of the Content. Silver Link has no liability or duty to Individuals for efficiency or nonperformance of such activities.
    </p>

    <h3>Electronic Communication</h3>

    <p>You are connecting with us electronically when you go to the Website or send out emails to us. You consent to get interactions from us online. We will connect with you by email or by uploading notifications on the Site.</p>

    <h3>Your Account</h3>

    <p>If you utilize the Website, you are accountable for maintaining the confidentiality of your account and password and you accept responsibility for all activities that happen under your account and password. You also accept not to reveal any personally identifiable information, consisting of, however not limited to, first and last names, credentials, or various other details of a personal nature (&quot;Personal Data&quot;) from the Site. Your disclosure of any Personal Data on the website might result in the immediate termination of your account. Silver Link additionally reserves the right to refuse service, terminate accounts, and remove or edit Content at its sole discernment.
  Silver Link does not guarantee the truthfulness, precision, or dependability of Content on the site, consisting of Personal Data. Each Individual is accountable for upgrading and changing any pertinent account info when essential to preserve the truthfulness, precision, or reliability of the details.
    </p>

    <h3>Reviews, Comments, and Other Material</h3>

    <p>Registered Users of the Website might post evaluations and remarks of a product and services purchased by means of the Website, so long as the Material is not unlawful, profane, threatening, defamatory, an invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties or objectionable and does not include industrial solicitation, mass mailings, or any type of &quot;spam.&quot; You may not use another User's account to impersonate a User or entity, or otherwise deceive as to the origin of the opinions. Silver Link reserves the right (however is not bound) to eliminate or modify such Material, but does not regularly examine posted Material.</p>

    <p>If you post an evaluation or send comments, and unless Silver Link suggests otherwise, you grant Silver Link a nonexclusive, royalty-free, permanent, irrevocable, and completely sub licensable right to utilize, recreate, modify, adjust, release, equate, create derivative works from, distribute, and screen such content throughout the world, in any media. You grant Silver Link and sublicenses the right to utilize your name in connection with such Material, if they choose. You represent and require that You own or otherwise control all the rights to the content that You post; that the content is accurate; that use of the content You supply does not violate this policy and will not trigger injury to anyone or entity; which You will indemnify Silver Link for all claims resulting from Content You supply. Silver Link has the right but not the commitment to edit and keep track of or eliminate any task or Material. Silver Link takes no duty and assumes no liability for any content published by You or any 3rd party.</p>

    <h3>Legal Compliance</h3>

    <p>You agree to comply with all applicable domestic and international laws, statutes, ordinances, and regulations regarding your use of our Website. Silver Link reserves the right to investigate complaints or reported violations of our Legal Terms and to take any action we deem appropriate, including but not limited to canceling your Member account, reporting any suspected unlawful activity to law enforcement officials, regulators, or other third parties and disclosing any information necessary or appropriate to such persons or entities relating to your profile, email addresses, usage history, posted materials, IP addresses and traffic information, as allowed under our Privacy Policy.</p>

    <h3>Intellectual Property</h3>

    <p>Our Website may contain our service marks or trademarks as well as those of our affiliates or other companies, in the form of words, graphics, and logos. Your use of our Website does not constitute any right or license for you to use such service marks/trademarks, without the prior written permission of the corresponding service mark/trademark owner. Our Website is also protected under international copyright laws. The copying, redistribution, use or publication by you of any portion of our Website is strictly prohibited. Your use of our Website does not grant you ownership rights of any kind in our Website.</p>

    <h3>Revisions and Errata</h3>

    <p>The materials appearing on Silver Link’s Website could include technical, typographical, or photographic errors. Silver Link does not warrant that any of the materials on its Website are accurate, complete, or current. Silver Link may make changes to the materials contained on its Website at any time without notice. Silver Link does not, however, make any commitment to update the materials.</p>

    <h3>Disclaimer</h3>

    <p>The materials on Silver Link's Website are provided &quot;as is&quot; Silver Link makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Furthermore, Silver Link does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet Website or otherwise relating to such materials or on any sites linked to this site. The Website serves as a venue for Individuals to purchase distinct service or products. Neither Silver Link nor the Website has control over the quality or fitness for a particular function of a product. Silver Link likewise has no control over the accuracy, reliability, completeness, or timeliness of the User-submitted details and makes no representations or warranties about any info on the Site.</p>

    <p>THE WEBSITE AND ALL DETAILS, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE APPLICATION) AND SERVICES LISTED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THIS WEBSITE ARE PROVIDED BY Silver Link ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, UNLESS OTHERWISE SPECIFIED IN WRITING. Silver Link MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, ABOUT THE OPERATION OF THIS WEBSITE OR THE INFO, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR SERVICES LISTED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THIS SITE, UNLESS OTHERWISE POINTED OUT IN WRITING. YOU EXPRESSLY AGREE THAT YOUR USE OF THIS WEBSITE IS AT YOUR OWN RISK.</p>

    <p>TO THE COMPLETE EXTENT PERMISSIBLE BY APPLICABLE LAW, Silver Link DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND PHYSICAL FITNESS FOR A PARTICULAR PURPOSE. Silver Link DOES NOT WARRANT THAT THIS WEBSITE; DETAILS, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE APPLICATION) OR SERVICES CONSISTED OF ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SITE; ITS SERVERS; OR EMAIL SENT FROM Silver Link ARE WITHOUT VIRUSES OR OTHER HARMFUL ELEMENTS. Silver Link WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE WEBSITE OR FROM ANY DETAILS, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE APPLICATION) OR SERVICES LISTED ON OR OTHERWISE MADE AVAILABLE TO YOU WITH THIS SITE, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE POINTED OUT IN WRITING. UNDER NO SCENARIO SHALL Silver Link'S LIABILITY DEVELOPING FROM OR IN CONNECTION WITH THE WEBSITE OR YOUR USE OF THE WEBSITE, DESPITE THE REASON FOR ACTION (WHETHER IN AGREEMENT, TORT, BREACH OF SERVICE WARRANTY OR OTHERWISE), GO BEYOND $100.</p>

    <h3>Links to Other Websites</h3>

    <p>Our Website may contain links to third party websites. These links are provided solely as a convenience to you. By linking to these websites, we do not create or have an affiliation with, or sponsor such third party websites. The inclusion of links within our Website does not constitute any endorsement, guarantee, warranty, or recommendation of such third party websites. Silver Link has no control over the legal documents and privacy practices of third party websites; as such, you access any such third party websites at your own risk.</p>

    <h3>Site Terms of Service Modifications</h3>

    <p>Silver Link may revise these Terms of Service for its Website at any time without notice. By using this Website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>

    <h3>Governing Law</h3>

    <p>Any claim relating to Silver Link’s Website shall be governed by the laws of Mexico without regard to its conflict of law provisions, and You consent to exclusive jurisdiction and venue in such courts.</p>

    <h3>Indemnity</h3>

    <p>You accept defend, indemnify, and hold safe Silver Link, its affiliates, and their corresponding officers, directors, agents and workers, from and against any claims, actions or demands, including without limitation affordable legal, accounting, and other provider charges, affirming or resulting from (i) any Content of most material You offer to the Site, (ii) Your use of any Content, or (iii) Your breach of the terms of these Terms. Silver Link will provide notice to You promptly of any such claim, match, or case.</p>

    <h3>General Terms</h3>

    <p>Our Legal Terms shall be treated as though it were executed and performed in Mexico and shall be governed by and construed in accordance with the laws of Mexico without regard to conflict of law principles. In addition, you agree to submit to the personal jurisdiction and venue of such courts. Any cause of action by you with respect to our Website, must be instituted within one (1) year after the cause of action arose or be forever waived and barred. Should any part of our Legal Terms be held invalid or unenforceable, that portion shall be construed consistent with applicable law and the remaining portions shall remain in full force and effect. To the extent that any Content in our Website conflicts or is inconsistent with our Legal Terms, our Legal Terms shall take precedence. Our failure to enforce any provision of our Legal Terms shall not be deemed a waiver of such provision nor of the right to enforce such provision. The rights of Silver Link under our Legal Terms shall survive the termination of our Legal Terms.</p>

    <h3>Terms of Use</h3>

    <p>Welcome to the Silver Link (the &quot;Service&quot;). The following Terms of Use apply when you view or use the Service located at: http://silverlink.io. Please review the following terms carefully. By accessing or using the Service, you signify your agreement to these Terms of Use. If you do not agree to these Terms of Use, you may not access or use the Service.</p>

    <h3>PRIVACY POLICY</h3>

    <p>The company respects the privacy of its Service users. Please refer to the Company's Privacy Policy which explains how we collect, use, and disclose information that pertains to your privacy. When you access or use the Service, you signify your agreement to this Privacy Policy.</p>

    <h3>REGISTRATION; RULES FOR USER CONDUCT AND USE OF THE SERVICE</h3>

    <p>You need to be at least 18 years old to register for and use the Service or the respective age applicable in your country.</p>

    <h3>Buying LNKS</h3>

    <ul>
      <li>Once you purchase LNKS your order will be approved or not, if it doesn’t get approved the Ether will be refunded to your address, if it gets approved you will receive silver in the form of LNKS Tokens.</li>
      <li>It is your responsibility to keep your LNKS, LNK or ETH safe, we do not have any control over them and loses cannot be refundable.</li>
      <li>We won’t provide any refund of Tokens or Virtual Currencies once LNKS tokens have been minted and sent to your address.</li>
    </ul>

    <p>If you are a user who signs up for the Service, will create a personalized account to access the Service. You agree to notify us immediately of any unauthorized use of your password and/or account. The Company will not be responsible for any liabilities, losses, or damages arising out of the unauthorized use of your member name, password and/or account.</p>

    <h3>USE RESTRICTIONS.</h3>

    <p>Your permission to use the Site is conditioned upon the following Use Restrictions and Conduct Restrictions: You agree that you will not under any circumstances:</p>

    <ul>
      <li>Use the service for any unlawful purpose or for the promotion of illegal activities;</li>
      <li>Attempt to, or harass, abuse or harm another person or group;</li>
      <li>Use another user's account without permission;</li>
      <li>Provide false or inaccurate information when registering an account;</li>
      <li>Interfere or attempt to interfere with the proper functioning of the Service;</li>
      <li>Make any automated use of the system, or take any action that we deem to impose or to potentially impose an unreasonable or disproportionately large load on our servers or network infrastructure;</li>
      <li>bypass any robot exclusion headers or other measures we take to restrict access to the Service or use any software, technology, or device to scrape, spider, or crawl the Service or harvest or manipulate data; or</li>
      <li>Publish or link to malicious content intended to damage or disrupt another user's browser or computer.</li>
    </ul>

    <h3>CONDUCT RESTRICTIONS.</h3>

    <p>When you create your own personalized account, you may be able to provide (&quot;User Content&quot;). You are solely responsible for the User Content that you post, upload, link to or otherwise make available via the Service. You agree that we are only acting as a passive conduit for your online distribution and publication of your User Content. The Company, however, reserves the right to remove any User Content from the Service at its discretion.
  The following rules pertain to User Content. By transmitting and submitting any User Content while using the Service, you agree as follows:
    </p>

    <ul>
      <li>You are solely responsible for your account and the activity that occurs while signed in to or while using your account;</li>
    </ul>

    <p>You understand and agree that any liability, loss or damage that occurs as a result of the use of any User Content that you make available or access through your use of the Service is solely your responsibility. The Company is not responsible for any public display or misuse of your User Content. The Company does not, and cannot, pre-screen or monitor all User Content. However, at our discretion, we, or the technology we employ, may monitor and/or record your interactions with the Service.</p>

    <h3>ONLINE CONTENT DISCLAIMER</h3>

    <p>Opinions, advice, statements, offers, or other information or content made available through the Service, but not directly by the Company, are those of their respective authors, and should not necessarily be relied upon. Such authors are solely responsible for such content. The Company does not guarantee the accuracy, completeness, or usefulness of any information on the Service and neither does the Company adopt nor endorse, nor is the Company responsible for the accuracy or reliability of any opinion, advice, or statement made by parties other than the Company. The Company takes no responsibility and assumes no liability for any User Content that you or any other user or third party posts or sends over the Service. Under no circumstances will the Company be responsible for any loss or damage resulting from anyone's reliance on information or other content posted on the Service, or transmitted to users.</p>

    <p>Though the Company strives to enforce these Terms of Use, you may be exposed to User Content that is inaccurate or objectionable. The Company reserves the right, but has no obligation, to monitor the materials posted in the public areas of the service or to limit or deny a user's access to the Service or take other appropriate action if a user violates these Terms of Use or engages in any activity that violates the rights of any person or entity or which we deem unlawful, offensive, abusive, harmful or malicious. The Company shall have the right to remove any such material that in its sole opinion violates, or is alleged to violate, the law or this agreement or which might be offensive, or that might violate the rights, harm, or threaten the safety of users or others. Unauthorized use may result in criminal and/or civil prosecution under the law. If you become aware of misuse of our Service, please contact us at http://silverlink.io.</p>

    <h3>LINKS TO OTHER SITES AND/OR MATERIALS</h3>

    <p>As part of the Service, the Company may provide you with convenient links to third party web site(s) (&quot;Third Party Sites&quot;) as well as content or items belonging to or originating from third parties (the&quot;Third Party Applications, Software or Content&quot;). These links are provided as a courtesy to Service subscribers. The Company has no control over Third Party Sites and Third Party Applications, Software or Content or the promotions, materials, information, goods or services available on these Third Party Sites or Third Party Applications, Software or Content. Such Third Party Sites and Third Party Applications, Software or Content are not investigated, monitored or checked for accuracy, appropriateness, or completeness by the Company, and the Company is not responsible for any Third Party Sites accessed through the Site or any Third Party Applications, Software or Content posted on, available through or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices or other policies of or contained in the Third Party Sites or the Third Party Applications, Software or Content. Inclusion of, linking to or permitting the use or installation of any Third Party Site or any Third Party Applications, Software or Content does not imply approval or endorsement thereof by the Company. If you decide to leave the Site and access the Third Party Sites or to use or install any Third Party Applications, Software or Content, you do so at your own risk and you should be aware that our terms and policies no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any site to which you navigate from the Site or relating to any applications you use or install from the site.</p>

    <h3>COPYRIGHT COMPLAINTS AND COPYRIGHT AGENT</h3>

    <p>(a) Termination of Repeat Infringe Accounts. The Company respects the intellectual property rights of others and requests that the users do the same. The Company has adopted and implemented a policy that provides for the termination in appropriate circumstances of users of the Service who are repeat infringers The Company may terminate access for participants or users who are found repeatedly to provide or post protected third party content without necessary rights and permissions.</p>

    <p>(b) Take-Down Notices. If you are a copyright owner or an agent thereof and believe, in good faith, that any materials provided on the Service infringe upon your copyrights, you may submit a notification pursuant by sending the following information in writing to the Company's designated copyright agent at Silver Link:</p>

    <ul>
      <li>The date of your notification;</li>
      <li>A Physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
      <li>A description of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are recovered by a single notification, a representative list of such works at that site;</li>
      <li>A description of the material that is claimed to be infringing or to be the subject of infringing activity and information sufficient to enable us to locate such work;</li>
      <li>Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and/or email address;</li>
      <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
      <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
    </ul>

    <p>(c) Counter-Notices. If you believe that your User Content that has been removed from the Site is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the content in your User Content, you may send a counter-notice containing the following information to our copyright agent using the contact information set forth above:</p>

    <ul>
      <li>Your physical or electronic signature;</li>
      <li>A description of the content that has been removed and the location at which the content appeared before it was removed;</li>
      <li>A statement that you have a good faith belief that the content was removed as a result of mistake or a misidentification of the content; and</li>
      <li>Your name, address, telephone number, and email address, a statement that you consent to the laws of Mexico and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
    </ul>

    <p>If a counter-notice is received by the Company copyright agent, the Company may send a copy of the counter-notice to the original complaining party informing such person that it may reinstate the removed content in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may (in the Company's discretion) be reinstated on the Site in 10 to 14 business days or more after receipt of the counter-notice.</p>

    <h3>LICENSE GRANT</h3>

    <p>By posting any User Content via the Service, you expressly grant, and you represent and warrant that you have a right to grant, to the Company a royalty-free, sub licensable, transferable, perpetual, irrevocable, non-exclusive, worldwide license to use, reproduce, modify, publish, list information regarding, edit, translate, distribute, publicly perform, publicly display, and make derivative works of all such User Content and your name, voice, and/or likeness as contained in your User Content, if applicable, in whole or impart, and in any form, media or technology, whether now known or hereafter developed, for use in connection with the Service.</p>

    <h3>INTELLECTUAL PROPERTY</h3>

    <p>You acknowledge and agree that we and our licensors retain ownership of all intellectual property rights of any kind related to the Service, including applicable copyrights, trademarks and other proprietary rights. Other product and business names that are mentioned on the Service may be trademarks of their respective owners. We reserve all rights that are not expressly granted to you under this Agreement.</p>

    <h3>EMAIL MAY NOT BE USED TO PROVIDE NOTICE</h3>

    <p>Communications made through the Service's e-mail and messaging system, will not constitute legal notice to the Company or any of its officers, employees, agents or representatives in any situation where notice to the Company is required by contract or any law or regulation.</p>

    <h3>USER CONSENT TO RECEIVE COMMUNICATIONS IN ELECTRONIC FORM</h3>

    <p>For contractual purposes, you (a) consent to receive communications from the Company in an electronic form via the email address you have submitted; and (b) agree that all Terms of Use, agreements, notices, disclosures, and other communications that the Company provides to you electronically satisfy any legal requirement that such communications would satisfy if it were in writing. The foregoing does not affect your non-waivable rights.</p>

    <p>We may also use your email address, to send you other messages, including information about the Company and special offers. You may opt out of such email by changing your account settings or sending an email to Silver Link.
  Opting out may prevent you from receiving messages regarding the Company or Special Offers.
    </p>

    <h3>WARRANTY</h3>

    <p>THE SERVICE, IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND. WITHOUT LIMITING THE FOREGOING, THE COMPANY EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, REGARDING THE SERVICE INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, SECURITY, ACCURACY AND NON-INFRINGEMENT. WITHOUT LIMITING THE FOREGOING, THE COMPANY MAKES NO WARRANTY OR REPRESENTATION THAT ACCESS TO OR OPERATION OF THE SERVICE WILL BE UNINTERRUPTED OR ERROR FREE. YOU ASSUME FULL RESPONSIBILITY AND RISK OF LOSS RESULTING FROM YOUR DOWNLOADING AND/OR USE OF FILES, INFORMATION, CONTENT OR OTHER MATERIAL OBTAINED FROM THE SERVICE. SOME JURISDICTIONS LIMIT OR DO NOT PERMIT DISCLAIMERS OF WARRANTY, SO THIS PROVISION MAY NOT APPLY TO YOU.</p>

    <h3>LIMITATION OF DAMAGES; RELEASE</h3>

    <p>TO THE EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS AFFILIATES, DIRECTORS, OR EMPLOYEES, OR ITS LICENSORS OR PARTNERS, BE LIABLE TO YOU FOR ANY LOSS OF PROFITS, USE, OR DATA, OR FOR ANY INCIDENTAL, INDIRECT, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, HOWEVER ARISING, THAT RESULT FROM (A) THE USE, DISCLOSURE, OR DISPLAY OF YOUR USER CONTENT; (B) YOUR USE OR INABILITY TO USE THE SERVICE; (C) THE SERVICE GENERALLY OR THE SOFTWARE OR SYSTEMS THAT MAKE THE SERVICE AVAILABLE; OR (D) ANY OTHER INTERACTIONS WITH THE COMPANY OR ANY OTHER USER OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUD INGNEGLIGENCE) OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. SOME JURISDICTIONS LIMIT OR DO NOT PERMIT DISCLAIMERS OF LIABILITY, SO THIS PROVISION MAY NOT APPLY TO YOU.
  If you have a dispute with one or more users or a merchant of a product or service that you review using the Service, you release us (and our officers, directors, agents, subsidiaries, joint ventures and employees) from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.
    </p>

    <h3>MODIFICATION OF TERMS OF USE</h3>

    <p>We can amend these Terms of Use at any time and will update these Terms of Use in the event of any such amendments. It is your sole responsibility to check the Site from time to time to view any such changes in the Agreement. If you continue to use the Site, you signify your agreement to our revisions to these Terms of Use. However, we will notify you of material changes to the terms by posting a notice on our homepage and/or sending an email to the email address you provided to us upon registration. For this additional reason, you should keep your contact and profile information current. Any changes to these Terms or waiver of the Company's rights hereunder shall not be valid or effective except in a written agreement bearing the physical signature of an officer of the Company. No purported waiver or modification of this Agreement by the Company via telephonic or email communications shall be valid.</p>

    <h3>GENERAL TERMS</h3>

    <p>If any part of this Agreement is held invalid or unenforceable, that portion of the Agreement will be construed consistent with applicable law. The remaining portions will remain in full force and effect. Any failure on the part of the Company to enforce any provision of this Agreement will not be considered a waiver of our right to enforce such provision.</p>

    <p>Our rights under this Agreement will survive any termination of this Agreement.</p>

    <p>You agree that any cause of action related to or arising out of your relationship with the Company must commence within ONE year after the cause of action accrues. Otherwise, such cause of action is permanently barred.</p>

    <p>These Terms of Use and your use of the Site are governed by the laws of Mexico, without regard to conflict of law provisions.</p>

    <p>The Company may assign or delegate these Terms of Service and/or the Company's Privacy Policy, in whole or in part, to any person or entity at any time with or without your consent. You may not assign or delegate any rights or obligations under the Terms of Service or Privacy Policy without the Company's prior written consent, and any unauthorized assignment and delegation by you is void.</p>

    <p>YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE, UNDERSTAND THE TERMS OF USE, AND WILL BE BOUND BY THESE TERMS AND CONDITIONS. YOU FURTHER ACKNOWLEDGE THAT THESE TERMS OF USE TOGETHER WITH THE PRIVACY POLICY AT http://silverlink.io REPRESENT THE COMPLETE AND EXCLUSIVE STATEMENT OF THE AGREEMENT BETWEEN US AND THAT IT SUPERSEDES ANY PROPOSAL OR PRIOR AGREEMENT ORAL OR WRITTEN, AND ANY OTHER COMMUNICATIONS BETWEEN US RELATING TO THE SUBJECT MATTER OF THIS AGREEMENT.</p>

    <h3>Privacy Policy</h3>

    <p>Our Privacy Policy was last updated and posted on March 21, 2018. It governs the privacy terms of our Website, located at http://silverlink.io, sub-domains, and any associated web-based and mobile applications (collectively, "Website"), as owned and operated by Silver Link. Any capitalized terms not defined in our Privacy Policy, have the meaning as specified in our Terms of Service.</p>

    <p>Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. We use your Personal Information only for providing and improving the website. By using the website, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at http://silverlink.io. The following outlines our privacy policy.</p>

    <ul>
      <li>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.</li>
      <li>We will collect and use personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.</li>
      <li>We will only retain personal information as long as necessary for the fulfillment of those purposes.</li>
      <li>We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</li>
      <li>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</li>
      <li>We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</li>
      <li>We will make readily available to customers information about our policies and practices relating to the management of personal information.</li>
    </ul>

    <h3>Your Privacy</h3>

    <p>Silver Link follows all legal requirements to protect your privacy. Our Privacy Policy is a legal statement that explains how we may collect information from you, how we may share your information, and how you can limit our sharing of your information. We utilize the Personal Data you offer in a way that is consistent with this Personal privacy Policy. If you provide Personal Data for a particular reason, we could make use of the Personal Data in connection with the reason for which it was provided. For example, registration info sent when developing your account, might be used to suggest products to you based on past acquisitions. We might use your Personal Data to offer access to services on the Website and monitor your use of such services. Silver Link may also utilize your Personal Data and various other personally non-identifiable info gathered through the Website to assist us with improving the material and functionality of the Website, to much better comprehend our users, and to improve our services. You will see terms in our Privacy Policy that are capitalized. These terms have meanings as described in the Definitions section below.</p>

    <p>Definitions"Non Personal Information" is information that is not personally identifiable to you and that we automatically collect when you access our Website with a web browser. It may also include publicly available information that is shared between you and others.</p>

    <p>"Personally Identifiable Information" is non-public information that is personally identifiable to you and obtained in order for us to provide you our Website. Personally Identifiable Information may include information such as your name, email address, and other related information that you provide to us or that we obtain about you.</p>

    <p>Information We CollectGenerally, you control the amount and type of information you provide to us when using our Website.
  As a Visitor, you can browse our website to find out more about our Website. You are not required to provide us with any Personally Identifiable Information as a Visitor.
    </p>

    <p>Computer Information CollectedWhen you use our Website, we automatically collect certain computer information by the interaction of your mobile phone or web browser with our Website. Such information is typically considered Non Personal.</p>

    <h3>Information. We also collect the following:</h3>

    <ul>
      <li>CookiesOur Website uses "Cookies" to identify the areas of our Website that you have visited. A Cookie is a small piece of data stored on your computer or mobile device by your web browser. We use Cookies to personalize the Content that you see on our Website. Most web browsers can be set to disable the use of Cookies. However, if you disable Cookies, you may not be able to access functionality on our Website correctly or at all. We never place Personally Identifiable Information in Cookies.</li>
      <li>Geographical InformationWhen you use the mobile application, we may use GPS technology (or other similar technology) to determine your current location in order to determine the city you are located in and display information with relevant data or advertisements. We will not share your current location with other users or partners. If you do not want us to use your location for the purposes set forth above, you should turn off the location services for the mobile application located in your account settings or in your mobile phone settings and/or within the mobile application.</li>
      <li>Automatic InformationWe automatically receive information from your web browser or mobile device. This information includes the name of the website from which you entered our Website, if any, as well as the name of the website to which you're headed when you leave our website. This information also includes the IP address of your computer/proxy server that you use to access the Internet, your Internet Website provider name, web browser type, type of mobile device, and computer operating system. We use all of this information to analyze trends among our Users to help improve our Website.</li>
      <li>Log DataLike many Website operators, we collect information that your browser sends whenever you visit our Website ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Website that you visit, the time and date of your visit, the time spent on those pages and other statistics.</li>
    </ul>

    <p>Under the Child's Online Privacy Security Act, no Website operator can require, as a condition to involvement in an activity, that a child younger than 13 years of age divulge more details than is reasonably required. Silver Link abides by this demand. Silver Link just collects information willingly offered; no information is gathered passively. children under 13 can submit only their email address when sending us an email in our "Contact Us" area. Silver Link makes use of the email address to respond to a one-time demand from a child under 13 and afterwards deletes the email address. In case Silver Link collects and maintains personal information relating to a child under 13, the parent may send out an email to us to review, alter and/or erase such info as well as to decline to enable any additional collection or use of the child's information.</p>

    <p>How We Use Your InformationWe use the information we receive from you as follows:</p>

    <ul>
      <li>Customizing Our WebsiteWe may use the Personally Identifiable information you provide to us along with any computer information we receive to customize our Website.</li>
      <li>Sharing Information with Affiliates and Other Third PartiesWe do not sell, rent, or otherwise provide your Personally Identifiable Information to third parties for marketing purposes. We may provide your Personally Identifiable Information to affiliates that provide services to us with regards to our Website (i.e. payment processors, Website hosting companies, etc.); such affiliates will only receive information necessary to provide the respective services and will be bound by confidentiality agreements limiting the use of such information.</li>
      <li>Data AggregationWe retain the right to collect and use any Non Personal Information collected from your use of our Website and aggregate such data for internal analytics that improve our Website and Service as well as for use or resale to others. At no time is your Personally Identifiable Information included in such data aggregations.</li>
      <li>Legally Required Releases of InformationWe may be legally required to disclose your Personally Identifiable Information, if such disclosure is (a) required by subpoena, law, or other legal process; (b) necessary to assist law enforcement officials or government enforcement agencies; (c) necessary to investigate violations of or otherwise enforce our Legal Terms; (d) necessary to protect us from legal action or claims from third parties including you and/or other Members; and/or (e) necessary to protect the legal rights, personal/real property, or personal safety of Silver Link, our Users, employees, and affiliates.</li>
    </ul>

    <p>Opt-OutWe offer you the chance to "opt-out" from having your personally identifiable information used for particular functions, when we ask you for this detail. When you register for the website, if you do not want to receive any additional material or notifications from us, you can show your preference on our registration form.
  Links to Other WebsitesOur Website may contain links to other websites that are not under our direct control. These websites may have their own policies regarding privacy. We have no control of or responsibility for linked websites and provide these links solely for the convenience and information of our visitors. You access such linked Websites at your own risk. These websites are not subject to this Privacy Policy. You should check the privacy policies, if any, of those individual websites to see how the operators of those third-party websites will utilize your personal information. In addition, these websites may contain a link to Websites of our affiliates. The websites of our affiliates are not subject to this Privacy Policy, and you should check their individual privacy policies to see how the operators of such websites will utilize your personal information.
    </p>

    <h3>Security</h3>

    <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. We utilize practical protection measures to safeguard against the loss, abuse, and modification of the individual Data under our control. Personal Data is kept in a secured database and always sent out by means of an encrypted SSL method when supported by your web browser. No Web or email transmission is ever totally protected or mistake cost-free. For example, email sent out to or from the Website may not be protected. You must take unique care in deciding what info you send to us by means of email.
  Privacy Policy UpdatesWe reserve the right to modify this Privacy Policy at any time. You should review this Privacy Policy frequently. If we make material changes to this policy, we may notify you on our Website, by a blog post, by email, or by any method we determine. The method we chose is at our sole discretion. We will also change the "Last Updated" date at the beginning of this Privacy Policy. Any changes we make to our Privacy Policy are effective as of this Last Updated date and replace any prior Privacy Policies.
    </p>

    <p>Questions About Our Privacy Practices or This Privacy PolicyWe are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. If you have any questions about our Privacy Practices or this Policy, please contact us.</p>

    <h3>About Us</h3>

    <p>We’re a project started in 2017 with the firm vision of change the global economy in a positive way, Silver Link Platform currently has Offices in Mexico at the following address:</p>

    <p>CHAPULTEPEC SUR AVENUE #560, SUITE 51, GUADALAJARA, JAL, MEXICO</p>

    <h3>Copyright Notice</h3>

    <p>All files and information contained in this Website or Blog located at http://silverlink.io are copyright by Silver Link, and may not be duplicated, copied, modified or adapted, in any way without our written permission. Our Website or Blog may contain our service marks or trademarks as well as those of our affiliates or other companies, in the form of words, graphics, and logos.</p>

    <p>Your use of our Website, Blog or Services does not constitute any right or license for you to use our service marks or trademarks, without the prior written permission of Silver Link.</p>

    <p>Our Content, as found within our Website, Blog and Services, is protected under United States and foreign copyrights. The copying, redistribution, use or publication by you of any such Content, is strictly prohibited. Your use of our Website and Services does not grant you any ownership rights to our Content.</p>

    <h3>Enforcement of copyright</h3>

    <p>Silver Link takes the protection of its copyright very seriously.</p>

    <p>If Silver Link discovers that you have used its copyright materials in contravention of the license above, Silver Link may bring legal proceedings against you seeking monetary damages and an injunction to stop you using those materials.  You could also be ordered to pay legal costs.</p>

    <p>If you become aware of any use of Silver Link’s copyright materials that contravenes or may contravene the license above, please report this to us immediately.</p>

    <p>Copyright © Silver Link 2018 All Rights Reserved</p>
  </Modal>
);

export default Terms;
