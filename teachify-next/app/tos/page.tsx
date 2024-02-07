"use client";

import { useContext } from "react";
import Sidebar from "@/components/Sidebar";
import { DarkModeContext } from "@/context/darkModeContext";
import { Authentication } from "@/components/Authentication";

export default function MenuContent() {
    const darkMode = useContext(DarkModeContext);
    const containerClass = darkMode
        ? "dark:bg-gray-800 h-full overflow-auto"
        : "bg-gray-100 h-full overflow-auto";

    return (
        <Authentication>
            <div className={`w-full menu-container ${containerClass}`}>
                <Sidebar />
                <h1 className="px-8 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Terms of Service and Privacy Policy
                </h1>
                <p className="px-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Teachify will NEVER use your information without your permission. 
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-2 py-12 px-8 gap-16">
                <p className="px-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    <h1>
                    <p className="font-size: 50px px-20 text-lg font-normal text-gray-500 lg:text-4xl dark:text-gray-400"> <b>Terms of Service</b> </p>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Acceptance of Terms</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        By using Teachify, you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please do not use the Service.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Use of the Service </b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        <b>a. Eligibility: </b> You must be of legal age and have the legal capacity to enter into this agreement.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        <b>b. User Account:</b> You are responsible for maintaining the security of your user account and password. You agree not to share your account information or access credentials with others
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>User Conduct</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        <b>a. Prohibited Activities:</b> You may not use the Service for any unlawful, harmful, or malicious purposes. This includes, but is not limited to, engaging in harassment, defamation, fraud, or any activity that violates applicable laws and regulations.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        <b>b. AI Usage:</b> You acknowledge that the Service may utilize artificial intelligence (AI) technologies and that the results generated by the AI are provided "as is." You agree not to misuse the AI capabilities of the Service.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Privacy and Data</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        <b>a. Data Collection:</b> We collect and use your personal information in accordance with our Privacy Policy. By using the Service, you consent to our data practices.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        <b>b. Content Ownership:</b> You retain ownership of any content you submit to the Service, but you grant Teachify a non-exclusive license to use, modify, and display your content within the Service.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Intellectual Property</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                       <b>Copyright:</b> All content and materials provided by Teachify, including text, graphics, and software, are protected by copyright and other intellectual property laws. You may not copy, reproduce, or distribute our content without permission.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Disclaimer of Warranties</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        The Service is provided "as is" without warranties of any kind, whether express or implied. Teachify does not warrant that the Service will be error-free.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Limitation of Liability</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        Teachify shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Termination</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        Teachify reserves the right to terminate or suspend your access to the Service for any reason, including violations of these Terms of Service.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Governing Law and Jurisdiction</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        These Terms of Service are governed by the laws of Canada. Any legal actions or disputes arising from these terms will be resolved in the courts of Canada.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Changes to Terms of Service</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        Teachify may update these Terms of Service from time to time. You will be notified of changes, and your continued use of the Service after such changes constitute acceptance of the revised terms.
                    </p>
                    <p>
                        &nbsp;
                    </p>
                    <h1>
                        <b>Contact Information</b>
                    </h1>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        If you have any questions or concerns about these Terms of Service, please contact us at [Insert Contact info here (idk it)].
                    </p>

                </p>
                
                <p className="px-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <h1>
                    <p className="font-size: 50px px-20 text-lg font-normal text-gray-500 lg:text-4xl dark:text-gray-400"> <b>Privacy Policy</b> </p>
                </h1>
                <p>
                    &nbsp;
                </p>
                <p>
                    &nbsp;
                </p>
                <p>
                    Welcome to Teachify, an AI-powered app designed to help students with questions related to their classes. Your privacy is important to us, and this Privacy Policy explains how Teachify ("we," "our," or "us") collects, uses, discloses, and safeguards your personal information when you use our app. We may collect various types of information when you use Teachify, including personal information such as your name, email address, and profile picture (if provided). We also collect usage information, which includes app usage data and device information (e.g., device type, operating system, unique device identifiers). Additionally, any questions, answers, or other content you submit or post within the app are considered user-generated content. We use this collected information to provide and improve the Teachify app, respond to your inquiries, personalize your experience, and communicate with you about updates and relevant content. Your privacy is important to us, and we take measures to protect your personal information from unauthorized access or disclosure. You have the option to manage your account information, opt-out of promotional emails, and request the deletion of your account and associated data. Please note that Teachify is not intended for use by individuals under the age of 13, and we do not knowingly collect personal information from children under 13. We may update this Privacy Policy to reflect changes in our data practices and will notify you of any significant updates through the app or via email. If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at [contact email].
                </p>

                </p>
                
                </div>
            </div>
        </Authentication>
    );
}
