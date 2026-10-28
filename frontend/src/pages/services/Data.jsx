
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import {
//   FiArrowRight,
//   FiCheck,
//   FiChevronDown,
//   FiDatabase,
//   FiPhone,
//   FiSearch,
//   FiShield,
//   FiZap,
// } from "react-icons/fi";

// import "./Data.css";

// const API_URL = "http://localhost:3000";

// function Data() {
//   const navigate = useNavigate();

//   const [phone, setPhone] = useState("");
//   const [network, setNetwork] = useState("mtn-data");

//   const [plans, setPlans] = useState([]);
//   const [search, setSearch] = useState("");

//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const [plansLoading, setPlansLoading] = useState(false);
//   const [purchaseLoading, setPurchaseLoading] = useState(false);

//   const [error, setError] = useState("");

//   // =====================================================
//   // GET DATA PLANS FROM BACKEND
//   // =====================================================

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         setPlansLoading(true);
//         setError("");

//         const response = await axios.get(
//           `${API_URL}/api/vtu/data/plans/${network}`
//         );

//         console.log("DATA PLANS RESPONSE:", response.data);

//         if (response.data.success) {
//           setPlans(response.data.plans || []);
//         } else {
//           setPlans([]);
//           setError(
//             response.data.message ||
//               "Unable to load data plans."
//           );
//         }
//       } catch (error) {
//         console.error(
//           "DATA PLANS ERROR:",
//           error.response?.data || error.message
//         );

//         setPlans([]);

//         setError(
//           error.response?.data?.message ||
//             "Unable to load data plans."
//         );
//       } finally {
//         setPlansLoading(false);
//       }
//     };

//     fetchPlans();
//   }, [network]);

//   // =====================================================
//   // SEARCH
//   // =====================================================

//   const filteredPlans = useMemo(() => {
//     const searchValue = search.toLowerCase().trim();

//     if (!searchValue) {
//       return plans;
//     }

//     return plans.filter((plan) => {
//       return (
//         String(plan.name || "")
//           .toLowerCase()
//           .includes(searchValue) ||
//         String(plan.variation_code || "")
//           .toLowerCase()
//           .includes(searchValue) ||
//         String(plan.variation_amount || "")
//           .toLowerCase()
//           .includes(searchValue)
//       );
//     });
//   }, [plans, search]);

//   // =====================================================
//   // SELECT PLAN
//   // =====================================================

//   const handleSelectPlan = (plan) => {
//     setSelectedPlan(plan);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // =====================================================
//   // PURCHASE / PAYSTACK PAYMENT
//   // =====================================================

//   const handlePurchase = async () => {
//     setError("");

//     // Check phone
//     if (!phone.trim()) {
//       alert("Please enter the phone number you want to recharge.");
//       return;
//     }

//     // Basic Nigerian phone validation
//     const cleanedPhone = phone.replace(/\s+/g, "");

//     if (!/^(0\d{10}|\+234\d{10})$/.test(cleanedPhone)) {
//       alert("Please enter a valid Nigerian phone number.");
//       return;
//     }

//     // Check selected plan
//     if (!selectedPlan) {
//       alert("Please select a data plan.");
//       return;
//     }

//     // Check token
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Your session has expired. Please login again.");
//       navigate("/login");
//       return;
//     }

//     // Get logged-in user
//     let storedUser = null;

//     try {
//       storedUser = JSON.parse(
//         localStorage.getItem("user")
//       );
//     } catch (error) {
//       console.error("Could not read stored user:", error);
//     }

//     const email = storedUser?.email;

//     if (!email) {
//       alert(
//         "We could not find your email address. Please login again."
//       );
//       navigate("/login");
//       return;
//     }

//     try {
//       setPurchaseLoading(true);

//       // Amount comes from the backend plan
//       const amount = Number(
//         selectedPlan.variation_amount ||
//           selectedPlan.price ||
//           0
//       );

//       if (!amount || amount <= 0) {
//         alert("Invalid data plan amount.");
//         return;
//       }

//       // =================================================
//       // SEND PAYMENT INITIALIZATION REQUEST
//       // =================================================

//       const paymentPayload = {
//         email,
//         amount,
//         phone: cleanedPhone,
//         service: "data",
//         network,
//         variation_code:
//           selectedPlan.variation_code ||
//           selectedPlan.planId,
//       };

//       console.log(
//         "PAYMENT REQUEST:",
//         paymentPayload
//       );

//       const response = await axios.post(
//         `${API_URL}/api/payment/initialize`,
//         paymentPayload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(
//         "PAYMENT RESPONSE:",
//         response.data
//       );

//       // =================================================
//       // GET PAYSTACK URL
//       // =================================================

//       if (response.data.success) {
//         const paymentUrl =
//           response.data.authorization_url ||
//           response.data.data?.authorization_url ||
//           response.data.data?.authorizationUrl;

//         if (paymentUrl) {
//           console.log(
//             "REDIRECTING TO PAYSTACK:",
//             paymentUrl
//           );

//           // Send user to Paystack
//           window.location.href = paymentUrl;

//           return;
//         }

//         console.error(
//           "Paystack URL missing:",
//           response.data
//         );

//         alert(
//           "Payment was initialized, but no payment link was returned."
//         );

//         return;
//       }

//       alert(
//         response.data.message ||
//           "Unable to start payment."
//       );
//     } catch (error) {
//       console.error(
//         "PAYMENT ERROR:",
//         error.response?.data ||
//           error.message
//       );

//       console.error(
//         "PAYMENT STATUS:",
//         error.response?.status
//       );

//       console.error(
//         "PAYMENT RESPONSE:",
//         error.response?.data
//       );

//       const message =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Unable to start payment.";

//       alert(message);
//     } finally {
//       setPurchaseLoading(false);
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <div className="data-page">

//       {/* HERO */}
//       <section className="data-hero">

//         <div className="data-hero-content">

//           <div className="hero-badge">
//             <FiZap />
//             Fast & Reliable Data
//           </div>

//           <h1>
//             Buy Data
//             <span> Instantly</span>
//           </h1>

//           <p>
//             Get affordable data plans for your phone.
//             Choose your network, select a plan and
//             stay connected.
//           </p>

//           <div className="hero-features">

//             <div>
//               <FiCheck />
//               Instant Delivery
//             </div>

//             <div>
//               <FiCheck />
//               Affordable Plans
//             </div>

//             <div>
//               <FiCheck />
//               Secure Payment
//             </div>

//           </div>

//         </div>

//       </section>

//       {/* CONTENT */}
//       <section className="data-content">

//         {/* PURCHASE PANEL */}
//         <div className="purchase-panel">

//           <div className="panel-heading">

//             <div className="panel-icon">
//               <FiDatabase />
//             </div>

//             <div>
//               <h2>Purchase Data</h2>

//               <p>
//                 Enter your phone number and choose
//                 a data plan.
//               </p>
//             </div>

//           </div>

//           {/* PHONE + NETWORK */}
//           <div className="purchase-fields">

//             {/* PHONE */}
//             <div className="data-field">

//               <label>
//                 Phone Number
//               </label>

//               <div className="field-input">

//                 <FiPhone />

//                 <input
//                   type="tel"
//                   placeholder="08012345678"
//                   value={phone}
//                   onChange={(e) =>
//                     setPhone(e.target.value)
//                   }
//                 />

//               </div>

//             </div>

//             {/* NETWORK */}
//             <div className="data-field">

//               <label>
//                 Network
//               </label>

//               <div className="select-wrapper">

//                 <select
//                   value={network}
//                   onChange={(e) => {
//                     setNetwork(e.target.value);
//                     setSelectedPlan(null);
//                   }}
//                 >

//                   <option value="mtn-data">
//                     MTN
//                   </option>

//                   <option value="airtel-data">
//                     Airtel
//                   </option>

//                   <option value="glo-data">
//                     Glo
//                   </option>

//                   <option value="9mobile-data">
//                     9mobile
//                   </option>

//                 </select>

//                 <FiChevronDown />

//               </div>

//             </div>

//           </div>

//           {/* SELECTED PLAN */}
//           {selectedPlan && (

//             <div className="selected-plan">

//               <div>

//                 <small>
//                   Selected Plan
//                 </small>

//                 <strong>
//                   {selectedPlan.name}
//                 </strong>

//                 <span>
//                   Plan ID:{" "}
//                   {selectedPlan.variation_code}
//                 </span>

//               </div>

//               <strong className="selected-price">
//                 ₦
//                 {Number(
//                   selectedPlan.variation_amount ||
//                     selectedPlan.price ||
//                     0
//                 ).toLocaleString()}
//               </strong>

//             </div>

//           )}

//           {/* PAYMENT BUTTON */}
//           <button
//             className="purchase-button"
//             onClick={handlePurchase}
//             disabled={
//               purchaseLoading ||
//               !selectedPlan
//             }
//           >

//             {purchaseLoading
//               ? "Starting Payment..."
//               : "Continue to Payment"}

//             {!purchaseLoading && (
//               <FiArrowRight />
//             )}

//           </button>

//           <div className="secure-message">

//             <FiShield />

//             Your payment is secure and
//             protected by Paystack.

//           </div>

//         </div>

//         {/* PLANS */}
//         <div className="plans-section">

//           <div className="plans-header">

//             <div>

//               <span>
//                 AVAILABLE PLANS
//               </span>

//               <h2>
//                 Choose a Data Plan
//               </h2>

//               <p>
//                 Select the plan that works best
//                 for you.
//               </p>

//             </div>

//             <div className="search-box">

//               <FiSearch />

//               <input
//                 type="text"
//                 placeholder="Search plans..."
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//               />

//             </div>

//           </div>

//           {/* LOADING */}
//           {plansLoading && (

//             <div className="no-plans">

//               <FiDatabase />

//               <h3>
//                 Loading data plans...
//               </h3>

//               <p>
//                 Please wait while we fetch the
//                 latest plans.
//               </p>

//             </div>

//           )}

//           {/* ERROR */}
//           {!plansLoading && error && (

//             <div className="no-plans">

//               <FiDatabase />

//               <h3>
//                 Unable to load plans
//               </h3>

//               <p>
//                 {error}
//               </p>

//             </div>

//           )}

//           {/* PLAN CARDS */}
//           {!plansLoading &&
//             !error &&
//             filteredPlans.length > 0 && (

//               <div className="plans-grid">

//                 {filteredPlans.map(
//                   (plan, index) => {

//                     const planId =
//                       plan.variation_code ||
//                       plan.planId ||
//                       String(index);

//                     const price = Number(
//                       plan.variation_amount ||
//                         plan.price ||
//                         0
//                     );

//                     const isSelected =
//                       selectedPlan &&
//                       (
//                         selectedPlan.variation_code ===
//                           plan.variation_code ||
//                         selectedPlan.planId ===
//                           plan.planId
//                       );

//                     return (

//                       <div
//                         className={`plan-card ${
//                           isSelected
//                             ? "selected"
//                             : ""
//                         }`}
//                         key={planId}
//                       >

//                         <div className="plan-card-top">

//                           <div className="network-logo">
//                             {network
//                               .replace(
//                                 "-data",
//                                 ""
//                               )
//                               .toUpperCase()}
//                           </div>

//                           <span className="plan-type">
//                             Data
//                           </span>

//                         </div>

//                         <div className="plan-info">

//                           <h3>
//                             {plan.name}
//                           </h3>

//                           <div className="plan-validity">

//                             <FiDatabase />

//                             <span>
//                               {plan.variation_code}
//                             </span>

//                           </div>

//                         </div>

//                         <div className="plan-bottom">

//                           <strong>
//                             ₦
//                             {price.toLocaleString()}
//                           </strong>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleSelectPlan(
//                                 plan
//                               )
//                             }
//                           >

//                             {isSelected
//                               ? "Selected"
//                               : "Select"}

//                             <FiArrowRight />

//                           </button>

//                         </div>

//                       </div>

//                     );
//                   }
//                 )}

//               </div>

//             )}

//           {/* NO PLANS */}
//           {!plansLoading &&
//             !error &&
//             filteredPlans.length === 0 && (

//               <div className="no-plans">

//                 <FiDatabase />

//                 <h3>
//                   No plans found
//                 </h3>

//                 <p>
//                   Try another search or
//                   select another network.
//                 </p>

//               </div>

//             )}

//         </div>

//       </section>

//     </div>
//   );
// }

// export default Data;
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiDatabase,
  FiPhone,
  FiSearch,
  FiShield,
  FiZap,
} from "react-icons/fi";

import "./Data.css";

function Data() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("mtn-data");

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [search, setSearch] = useState("");

  const [loadingPlans, setLoadingPlans] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // =====================================================
  // LOAD DATA PLANS
  // =====================================================

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        setError("");

        const token = getToken();

        if (!token) {
          navigate("/login");
          return;
        }

        console.log("Fetching plans...");

        const response = await axios.get(
          `http://localhost:3000/api/vtu/data/plans/${network}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PLANS RESPONSE:", response.data);

        /*
          Your backend should return something similar to:

          {
            success: true,
            plans: [...]
          }
        */

        if (response.data?.success) {
          setPlans(response.data.plans || []);
        } else {
          setError(
            response.data?.message ||
              "No data plans were returned."
          );
        }
      } catch (err) {
        console.error(
          "LOAD PLANS ERROR:",
          err.response?.data || err.message
        );

        // If token expired
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Unable to load data plans."
        );
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, [network, navigate]);

  // =====================================================
  // FILTER PLANS
  // =====================================================

  const filteredPlans = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return plans;
    }

    return plans.filter((plan) => {
      return (
        String(plan.name || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(plan.variation_code || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(plan.planId || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(plan.validity || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(plan.type || "")
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [plans, search]);

  // =====================================================
  // SELECT PLAN
  // =====================================================

  const handleSelectPlan = (plan) => {
    console.log("Selected plan:", plan);

    setSelectedPlan(plan);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // PURCHASE DATA
  // =====================================================

  const handlePurchase = async () => {
    try {
      if (!phone.trim()) {
        alert("Please enter the phone number you want to recharge.");
        return;
      }

      if (phone.trim().length < 10) {
        alert("Please enter a valid phone number.");
        return;
      }

      if (!selectedPlan) {
        alert("Please select a data plan.");
        return;
      }

      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      /*
        IMPORTANT:

        Depending on what your backend returns,
        the variation code may be:

        selectedPlan.variation_code

        or:

        selectedPlan.planId
      */

      const variationCode =
        selectedPlan.variation_code ||
        selectedPlan.planId;

      const amount = Number(
        selectedPlan.variation_amount ||
        selectedPlan.price ||
        0
      );

      if (!variationCode) {
        alert("This data plan has no plan code.");
        return;
      }

      if (!amount || amount <= 0) {
        alert("This data plan has an invalid price.");
        return;
      }

      setPurchaseLoading(true);

      console.log("Starting payment for:");

      console.log({
        phone,
        network,
        variation_code: variationCode,
        amount,
      });
const storedUser = JSON.parse(
  localStorage.getItem("user")
);

// const email = storedUser?.email;


      /*
        IMPORTANT

        This should match your payment route:

        POST /api/payment/initialize
      */

      const response = await axios.post(
        "http://localhost:3000/api/payment/initialize",
        {
          service: "data",

          phone: phone.trim(),

          network,

          variation_code: variationCode,

          amount,

            email: storedUser?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "PAYMENT RESPONSE:",
        response.data
      );

      /*
        Your backend should return something like:

        {
          success: true,
          authorization_url: "https://paystack.com/..."
        }
      */

      const paymentUrl =
        response.data?.authorization_url ||
        response.data?.data?.authorization_url ||
        response.data?.authorizationUrl ||
        response.data?.data?.authorizationUrl;

      if (response.data?.success && paymentUrl) {
        // Send user to Paystack
        window.location.href = paymentUrl;
        return;
      }

      alert(
        response.data?.message ||
          "Unable to start payment."
      );
    } catch (err) {
      console.error(
        "PAYMENT ERROR:",
        err.response?.data || err.message
      );

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/dashboard");
        return;
      }

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to start payment."
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  // =====================================================
  // NETWORK CHANGE
  // =====================================================

  const handleNetworkChange = (e) => {
    setNetwork(e.target.value);
    setSelectedPlan(null);
    setSearch("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingPlans) {
    return (
      <div className="data-page">

        <section className="data-content">

          <div className="no-plans">

            <FiDatabase />

            <h3>
              Loading data plans...
            </h3>

            <p>
              Please wait while we get the
              latest plans for you.
            </p>

          </div>

        </section>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="data-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="data-hero">

        <div className="data-hero-content">

          <div className="hero-badge">
            <FiZap />
            Fast & Reliable Data
          </div>

          <h1>
            Buy Data
            <span> Instantly</span>
          </h1>

          <p>
            Get affordable data plans for your phone.
            Choose your network, select a plan and
            stay connected.
          </p>

          <div className="hero-features">

            <div>
              <FiCheck />
              Instant Delivery
            </div>

            <div>
              <FiCheck />
              Affordable Plans
            </div>

            <div>
              <FiCheck />
              Secure Payment
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="data-content">

        {/* =================================================
            PURCHASE PANEL
        ================================================= */}

        <div className="purchase-panel">

          <div className="panel-heading">

            <div className="panel-icon">
              <FiDatabase />
            </div>

            <div>

              <h2>
                Purchase Data
              </h2>

              <p>
                Enter your details and choose a plan.
              </p>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {/* =================================================
              PHONE + NETWORK
          ================================================= */}

          <div className="purchase-fields">

            {/* PHONE */}

            <div className="data-field">

              <label>
                Phone Number
              </label>

              <div className="field-input">

                <FiPhone />

                <input
                  type="tel"
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />

              </div>

            </div>

            {/* NETWORK */}

            <div className="data-field">

              <label>
                Network
              </label>

              <div className="select-wrapper">

                <select
                  value={network}
                  onChange={handleNetworkChange}
                >

                  <option value="mtn-data">
                    MTN
                  </option>

                  <option value="airtel-data">
                    Airtel
                  </option>

                  <option value="glo-data">
                    Glo
                  </option>

                  <option value="9mobile-data">
                    9mobile
                  </option>

                </select>

                <FiChevronDown />

              </div>

            </div>

          </div>

          {/* =================================================
              SELECTED PLAN
          ================================================= */}

          {selectedPlan && (

            <div className="selected-plan">

              <div>

                <small>
                  Selected Plan
                </small>

                <strong>
                  {selectedPlan.name}
                </strong>

                <span>
                  {selectedPlan.validity ||
                    selectedPlan.type ||
                    "Data Plan"}
                </span>

              </div>

              <strong className="selected-price">

                ₦
                {Number(
                  selectedPlan.variation_amount ||
                    selectedPlan.price ||
                    0
                ).toLocaleString()}

              </strong>

            </div>

          )}

          {/* =================================================
              PAYMENT BUTTON
          ================================================= */}

          <button
            className="purchase-button"
            onClick={handlePurchase}
            disabled={
              purchaseLoading ||
              !selectedPlan
            }
          >

            {purchaseLoading
              ? "Starting Payment..."
              : "Continue to Payment"}

            {!purchaseLoading && (
              <FiArrowRight />
            )}

          </button>

          <div className="secure-message">

            <FiShield />

            Your transaction is secure and protected.

          </div>

        </div>

        {/* =================================================
            PLANS
        ================================================= */}

        <div className="plans-section">

          <div className="plans-header">

            <div>

              <span>
                AVAILABLE PLANS
              </span>

              <h2>
                Choose a Data Plan
              </h2>

              <p>
                Select the plan that works best for you.
              </p>

            </div>

            {/* SEARCH */}

            <div className="search-box">

              <FiSearch />

              <input
                type="text"
                placeholder="Search plans..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* =================================================
              PLAN GRID
          ================================================= */}

          <div className="plans-grid">

            {filteredPlans.length > 0 ? (

              filteredPlans.map((plan) => {

                const planId =
                  plan.variation_code ||
                  plan.planId;

                const price = Number(
                  plan.variation_amount ||
                    plan.price ||
                    0
                );

                return (

                  <div
                    className={`plan-card ${
                      selectedPlan &&
                      (
                        selectedPlan.variation_code ||
                        selectedPlan.planId
                      ) === planId
                        ? "selected"
                        : ""
                    }`}
                    key={planId}
                  >

                    {/* TOP */}

                    <div className="plan-card-top">

                      <div className="network-logo">
                        {network
                          .replace("-data", "")
                          .toUpperCase()}
                      </div>

                      <span className="plan-type">

                        {plan.type ||
                          "Data"}

                      </span>

                    </div>

                    {/* INFO */}

                    <div className="plan-info">

                      <h3>
                        {plan.name}
                      </h3>

                      <div className="plan-validity">

                        <FiDatabase />

                        {plan.validity
                          ? `Valid for ${plan.validity}`
                          : "Data Plan"}

                      </div>

                      {/* PLAN CODE */}

                      <small>
                        Plan ID: {planId}
                      </small>

                    </div>

                    {/* BOTTOM */}

                    <div className="plan-bottom">

                      <strong>
                        ₦
                        {price.toLocaleString()}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          handleSelectPlan(plan)
                        }
                      >

                        {selectedPlan &&
                        (
                          selectedPlan.variation_code ||
                          selectedPlan.planId
                        ) === planId
                          ? "Selected"
                          : "Select"}

                        <FiArrowRight />

                      </button>

                    </div>

                  </div>

                );
              })

            ) : (

              <div className="no-plans">

                <FiDatabase />

                <h3>
                  No plans found
                </h3>

                <p>
                  {error ||
                    "There are currently no plans available for this network."}
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Data;