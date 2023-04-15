<script setup>
import { useTaxForm, TAX_REGIME } from "@/store/useTaxForm";
import { toCurrency } from "@/utils/format";
import CheckButton from "@/components/CheckButton.vue";

const { form, selectedTaxes, total, reset } = useTaxForm();
const regimeText = {
    [TAX_REGIME.GENERAL]: 'Общий режим',
    [TAX_REGIME.SIMPLIFIED]: 'Упрощенный режим',
}

</script>

<template>
    <main class="view-root">
        <h1 class="view-header">
            Спасибо!
            <br>
            Налоги успешно оплачены!
        </h1>
        <check-button style="margin: 0 auto" size="lg" :checked="true" />

        <table class="form-table">
            <tr>
                <td>Имя</td>
                <td>{{ Boolean(form.name) ? form.name : 'Имя' }}</td>
            </tr>
            <tr>
                <td>Фамилия</td>
                <td>{{ Boolean(form.surname) ? form.surname : 'Фамилия' }}</td>
            </tr>
            <tr>
                <td>ИИН</td>
                <td>{{ Boolean(form.iin) ? form.iin : 'ИИН' }}</td>
            </tr>
            <tr>
                <td>Режим налогооблажения</td>
                <td>{{ regimeText[form.regime] }}</td>
            </tr>
            <tr>
                <td>Ваш доход за полгода</td>
                <td>{{ toCurrency(form.income) }}</td>
            </tr>
            <tr v-for="tax in selectedTaxes" :key="tax.type">
                <td>{{ tax.name }}</td>
                <td>{{ toCurrency(tax.calculate(form.income ?? 0)) }}</td>
            </tr>
        </table>

        <div style="margin: auto 0" class="row">
            <div style="width: 150px">
                <i>Итого оплачено
                за полугодие:</i>
            </div>
            <div>
                <i>{{ toCurrency(total) }}</i>
            </div>
        </div>

        <router-link to="/" class="home-link" @click="reset">Вернуться на главную</router-link>
    </main>
</template>

<style scoped>
.view-root {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 25px;
    height: 100%;
}

.view-header {
    font-size: 2rem;
    line-height: 2.5rem;
    text-align: center;
    font-weight: 400;
    font-style: italic;
}

.form-table {
    font-size: 1rem;
    line-height: 1.5rem;
    font-style: italic;
    border-spacing: 8px;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.home-link {
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-style: italic;
    text-decoration: none;
    text-align: center;
    color: black;
}

.form-table td:last-child {
    text-align: right;
}
</style>