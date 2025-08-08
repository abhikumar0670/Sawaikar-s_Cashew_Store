const FormatPrice = ({price}) => {
  // Handle undefined/null prices
  if (!price && price !== 0) {
    return "₹0.00";
  }

  // Convert price - assuming price is already in rupees format
  // If your API returns 800 for ₹800, don't divide by 100
  // If your API returns 80000 for ₹800, divide by 100
  
  // For now, let's assume prices are already in correct rupee format
  // If this doesn't work, we'll adjust based on your data
  return (
    Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price)
  );
};

export default FormatPrice;
