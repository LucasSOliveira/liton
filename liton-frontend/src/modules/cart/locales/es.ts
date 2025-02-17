const cart = {
    cart: {
        steps: {
            payment: {
                title: "Pago",
                description: "Introduce los datos de pago",
            },
            checkout: {
                title: "Pedido finalizado",
                description: "Confirma tu pedido",
            },
        },
        paymentForm: {
            cardName: "Nombre en la tarjeta",
            cardNumber: "Número de tarjeta",
            cardCCV: "CCV",
            cardValidity: "Vencimiento",
            ticketNumber: "Número del boleto",
        },
        errors: {
            cartEmpty: "Tu carrito está vacío",
            cardName: "El nombre de la tarjeta es obligatorio",
            cardNameMax: "El nombre de la tarjeta debe tener un máximo de 40 caracteres",
            cardNumber: "El número de la tarjeta es obligatorio",
            cardCCV: "El CCV es obligatorio",
            cardValidity: "La fecha de vencimiento es obligatoria",
            cardValidityExpired: "Tarjeta expirada",
            cardNumberInvalid: "El número de la tarjeta debe contener 16 dígitos",
            cardCCVInvalid: "El CCV debe contener 3 dígitos",
            cardValidityInvalid: "El vencimiento debe estar en el formato MM/AA",
        },
        checkout: {
            empty: {
                title: "Tu carrito está vacío",
                message: "Agrega libros a tu carrito para finalizar el pedido!",
            },
            success: {
                title: "¡Pedido completado con éxito!",
                message: "Tu pedido se completó con éxito, recibirás un correo electrónico con la información y en breve tu pedido llegará!",
            },
            error: {
                title: "Error al completar el pedido",
                message: "Inténtalo de nuevo y, si el error persiste, contacta con el soporte!",
            },
        },
        button: {
            finishOrder: "Finalizar pedido",
            continue: "Continuar",
            back: "Volver",
            toHome: "Ir a la página principal",
            backList: "Continuar comprando",
            showItems: "Ver artículos",
        },
    },
};

export default cart;