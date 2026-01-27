import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});
app.component('Button', Button);
app.mount('#app');
