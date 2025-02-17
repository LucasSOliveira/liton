import auth from '@/locales/commum/auth';
import messages from '@/locales/commum/messages';
import logo from '@/locales/commum/logo';
import books from '@/modules/books/locales';
import cart from '@/modules/cart/locales';
import layouts from '@/locales/commum/layouts';
import Orders from '@/modules/orders/locales';

const commum = {
    'pt-BR': {
        logo: logo['pt-BR'],
        ...messages['pt-BR'],
        ...auth['pt-BR'],
        ...books['pt-BR'],
        ...layouts['pt-BR'],
        ...cart['pt-BR'],
        ...Orders['pt-BR'],
    },
    'es': {
        logo: logo['es'],
        ...messages['es'],
        ...auth['es'],
        ...books['es'],
        ...layouts['es'],
        ...cart['es'],
        ...Orders['es'],
    },
    'en': {
        logo: logo['en'],
        ...messages['en'],
        ...auth['en'],
        ...books['en'],
        ...layouts['en'],
        ...cart['en'],
        ...Orders['en'],
    },
};

export default commum;