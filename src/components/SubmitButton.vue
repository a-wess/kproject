<template>
    <button class="submit-button">
        <slot></slot>
    </button>
</template>

<style scoped>
.submit-button {
    background-color: #000000;
    color: white;
    font-size: 1.25rem;
    line-height: 1.5rem;
    padding: 16px 20px;
    border-radius: 6px;
    border-width: 0;
    font-style: italic;
}

.submit-button:hover, .submit-button:focus {
    box-shadow: 0px 0px 24px #9D9D9D;
}
</style>