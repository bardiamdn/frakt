import Link from "next/link";
import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful</h1>
      <p>
        Thank you for your payment. Your transaction has been completed
        successfully.
      </p>
      <Link href="/" style={{ textDecoration: "none", color: "blue" }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
