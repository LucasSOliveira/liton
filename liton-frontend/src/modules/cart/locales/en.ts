const cart = {
  cart: {
    steps: {
      payment: {
        title: "Payment",
        description: "Enter your payment details",
      },
      checkout: {
        title: "Order Completed",
        description: "Confirm your order",
      },
    },
    paymentForm: {
      cardName: "Name on Card",
      cardNumber: "Card Number",
      cardCCV: "CCV",
      cardValidity: "Expiration Date",
      ticketNumber: "Ticket Number",
    },
    errors: {
      cartEmpty: "Your cart is empty",
      cardName: "The card name is required",
      cardNameMax: "The card name must be at most 40 characters",
      cardNumber: "The card number is required",
      cardCCV: "The CCV is required",
      cardValidity: "The expiration date is required",
      cardValidityExpired: "Card expired",
      cardNumberInvalid: "The card number must be 16 digits",
      cardCCVInvalid: "The CCV must be 3 digits",
      cardValidityInvalid: "The expiration date must be in the format MM/YY",
    },
    checkout: {
      empty: {
        title: "Your cart is empty",
        message: "Add books to your cart to complete the order!",
      },
      success: {
        title: "Order completed successfully!",
        message:
          "Your order has been successfully completed, you will receive an email with the details shortly!",
      },
      error: {
        title: "Error completing the order",
        message:
          "Please try again, and if the error persists, contact support!",
      },
    },
    button: {
      finishOrder: "Complete Order",
      continue: "Continue",
      back: "Back",
      toHome: "Go to homepage",
      backList: "Continue shopping",
      showItems: "View items",
    },
  },
};

export default cart;