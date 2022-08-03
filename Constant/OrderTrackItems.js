import Colors from "./Colors";

export const OrderTrackData = [
  {
    label: "Order Accepted",
    status: "Your order has been accepted",
    date: "Sat, 10 Sep 2021, 03.30 PM",
  },
  {
    label: "Ready To Pickup",
    status: "Your order is ready to pickup",
    date: "Sat, 10 Sep 2021, 03.30 PM",
  },
  {
    label: "Order Shiped",
    status: "Your order has been shiped",
    date: "Sat, 10 Sep 2021, 03.30 PM",
  },
  {
    label: "Order Delivered",
    status: "Your order is order delibared",
    date: "Sat, 10 Sep 2021, 03.30 PM",
  },
  {
    label: "Order Delivered",
    status: "Your order is order delibared",
    date: "Sat, 10 Sep 2021, 03.30 PM",
  },
];

export const OrderTrackLabels = [
  "Cart",
  "Delivery Address",
  "Order Summary",
  "Payment Method",
  "Track",
];

export const OrderTrackCustomStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.Secondary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Colors.Secondary,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: Colors.Secondary,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: Colors.Secondary,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.Secondary,
  stepIndicatorLabelFinishedColor: Colors.Primary_Helper,
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: Colors.Secondary,
};
