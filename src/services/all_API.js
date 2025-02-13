import { commonAPI } from "./common_api";
import { server_url } from "./server_url";

// User register
export const registerAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/register`, reqBody, reqHeader);
};

// updateProfile
export const updateProfile = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${server_url}/updateProfile`,
    reqBody,
    reqHeader ? reqHeader : ""
  );
};

// updateFood
export const updateFood = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${server_url}/updateFood`,
    reqBody,
    reqHeader ? reqHeader : ""
  );
};

// updateFood
export const deleteAfood = async (FoodId) => {
  return await commonAPI("DELETE", `${server_url}/deleteFood`, FoodId, "");
};
// updateMess
export const updateMess = async (reqBody, reqHeader) => {
  console.log("updateFood reqBody", reqBody);
  return await commonAPI(
    "POST",
    `${server_url}/updateMess`,
    reqBody,
    reqHeader ? reqHeader : ""
  );
};

// User addNewFood
export const addNewFood = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/add-food`, reqBody, reqHeader);
};
// User Login
export const loginApi = async (user) => {
  return await commonAPI("POST", `${server_url}/login`, user, "");
};

// getUserData
export const getUserData = async (userId) => {
  return await commonAPI("POST", `${server_url}/get-user`, userId, "");
};
// getMessData
export const getMessData = async (messId) => {
  return await commonAPI("POST", `${server_url}/get-mess`, messId, "");
};
// getFoodData
export const getFoodData = async (foodId) => {
  return await commonAPI("POST", `${server_url}/get-food`, foodId, "");
};
// getSubScriptionDetails
export const fetchSubDetails = async (id) => {
  return await commonAPI("GET", `${server_url}/get-subDetails/${id}`, "", "");
};

// send day extending request
export const sendRequest = async (extensionRequest) => {
  return await commonAPI("POST", `${server_url}/extend-request`, extensionRequest, "");
};


// getAllOrders
export const getAllOrders = async () => {
  return await commonAPI("GET", `${server_url}/get-all-orders`, "", "");
};
// updateOrderStatus
export const updateOrderStatus = async (reqBody) => {
  return await commonAPI(
    "PUT",
    `${server_url}/update-delivery-status`,
    reqBody,
    ""
  );
};
// getOrderDetails
export const getOrderDetails = async (orderId) => {
  return await commonAPI("GET", `${server_url}/order/${orderId}`, "", "");
};
// updateWeeklyMenu
export const updateWeeklyMenu = async (newMenu) => {
  return await commonAPI("PUT", `${server_url}/update-menu`, newMenu, "");
};
// updateSubscriptionPlans
export const updateSubscriptionPlans = async (newPlans) => {
  return await commonAPI("PUT", `${server_url}/update-plans`, newPlans, "");
};

// Mess register
export const messRegistrationAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${server_url}/mess-register `,
    reqBody,
    reqHeader
  );
};

// Mess Login
export const messLoginAPI = async (mess) => {
  return await commonAPI("POST", `${server_url}/mess-login `, mess, "");
};

// Add Menu of A Mess
export const addMenu = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/edit-menu`, reqBody, reqHeader);
};

// Get Mess Deatails of Owner
export const getMessDetails = async (messId) => {
  return await commonAPI("POST", `${server_url}/get-mes`, messId, "");
};

// GEt ALLMESS DETAILS
export const getAllMesses = async () => {
  return await commonAPI("GET", `${server_url}/get-all-mess`, "", "");
};
// GEt USERS DETAILS
export const getAllUsers = async () => {
  return await commonAPI("GET", `${server_url}/get-all-user`, "", "");
};
// ==========================
// GEt ALL FOODS
export const getAllFoods = async () => {
  return await commonAPI("GET", `${server_url}/get-all-foods`, "", "");
};

// AddToCart
export const AddToCart = async (reqBody) => {
  return await commonAPI("PUT", `${server_url}/add-to-cart`, reqBody, "");
};
// updateCart
export const updateCart = async (reqBody) => {
  return await commonAPI("PUT", `${server_url}/update-cart`, reqBody, "");
};

// PlaceOrder
export const placeOrder = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/place-order`, reqBody, "");
};

// addComment
export const addComment = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/add-comment`, reqBody, "");
};
// getAllComment
export const getAllComment = async (messId) => {
  return await commonAPI("POST", `${server_url}/get-comments`, messId, "");
};
// getUserOrders
export const getUserOrders = async (userId) => {
  return await commonAPI("POST", `${server_url}/getUserOrders`, userId, "");
};

// getUserSubscriptions
export const getUserSubscriptions = async (userId) => {
  return await commonAPI(
    "POST",
    `${server_url}/getUserSubscriptions`,
    userId,
    ""
  );
};
// getMessCustomers
export const getMessCustomers = async (messId) => {
  return await commonAPI("POST", `${server_url}/getMessCustomers`, messId, "");
};
// approveRequest
export const approveOrRejectRequest = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/approveOrRejectRequest`, reqBody, "");
};

// getUserSubscriptions
export const deleteLastSub = async () => {
  return await commonAPI("GET", `${server_url}/cancelSub`, "", "");
};

//Delete Menu  by MEss Owner
export const deleteMenu = async (messId) => {
  return await commonAPI("DELETE", `${server_url}/delete-mess`, messId, "");
};

export const subcriptionFunction = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/checkout`, reqBody, "");
};

export const verifyStripe = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/verifyStripe`, reqBody, "");
};

export const clearCurrentPlan = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/clearCurrentPlan`, reqBody, "");
};
