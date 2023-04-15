<script setup>
import CheckButton from '@/components/CheckButton.vue';
import { toCurrency } from '@/utils/format';

const props = defineProps({
    tax: {
        type: Object,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['select']);

function onCheck() {
    emit('select', !props.selected);
}
</script>

<template>
    <div class="root" :class="{ 'root--selected': selected }">
        <div class="row">
            <check-button :checked="selected" @click="onCheck" />
            <div class="description">
                <span class="description__name">{{ tax.name }}</span>
                <br>
                <span class="description__text">{{ tax.text }}</span>
            </div>
        </div>
        <div v-if="selected" style="margin-top: auto" class="row">
            <span class="description__name">{{ toCurrency(value) }}</span>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.5 24.5C5.87258 24.5 0.5 19.1274 0.5 12.5C0.5 5.87258 5.87258 0.5 12.5 0.5C19.1274 0.5 24.5 5.87258 24.5 12.5C24.5 19.1274 19.1274 24.5 12.5 24.5Z"
                    fill="white" stroke="#DFE3E6" />
                <path d="M11.68 21V9H13.84V21H11.68ZM11.68 7.32V4.68H13.84V7.32H11.68Z" fill="#DFE3E6" />
            </svg>
        </div>
    </div>
</template>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 18px;
    padding-left: 24px;
    box-shadow: 0px 0px 24px #9D9D9D;
    border-radius: 6px;
}

.root--selected {
    height: 128px;
}

.row {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.description {
    max-width: 100px;
    text-align: right;
}

.description__name {
    font-size: 1.5rem;
}

.description__text {
    font-size: 0.75rem;
    color: #9D9D9D;
}
</style>