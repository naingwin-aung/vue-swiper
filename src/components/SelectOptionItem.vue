<script setup>
import { ref } from "vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { Plus } from "lucide-vue-next";
import { Minus } from "lucide-vue-next";
import SmallImageGallery from "./SmallImageGallery.vue";
import { DatePicker } from "primevue";
import moment from "moment";

const activeValue = ref(null);

const minDate = ref(new Date("2026-01-27"));
const maxDate = ref(new Date("2026-03-28"));
const closingDates = ref([
  new Date("2026-02-10"),
  new Date("2026-02-11"),
  new Date("2026-02-12"),
  new Date("2026-02-15"),
]);
const date = ref(new Date());

const galleries = [
  {
    url: "https://i.pinimg.com/1200x/8d/a2/33/8da23335dace52844ff1840c279c7a14.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/c9/26/54/c92654f51926c675ea63f5ba4460941c.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/bf/16/7d/bf167d3a3222136882cc9e41ab2ee2f1.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/ba/6d/ae/ba6dae4d15b45507809b8d242a5c1c88.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/3d/e9/9d/3de99dec949b4336e6d0304d1f191459.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/8d/a2/33/8da23335dace52844ff1840c279c7a14.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/c9/26/54/c92654f51926c675ea63f5ba4460941c.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/bf/16/7d/bf167d3a3222136882cc9e41ab2ee2f1.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/ba/6d/ae/ba6dae4d15b45507809b8d242a5c1c88.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/3d/e9/9d/3de99dec949b4336e6d0304d1f191459.jpg",
  },
];
</script>
<template>
  <div class="w-full mb-6">
    <Accordion
      v-model:value="activeValue"
      class="w-full border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 p-0"
      expandIcon="pi pi-plus"
      collapseIcon="pi pi-minus"
    >
      <AccordionPanel value="item-1" class="p-0">
        <AccordionHeader class="p-0">
          <div class="flex flex-col md:flex-row w-full h-auto md:h-52.5">
            <div class="w-full md:w-1/4 h-62.5 md:h-full">
              <SmallImageGallery :images="galleries" />
            </div>
            <div class="w-full md:w-3/4 h-full ps-5">
              <div class="flex items-center justify-between mb-3">
                <h3
                  class="text-xl font-medium line-clamp-1 text-left text-gray-900"
                >
                  Luxury cruise boat
                </h3>

                <div
                  class="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
                >
                  <ChevronUp v-if="activeValue === 'item-1'" size="30" />
                  <ChevronDown v-else size="30" />
                </div>
              </div>

              <div
                class="w-full mb-8 text-left overflow-hidden font-normal line-clamp-3"
              >
                Experience the beauty of the ocean aboard Sea Majesty Boat,
                where calm waves meet elegant comfort. Enjoy panoramic sea
                views, gentle ocean breezes, and a peaceful atmosphere perfect
                for couples, families, or small groups seeking relaxation and
                luxury on the water.
              </div>

              <div class="flex items-center justify-between">
                <div class="">
                  <span class="font-normal me-1 text-lg">From</span>
                  <span class="text-xl font-medium text-black">THB 999</span>
                </div>
                <div>
                  <button
                    class="px-4.5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div class="flex items-start justify-between mb-5 mt-5">
            <div class="flex flex-col gap-4">
              <div class="text-lg font-semibold text-black">Select Zone(s)</div>
              <div class="text-gray-600">Please select your preferred zone</div>
              <button
                class="w-fit px-8 py-2 rounded-lg border border-orange-400 text-orange-500 font-medium"
              >
                Rooftop zone
              </button>
            </div>
            <div class="font-medium underline text-gray-600">Clear all</div>
          </div>

          <div class="flex gap-5">
            <div class="w-1/3 h-72.5 bg-gray-200 rounded-xl overflow-hidden">
              <SmallImageGallery :images="galleries" />
            </div>
            <div class="w-2/3">
              <div class="mb-5">
                <div class="text-gray-700 text-sm mb-2.5">
                  Please select a participation date
                  <!-- {{ moment(date).format("yyyy-MM-DD") }} -->
                </div>
                <div
                  class="ps-4 py-2 border border-orange-500 rounded-lg w-fit"
                >
                  <div class="text-orange-600 text-sm mb-0.5">Select date</div>
                  <DatePicker
                    v-model="date"
                    class="w-full text-orange-500"
                    dateFormat="dd M yy"
                    :minDate="minDate"
                    :maxDate="maxDate"
                    :disabledDates="closingDates"
                  />
                </div>
              </div>

              <div class="mb-5">
                <div class="text-gray-700 text-sm mb-2.5">Select time</div>
                <div class="flex gap-4">
                  <div
                    class="px-5 py-2 border border-orange-500 rounded-lg w-fit"
                  >
                    <span class="text-orange-600 text-sm font-medium"
                      >17:00 - 18:45</span
                    >
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <div class="text-gray-700 text-sm mb-2.5">Select ticket</div>
                <div class="flex gap-4">
                  <div
                    class="px-5 py-2 border border-orange-500 rounded-lg w-fit"
                  >
                    <span class="text-orange-600 text-sm font-medium"
                      >Sunset cruise</span
                    >
                  </div>
                  <div
                    class="px-5 py-2 border border-gray-400 rounded-lg w-fit"
                  >
                    <span class="text-gray-800 text-sm font-medium"
                      >Dinner cruise</span
                    >
                  </div>
                </div>
              </div>

              <div class="mb-7">
                <div class="text-gray-700 text-sm mb-2.5">Quantity</div>
                <div class="w-full p-5 border border-gray-200 rounded-lg mb-4">
                  <div class="flex items-center justify-between">
                    <div class="font-medium text-gray-800">Adult</div>
                    <div class="flex items-center gap-4">
                      <button
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                      >
                        <Minus size="14" />
                      </button>
                      <div class="font-medium text-gray-800">1</div>
                      <button
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                      >
                        <Plus size="14" />
                      </button>
                    </div>
                  </div>
                </div>

                <div class="w-full p-5 border border-gray-200 rounded-lg mb-4">
                  <div class="flex items-center justify-between">
                    <div class="font-medium text-gray-800">Child</div>
                    <div class="flex items-center gap-4">
                      <button
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                      >
                        <Minus size="14" />
                      </button>
                      <div class="font-medium text-gray-800">1</div>
                      <button
                        class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                      >
                        <Plus size="14" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl font-medium mb-2 text-black">
                      THB -
                    </div>
                    <div class="text-xs font-medium text-gray-500">
                      Complete all required fields to continue
                    </div>
                  </div>
                  <div>
                    <button
                      class="px-5 py-3 text-white bg-orange-500 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
