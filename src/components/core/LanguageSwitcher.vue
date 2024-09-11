<template>
  <button class="whitespace-nowrap px-4 py-2.5 rounded-full bg-stone-900 text-stone-50 hover:bg-stone-700 transition-colors ease-in-out duration-300 " @click="toggleLocale">{{ buttonText }}</button>
</template>

<script>
import { setLocale } from '../../utils/locale';

export default {
  computed: {
    buttonText() {
      return this.$i18n.locale === 'en' ? '中文' : 'EN';
    }
  },
  methods: {
    toggleLocale() {
      const newLocale = this.$i18n.locale === 'en' ? 'zh' : 'en';
      this.$i18n.locale = newLocale;
      setLocale(newLocale);
    }
  }
};
</script>