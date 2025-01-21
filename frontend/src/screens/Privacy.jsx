const Privacy = () => {
  return (
    
      <div className=" w-full bg-white p-8">
        <h1 className="text-base sm:text-xl font-bold text-center mb-6">Privacy Policy</h1>
        <div className="text-gray-700 text-sm leading-relaxed">
          <p>
            At <strong>TrendHive</strong>, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines how we collect,
            use, and safeguard your data when you use our services.
          </p>
          <h2 className="text-sm sm:text-base font-semibold mt-6">1. Information We Collect</h2>
          <p>
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Personal identification information (name, email address, phone number, etc.)</li>
            <li>Payment details for transactions.</li>
            <li>Technical data such as IP address, browser type, and usage statistics.</li>
          </ul>

          <h2 className="text-sm sm:text-base font-semibold mt-6">2. How We Use Your Information</h2>
          <p>
            We use the information we collect for:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Providing and maintaining our services.</li>
            <li>Improving user experience and personalizing content.</li>
            <li>Processing transactions securely.</li>
          </ul>

          <h2 className="text-sm sm:text-base font-semibold mt-6">3. Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties except as required by law
            or for essential service operations (e.g., payment processing).
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">4. Data Security</h2>
          <p>
            We implement robust security measures to protect your data, including encryption and
            regular audits. However, no method of transmission or storage is 100% secure.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. To exercise
            these rights, contact us at <strong>support@trendhive.com</strong>.
          </p>

          <p className="mt-6">
            If you have any questions about this Privacy Policy, please contact us. Thank you for
            trusting <strong>TrendHive</strong>.
          </p>
        </div>
      </div>
  );
};

export default Privacy;
