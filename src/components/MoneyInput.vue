<script setup>
import { computed } from 'vue';
import { toCurrency, parseCurrency } from '@/utils/format';

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
    }
});
const emit = defineEmits(['update:modelValue']);
const formatted = computed(() => toCurrency(props.modelValue));

function onInput(e) {
    const value = e.target.value;
    emit('update:modelValue', parseCurrency(value));
}

</script>

<template>
    <input :value="formatted" type="text" step="0.01" @input="onInput" />
</template>

<style scoped></style>