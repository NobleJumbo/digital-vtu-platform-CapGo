const cheapData = require("../services/cheapDataHubService");
const { debitWallet } = require("../services/walletService.js");



const buyAirtime = async (req, res, next) => {
  try {
    const { provider_id, phone_number, amount } = req.body;
    
    if (!provider_id || !phone_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
   
        
        await debitWallet(
          req.user.id,
          amount,
          "airtime",
          `Airtime purchase for ${phone_number}`
        );
        
    console.log("Sending request...");
     console.log({
    provider_id,
    phone_number,
     amount,
    });


    const response = await cheapData.post(
      "/resellers/airtime/purchase/",
      {
        provider_id,
        phone_number,
        amount,
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {
   console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);

  return res.status(500).json({
    success: false,
    error: error.response?.data,
  });

  }
};

const buyData = async (req, res, next) =>{
try{
    const { bundle_id, phone_number, amount} = req.body;
      
    if (!bundle_id || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
   
   
    const response = await cheapData.post(
  "/resellers/data/purchase/",
  {
    bundle_id,
    phone_number,
    amount
  }
);
    await debitWallet(
      req.user.id,
      amount,
      "Data",
      `Data purchase for ${phone_number}`
    );
     console.log("Sending request...");
     console.log({
    bundle_id,
    phone_number,
    amount,
    });



  return res.status(200).json({
      success: true,
      data: response.data,
  });


}catch (error) {
   console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);

  return res.status(500).json({
    success: false,
    error: error.response?.data,
  });

  }

}

module.exports = {
  buyAirtime,
  buyData,
};
