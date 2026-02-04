<script setup>
import { ref, computed, watch } from "vue";
import moment from "moment";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-vue-next";

// Current selected month
const currentDate = ref(moment());

// Bookings data fetched from API
const bookings = ref([]);
const isLoading = ref(false);

// Mock API fetch function - replace with your actual API call
const fetchBookingsForMonth = async (year, month) => {
  isLoading.value = true;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Mock data - replace with actual API call
  // Example: const response = await fetch(`/api/bookings?year=${year}&month=${month}`);
  // bookings.value = await response.json();

  const mockBookings = [
    {
      id: 1,
      date: `${year}-${String(month).padStart(2, "0")}-05`,
      title: "Room A Booking",
      guest: "John Doe",
    },
    {
      id: 2,
      date: `${year}-${String(month).padStart(2, "0")}-05`,
      title: "Room B Booking",
      guest: "Jane Smith",
    },
    {
      id: 3,
      date: `${year}-${String(month).padStart(2, "0")}-05`,
      title: "Room C Booking",
      guest: "Bob Wilson",
    },
    {
      id: 4,
      date: `${year}-${String(month).padStart(2, "0")}-12`,
      title: "Conference Room",
      guest: "Alice Brown",
    },
    {
      id: 5,
      date: `${year}-${String(month).padStart(2, "0")}-12`,
      title: "Suite Booking",
      guest: "Charlie Davis",
    },
    {
      id: 6,
      date: `${year}-${String(month).padStart(2, "0")}-18`,
      title: "Deluxe Room",
      guest: "Eve Johnson",
    },
    {
      id: 7,
      date: `${year}-${String(month).padStart(2, "0")}-22`,
      title: "Standard Room",
      guest: "Frank Miller",
    },
    {
      id: 8,
      date: `${year}-${String(month).padStart(2, "0")}-22`,
      title: "Twin Room",
      guest: "Grace Lee",
    },
    {
      id: 9,
      date: `${year}-${String(month).padStart(2, "0")}-22`,
      title: "Family Suite",
      guest: "Henry Wang",
    },
    {
      id: 10,
      date: `${year}-${String(month).padStart(2, "0")}-22`,
      title: "Penthouse",
      guest: "Ivy Chen",
    },
    {
      id: 11,
      date: `${year}-${String(month).padStart(2, "0")}-28`,
      title: "Beach Villa",
      guest: "Jack Taylor",
    },
  ];

  bookings.value = mockBookings;
  isLoading.value = false;
};

const getBookingsForDate = (date) => {
  const dateStr = date.format("YYYY-MM-DD");
  return bookings.value.filter((booking) => booking.date === dateStr);
};

const calendarDays = computed(() => {
  const startOfMonth = currentDate.value.clone().startOf("month");
  const endOfMonth = currentDate.value.clone().endOf("month");

  const startOfCalendar = startOfMonth.clone().startOf("week");
  const endOfCalendar = endOfMonth.clone().endOf("week");

  const days = [];
  const day = startOfCalendar.clone();

  while (day.isSameOrBefore(endOfCalendar, "day")) {
    days.push({
      date: day.clone(),
      isCurrentMonth: day.month() === currentDate.value.month(),
      isToday: day.isSame(moment(), "day"),
      bookings: getBookingsForDate(day),
    });
    day.add(1, "day");
  }

  return days;
});

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const previousMonth = () => {
  currentDate.value = currentDate.value.clone().subtract(1, "month");
};

const nextMonth = () => {
  currentDate.value = currentDate.value.clone().add(1, "month");
};

const goToToday = () => {
  currentDate.value = moment();
};

const selectedDay = ref(null);

const selectDay = (day) => {
  if (day.bookings.length > 0) {
    selectedDay.value = day;
  }
};

const closeDetail = () => {
  selectedDay.value = null;
};

watch(
  () => currentDate.value.format("YYYY-MM"),
  (newVal) => {
    const [year, month] = newVal.split("-");
    fetchBookingsForMonth(parseInt(year), parseInt(month));
  },
  { immediate: true },
);

const getBookingCountClass = (count) => {
  if (count === 0) return "";
  if (count <= 2) return "bg-green-100 text-green-800";
  if (count <= 4) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Calendar class="w-6 h-6 text-white" />
            <h2 class="text-xl font-bold text-white">
              {{ currentDate.format("MMMM YYYY") }}
            </h2>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="goToToday"
              class="px-3 py-1.5 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
            >
              Today
            </button>
            <button
              @click="previousMonth"
              class="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>
            <button
              @click="nextMonth"
              class="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white/50 flex items-center justify-center z-10"
      >
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
      </div>

      <div class="grid grid-cols-7 bg-gray-50 border-b border-b-gray-300">
        <div
          v-for="day in weekDays"
          :key="day"
          class="px-2 py-3 text-center text-sm font-semibold text-gray-600"
        >
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 relative">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          @click="selectDay(day)"
          class="min-h-40 p-2 border-b border-r border-gray-100 transition-colors"
          :class="[
            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
            day.isToday ? 'ring-2 ring-inset ring-blue-500' : '',
            day.bookings.length > 0 ? 'cursor-pointer hover:bg-blue-50' : '',
          ]"
        >
          <div class="flex items-start justify-between">
            <span
              class="inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full"
              :class="[
                day.isToday ? 'bg-blue-600 text-white' : '',
                !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-700',
              ]"
            >
              {{ day.date.date() }}
            </span>

            <span
              v-if="day.bookings.length > 0"
              class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold rounded-full"
              :class="getBookingCountClass(day.bookings.length)"
            >
              {{ day.bookings.length }}
            </span>
          </div>

          <div
            v-if="day.bookings.length > 0 && day.isCurrentMonth"
            class="mt-1 space-y-1"
          >
            <div
              v-for="booking in day.bookings.slice(0, 2)"
              :key="booking.id"
              class="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded truncate"
            >
              {{ booking.title }}
            </div>
            <div
              v-if="day.bookings.length > 2"
              class="text-xs text-gray-500 pl-1"
            >
              +{{ day.bookings.length - 2 }} more
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="modal">
      <div
        v-if="selectedDay"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/50" @click="closeDetail"></div>

        <div
          class="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
        >
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-white">
                {{ selectedDay.date.format("dddd, MMMM D, YYYY") }}
              </h3>
              <button
                @click="closeDetail"
                class="p-1 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p class="text-blue-100 text-sm mt-1">
              {{ selectedDay.bookings.length }} booking{{
                selectedDay.bookings.length !== 1 ? "s" : ""
              }}
            </p>
          </div>

          <div class="p-4 overflow-y-scroll max-h-[calc(80vh-72px)]">
            <div class="space-y-3">
              <div
                v-for="booking in selectedDay.bookings"
                :key="booking.id"
                class="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <h4 class="font-semibold text-gray-800">{{ booking.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">
                  Guest: {{ booking.guest }}
                </p>
              </div>

              <div
                v-for="booking in selectedDay.bookings"
                :key="booking.id"
                class="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <h4 class="font-semibold text-gray-800">{{ booking.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">
                  Guest: {{ booking.guest }}
                </p>
              </div>

              <div
                v-for="booking in selectedDay.bookings"
                :key="booking.id"
                class="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <h4 class="font-semibold text-gray-800">{{ booking.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">
                  Guest: {{ booking.guest }}
                </p>
              </div>

              <div
                v-for="booking in selectedDay.bookings"
                :key="booking.id"
                class="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <h4 class="font-semibold text-gray-800">{{ booking.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">
                  Guest: {{ booking.guest }}
                </p>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
