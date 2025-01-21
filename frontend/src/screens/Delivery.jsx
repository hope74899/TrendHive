
const Delivery = () => {
  return (
      <div className="w-full bg-white p-8">
        <h1 className="text-base sm:text-xl font-bold text-center mb-6">Delivery Policy</h1>
        <div className="text-gray-700 text-sm leading-relaxed">
          <p>
            Welcome to <strong>TrendHive</strong>. Our Delivery Policy outlines the details about
            shipping, handling, and delivery of your orders to ensure a smooth shopping experience.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">1. Processing Time</h2>
          <p>
            - Orders are processed within <strong>1-2 business days</strong> after payment is confirmed.
          </p>
          <p>
            - Orders placed on weekends or public holidays will be processed on the next business day.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">2. Shipping Methods</h2>
          <p>We offer the following shipping options to deliver your order:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Standard Shipping: Delivery within 5-7 business days.</li>
            <li>Express Shipping: Delivery within 2-3 business days.</li>
            <li>Free Shipping: Available for orders above <strong>$500</strong>.</li>
          </ul>

          <h2 className="text-sm sm:text-base font-semibold mt-6">3. Delivery Times</h2>
          <p>
            Estimated delivery times depend on your location and selected shipping method:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Local deliveries: 1-3 business days.</li>
            <li>National deliveries: 3-7 business days.</li>
            <li>International deliveries: 7-14 business days.</li>
          </ul>
          <p>
            Please note that unforeseen circumstances such as weather, natural disasters, or courier
            delays may impact delivery times.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">4. Shipping Costs</h2>
          <p>
            - Shipping costs are calculated based on your location and the weight of your order.
          </p>
          <p>
            - During promotions, free or discounted shipping may be available. Check our website for
            the latest offers.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">5. Tracking Your Order</h2>
          <p>
            Once your order is shipped, you will receive a confirmation email with a tracking number
            to monitor the delivery status of your package.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">6. Delivery Issues</h2>
          <p>
            If you experience any issues with your delivery (e.g., missing or damaged items), please
            contact our customer support team at{" "}
            <strong>support@trendhive.com</strong> within <strong>48 hours</strong> of receiving your
            order. We’ll work to resolve the issue promptly.
          </p>

          <h2 className="text-sm sm:text-base font-semibold mt-6">7. International Shipping</h2>
          <p>
            - We deliver internationally to selected countries. Additional customs or import duties
            may apply, depending on the destination.
          </p>
          <p>
            - Please ensure your delivery address is accurate to avoid delays or lost shipments.
          </p>

          <p className="mt-6">
            At <strong>TrendHive</strong>, we aim to provide reliable delivery services to enhance
            your shopping experience. Thank you for choosing us!
          </p>
        </div>
      </div>
  );
};

export default Delivery;
