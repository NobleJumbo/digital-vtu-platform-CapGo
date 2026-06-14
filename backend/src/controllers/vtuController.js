// const { debitWallet } = require("../services/walletService");

// const buyAirtime = async (req, res, next) => {
//   try {
//     const { amount, phone, network } = req.body;

//     if (!amount || !phone || !network) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const wallet = await debitWallet(
//       req.user.id,
//       amount,
//       "airtime",
//       `Airtime purchase for ${phone}`
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Airtime purchased successfully (simulated)",
//       wallet,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   buyAirtime,
// };

const vtpass = require("../services/vtpassService.js");
const { debitWallet } = require("../services/walletService.js");

// const buyData = async (req, res, next) => {
//   try {
//     const { phone,network,variation_code, amount,} = req.body;

//     if (!phone ||!network ||!variation_code ||!amount) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Debit wallet first
//     await debitWallet(req.user.id,amount,"data",
//       `Data purchase for ${phone}`
//     );

//     // VTpass request
//     const response = await vtpass.get("/plan",
//     {
//       request_id: Date.now().toString(),
//       serviceID: network,
//       billersCode: phone,
//       variation_code,
//       amount,
//       phone,
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Data purchased successfully",
//       data: response.data,
//     });

//   } catch (error) {
//     // console.log(error.response?.data);
// console.log(
//   "VTpass Error:",
//   error.response?.status,
//   error.response?.data
// );
//     next(error);
//   }
// };

// module.exports = {
//   buyData,
// };

const getDataPlans = async (req, res, next) => {
  try {
    const { network } = req.params;

    const response = await vtpass.get(
      `/service-variations?serviceID=${network}`
    );

    return res.status(200).json({
      success: true,
      plans: response.data.content.variations,
    });
  } catch (error) {
    next(error);
  }
};

const buyData = async (req, res, next) => {
  try {
    const {
      phone,
      network,
      variation_code,
    } = req.body;

    if (
      !phone ||
      !network ||
      !variation_code
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Get plans from VTpass
    const plansResponse = await vtpass.get(
      `/service-variations?serviceID=${network}`
    );

    const plans =
      plansResponse.data.content.variations;

    // Find selected plan
    const selectedPlan = plans.find(
      (plan) =>
        plan.variation_code === variation_code
    );

    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid data plan selected",
      });
    }

    // Get amount from VTpass
    const amount = Number(
      selectedPlan.variation_amount
    );

    // Debit wallet
    await debitWallet(
      req.user.id,
      amount,
      "data",
      `Data purchase for ${phone}`
    );

    // Purchase data
    const purchaseResponse = await vtpass.post(
      "/pay",
      {
        request_id: Date.now().toString(),
        serviceID: network,
        billersCode: phone,
        variation_code,
        amount,
        phone,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Data purchased successfully",
      transaction:
        purchaseResponse.data,
    });

  } catch (error) {
    console.log(
      "VTpass Error:",
      error.response?.data || error.message
    );

    next(error);
  }
};


module.exports = {
  getDataPlans,
  buyData,
};