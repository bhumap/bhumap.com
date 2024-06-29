"use server"
import axios from "axios";
import queryString from "query-string";

async function SmsSend(receiverPhone, otp) {
  const apiEndpoint = "https://www.fast2sms.com/dev/bulkV2";

  const params = {
    authorization: process.env.FAST2SMS_API_KEY,
    variables_values: otp,
    message:165837,
    route:"dlt",
    numbers:receiverPhone,
    sender_id:"BHUMAP"
  };

  // Making the API request using axios
  try {
    var res = await axios.get(`${apiEndpoint}?${queryString.stringify(params)}`)
    return res;
  } catch (error) {
    return error
  }
}

export default SmsSend;
