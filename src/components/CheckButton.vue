<script setup>
import { computed } from "vue";

const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md'
    }
});

const sizes = {
    'md': 25,
    'lg': 50,
}

const buttonStyle = computed(() => {
    return {
        width: sizes[props.size] + 'px',
        height: sizes[props.size] + 'px',
    }
});
</script>

<template>
    <button :style="buttonStyle" class="check-button" :class="{ 'check-button--checked': checked }">
        <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.91007 19.6783L2.22825 12.2304L0.000976562 14.713L8.91007 24.6436L28.001 3.36383L25.7737 0.881195L8.91007 19.6783Z"
                fill="white" />
        </svg>
    </button>
</template>

<style scoped>
.check-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 50px;
    border: 1px solid #DFE3E6;
    cursor: pointer;
}

.check-button--checked {
    background-color: black;
    border: none;
}
</style>