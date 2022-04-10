interface IApi {
  url: string;
  method: string;
}

// Proxying the given API: https://cdn.sixt.io/codingtask/offers.json to this endpoint https://oga6zk34gl.execute-api.ap-south-1.amazonaws.com/dev/offers
// becuase of CORS error from UI side.

export const apis = {
  GET_OFFERS: {
    url: "https://oga6zk34gl.execute-api.ap-south-1.amazonaws.com/dev/offers",
    method: "GET",
  } as IApi,
};
