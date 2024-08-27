import React from 'react';

const RegulationPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[80vh] relative overflow-y-auto">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="p-6 space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Terms of Service and Data Processing Agreement</h2>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
                        <p className="text-base text-gray-700">
                            By using TackChat, you agree to comply with the terms and conditions set forth in this
                            agreement.
                            Use of the service implies full acceptance of these terms.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">2. Minimum Age Requirement</h3>
                        <p className="text-base text-gray-700">
                            You declare that you are at least 18 years old. If you are under 18, use of the service is
                            permitted only
                            with the consent of a parent or legal guardian.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">3. User Conduct</h3>
                        <p className="text-base text-gray-700">
                            You agree not to use the service to:
                        </p>
                        <ul className="list-disc list-inside pl-4 text-base text-gray-700">
                            <li>Post illegal, offensive, threatening, defamatory, obscene, or otherwise objectionable
                                content.
                            </li>
                            <li>Infringe on intellectual property rights or other rights of third parties.</li>
                            <li>Compromise the security of the service, such as attempting to gain unauthorized access
                                or spreading viruses.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">4. Limitation of Liability</h3>
                        <p className="text-base text-gray-700">
                            TackChat is not responsible for:
                        </p>
                        <ul className="list-disc list-inside pl-4 text-base text-gray-700">
                            <li>User-generated content or user activities within the service.</li>
                            <li>Any direct, indirect, incidental, special, consequential, or punitive damages arising
                                from the use or inability to use the service.
                            </li>
                            <li>Any technical issues, network problems, or compatibility issues that may limit access to
                                or use of the service.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">5. Service and Terms Modification</h3>
                        <p className="text-base text-gray-700">
                            TackChat reserves the right to modify, suspend, or discontinue, temporarily or permanently,
                            the service or any part of it with or without notice.
                            The terms of service may be modified at any time; continued use of the service constitutes
                            acceptance of the changes.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">6. Privacy and Data Processing</h3>
                        <p className="text-base text-gray-700">
                            TackChat is committed to protecting the privacy of its users. The following information
                            outlines how personal data is handled:
                        </p>
                        <h4 className="text-lg font-semibold mt-2">Data Collected</h4>
                        <p className="text-base text-gray-700">
                            TackChat collects data provided directly by the user, such as name, email address, gender,
                            and login information. TackChat may also automatically collect technical information, such
                            as IP address, browser type, and usage data.
                        </p>
                        <h4 className="text-lg font-semibold mt-2">Use of Data</h4>
                        <p className="text-base text-gray-700">
                            Collected data is used to provide and improve the service, manage user accounts, communicate
                            with users, and personalize the user experience. TackChat may also use data for internal
                            analysis, marketing (with user consent), and to comply with legal obligations.
                        </p>
                        <h4 className="text-lg font-semibold mt-2">Data Sharing</h4>
                        <p className="text-base text-gray-700">
                            TackChat will not sell, rent, or lease user data to third parties without explicit user
                            consent, unless necessary to provide the service (e.g., with third-party service providers)
                            or to comply with legal obligations.
                        </p>
                        <h4 className="text-lg font-semibold mt-2">Data Security</h4>
                        <p className="text-base text-gray-700">
                            TackChat employs technical and organizational security measures to protect user data.
                            However, no system can guarantee absolute security; TackChat cannot ensure that data will
                            not be accessed, disclosed, altered, or destroyed in the event of a breach.
                        </p>
                        <h4 className="text-lg font-semibold mt-2">Data Retention</h4>
                        <p className="text-base text-gray-700">
                            Personal data will be retained as long as necessary to provide the service, fulfill legal
                            obligations, resolve disputes, and enforce the terms of service.
                        </p>
                        <h4 className="text-lg font-semibold mt-2">User Rights</h4>
                        <p className="text-base text-gray-700">
                            Users have the right to access, correct, delete their personal data, and object to the
                            processing of their data within the limits provided by law. Users may exercise these rights
                            by contacting TackChat at the provided email address.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">7. Governing Law and Jurisdiction</h3>
                        <p className="text-base text-gray-700">
                            These terms are governed by the laws of Italy. Any dispute arising from the use of the
                            service will be subject to the exclusive jurisdiction of the courts of Bari, Italy.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">8. Final Provisions</h3>
                        <p className="text-base text-gray-700">
                            If any provision of this agreement is found to be invalid or unenforceable, the remaining
                            provisions will remain in full force and effect. The failure to enforce any right or
                            provision of these terms will not constitute a waiver of such right or provision.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-2">9. Contact</h3>
                        <p className="text-base text-gray-700">
                            For any questions or concerns regarding these terms or data processing, you can contact
                            TackChat at:
                            <a href="mailto:help@tackchat.it"
                               className="text-blue-500 hover:underline">help@tackchat.it</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RegulationPopup;