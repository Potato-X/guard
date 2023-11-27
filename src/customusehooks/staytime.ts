import {ref } from 'vue';

export function useStayTime() {
  const time = ref(0);
  const hours = ref('0');
  const minites = ref('0');
  const seconds = ref('0');
  setInterval(() => {
    time.value++;
    hours.value = Math.floor(time.value / 3600)
      .toString()
      .padStart(2, '0');
    minites.value = Math.floor((time.value % 3600) / 60)
      .toString()
      .padStart(2, '0');
    seconds.value = Math.floor((time.value % 3600) % 60)
      .toString()
      .padStart(2, '0');
  }, 1000);
  return {
    hours,
    minites,
    seconds,
  };
}
