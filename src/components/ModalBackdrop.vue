<script setup>
import { watch, ref } from 'vue';
import CloseButton from '../components/CloseButton.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
});
const emit = defineEmits(['close']);

let touchStart = 0;
let touchEnd = 0;
let mouseStart = 0;
let mouseEnd = 0;

const backdrop = ref(null);
const edge = ref(null);

watch(backdrop, value => {
    if (value) {
        value.addEventListener('touchstart', (e) => {
            touchStart = e.changedTouches[0].clientY;
        });

        value.addEventListener('touchend', (e) => {
            touchEnd = e.changedTouches[0].clientY;
            if (touchEnd - touchStart > 100) {
                emit('close')
            }
        });

        value.addEventListener('mouseup', (e) => {
            mouseEnd = e.clientY;
            if (mouseStart > 0 && mouseEnd - mouseStart > 100) {
                emit('close')
            }
            mouseStart = 0;
        });
    }
})

watch(edge, value => {
    if (value) {
        value.addEventListener('mousedown', (e) => {
            mouseStart = e.clientY;
        });
    }
})

</script>

<template>
    <Transition>
        <div v-if="show" class="backdrop">
            <div class="offset"></div>
            <div ref="backdrop" class="body">
                <div ref="edge" class="edge">&nbsp;</div>
                <div class="title">
                    <span>
                        {{ title }}
                    </span>
                    <close-button @click="() => $emit('close')" />
                </div>
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: all 200ms cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateY(800px);
}

.edge {
    width: 32px;
    height: 4px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    cursor: move;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    line-height: 2.5rem;
    cursor: default;
}

.backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}

.body {
    box-sizing: border-box;
    padding: 14px 25px 25px 25px;
    background-color: white;
    height: calc(100% - 40px);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}

.offset {
    height: 40px;
    background-color: rgba(0, 0, 0, 0);
}
</style>