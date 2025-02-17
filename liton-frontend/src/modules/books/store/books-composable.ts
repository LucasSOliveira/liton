import { ref, reactive, watch } from "vue";
import { fetchBooks } from "@/modules/books/services/books-service";
import { useLocaleStore } from "@/store/locale-store";
import type { Book } from "@/types/books-type";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateRange } from "radix-vue";
import { formatPeriodToString } from "@/utils";
import { CalendarDate } from "@internationalized/date";

const start = today(getLocalTimeZone());
const end = start.add({ days: 7 });
const localeStore = useLocaleStore();

const state = reactive({
  books: [] as Book[],
  search: "",
  categories: [],
  category: "",
  openBookModal: false,
  loading: false,
  page: 1,
  limit: 18,
  hasMore: true,
  bookOrder: {
    productId: 0,
    product: {} as Book,
    startRental: start,
    endRental: end,
    period: '',
    rentalValue: 0,
    unitValue: 0,
  },
  period: {
    start: undefined,
    end: undefined,
  } as DateRange
});

function calculateRentalValue() {
  const startDate = new Date(state.period.start as any);
  const endDate = new Date(state.period.end as any);
  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days * state.bookOrder.unitValue || 0;
}

function resetPeriod() {
  const startDate = today(getLocalTimeZone());
  const endDate = startDate.add({ days: 7 });
  state.period = { start: startDate, end: endDate };
  state.bookOrder.startRental = startDate;
  state.bookOrder.endRental = endDate;
  state.bookOrder.period = formatPeriodToString(startDate, endDate);
}

function setPeriod(period: DateRange | null = null) {
  if (!period) {
    resetPeriod();
  } else {
    state.period = period;
    state.bookOrder.startRental = period.start as CalendarDate;
    state.bookOrder.endRental = period.end as CalendarDate;
    state.bookOrder.rentalValue = calculateRentalValue();
    state.bookOrder.period = period.start && period.end
      ? formatPeriodToString(period.start, period.end)
      : '-';
  }
}

function setBookOrderData(book: Book | null) {
  setPeriod();
  state.bookOrder.product = book || {} as Book;
  state.bookOrder.productId = book ? book.id : 0;
  state.bookOrder.unitValue = book ? book.rentalValue || 0 : 0;
  state.bookOrder.rentalValue = calculateRentalValue() || 0;
}

function handlerBookModal(book: Book | null = null) {
  if (state.openBookModal) {
    setBookOrderData(null);
    state.openBookModal = false;
  } else {
    setBookOrderData(book);
    state.openBookModal = true;
  }
}

function getBooks(isLoadMore = false) {
  if (!isLoadMore) {
    state.page = 1;
    state.books = [];
    state.hasMore = true;
  }
  state.loading = true;

  fetchBooks(
    state.search,
    state.page,
    state.limit,
    "title",
    "ASC",
    localeStore.state.currentLocale
  )
    .then((books: any) => {
      if (books.data.length < state.limit) {
        state.hasMore = false;
      }
      if (isLoadMore) {
        state.books.push(...books.data);
      } else {
        state.books = books.data;
      }
    })
    .finally(() => {
      state.loading = false;
    });
}

function loadMoreBooks() {
  if (state.loading || !state.hasMore) return;
  state.page++;
  getBooks(true);
}

const debounceTimer = ref(0);
watch(
  () => state.search,
  () => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value);
    }
    state.loading = true;
    debounceTimer.value = setTimeout(() => {
      getBooks();
    }, 3000);
  }
);

export const useBooks = () => ({
  state,
  getBooks,
  loadMoreBooks,
  setPeriod,
  setBookOrderData,
  handlerBookModal,
});