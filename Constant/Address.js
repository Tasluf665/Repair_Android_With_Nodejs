const Address = [
  {
    Barisal: [],
  },
  {
    Chattogram: [],
  },
  {
    Dhaka: [
      {
        Dhaka_North: [
          "Bashundhara R/A",
          "Abul Hotel Bus Stop",
          "Abur Tek Road",
        ],
      },
      {
        Dhaka_South: [],
      },
      {
        Faridpur: [],
      },
      {
        Gazipur: [],
      },
    ],
  },
  {
    Khulna: [],
  },
  {
    Mymensingh: [],
  },
  {
    Rajshahi: [],
  },
  {
    Rangpur: [],
  },
  {
    Sylhet: [],
  },
];

export const getRegion = async () => {
  const response = await fetch(
    "https://member.daraz.com.bd/locationtree/api/getSubAddressList"
  );
  const data = await response.json();
  return data.module;
};

export const getCity = (region) => {
  let tragetRegion = Address.find((item) => Object.keys(item)[0] == region);
  let city = tragetRegion[region].map((item) => Object.keys(item)[0]);
  return city;
};

export const getArea = (region, city) => {
  let tragetRegion = Address.find((item) => Object.keys(item)[0] == region);
  let tragetCity = tragetRegion[region].find(
    (item) => Object.keys(item)[0] == city
  );
  return tragetCity[city];
};
