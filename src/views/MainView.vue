<script setup>
import { ref } from 'vue';
import ModalBackdrop from '@/components/ModalBackdrop.vue';
import FirstStepView from './tax/FirstStepView.vue';
import router from '@/router';

const selected = ref(router.currentRoute.value.query.select);
</script>

<template>
    <main class="main-view" :class="{ 'backdrop--active': selected }">
        <button class="menu-button" @click="() => selected = 'tax'">
            Налоговый вычет
        </button>

        <ModalBackdrop title="Заплатить налоги за ИП" :show="selected === 'tax'" @close="() => selected = ''">
            <first-step-view />
        </ModalBackdrop>
    </main>
</template>

<style scoped>
.main-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    transition: all 200ms ease-in-out;
}

.backdrop--active {
    background-color: rgba(0, 0, 0, 0.25);
    transition: all 200ms ease-in-out;
}

.menu-button {
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0);
    padding: 1rem 2rem;
    border-radius: 6px;
}
</style>