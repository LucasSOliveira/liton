const cart = {
  cart: {
    steps: {
      payment: {
        title: "Pagamento",
        description: "Adicione as informações de pagamento",
      },
      checkout: {
        title: "Pedido finalizado",
        description: "Confirme seu pedido",
      },
    },
    paymentForm: {
      cardName: "Nome no cartão",
      cardNumber: "Número do cartão",
      cardCCV: "CCV",
      cardValidity: "Validade",
      ticketNumber: "Número do boleto",
    },
    errors: {
      cartEmpty: "Seu carrinho está vazio",
      cardName: "O nome do cartão é obrigatório",
      cardNameMax: "O nome do cartão deve ter no máximo 40 caracteres",
      cardNumber: "O número do cartão é obrigatório",
      cardCCV: "O CCV é obrigatório",
      cardValidity: "A validade é obrigatória",
      cardValidityExpired: "Cartão expirado",
      cardNumberInvalid: "O número do cartão deve conter 16 dígitos",
      cardCCVInvalid: "O CCV deve conter 3 dígitos",
      cardValidityInvalid: "A validade deve estar no formato MM/AA",
    },
    checkout: {
      empty: {
        title: "Seu carrinho está vazio",
        message: "Adicione livros ao seu carrinho para finalizar o pedido!",
      },
      success: {
        title: "Pedido finalizado com sucesso!",
        message:
          "Seu pedido foi finalizado com sucesso, você receberá um email com as informações e em breve seu pedido!",
      },
      error: {
        title: "Erro ao finalizar o pedido",
        message:
          "Tente novamente e caso o erro persista entre em contato com o suporte!",
      },
    },
    button: {
      finishOrder: "Finalizar pedido",
      continue: "Continuar",
      back: "Voltar",
      toHome: "Ir para a página inicial",
      backList: "Continuar comprando",
      showItems: "Ver itens",
    },
  },
};

export default cart;
