<script setup>
import { ref, computed } from "vue";
import { TAX_REGIME, useTaxForm } from '@/store/useTaxForm';
import MoneyInput from "@/components/MoneyInput.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import router from "@/router";

const { form } = useTaxForm();

const touched = ref(false);
const validateIin = computed(() => !touched.value || (form.iin.length === 12 && !isNaN(form.iin)));
const validateIncome = computed(() => !touched.value || form.income > 0 && form.income <= 150000000);

function submit() {
    touched.value = true;
    if (!validateIin.value || !validateIncome.value) return;
    router.push({ name: 'tax-select' });
}

</script>

<template>
    <div class="view-root">
        <p>
            Теперь ИП на упрощенке обязан
            уплачивать за себя ИПН и социальный налог.
            В связи с этими изменениями
            ИП должен платить за себя:
            <br />
            <br />
        </p>

        <form @submit.prevent="submit" class="form">
            <div class="row">
                <div class="col form-group">
                    <label>Имя</label>
                    <input id="tax-form-name" v-model="form.name" placeholder="Имя" class="form-input">
                </div>
                <div class="col form-group">
                    <label>Фамилия</label>
                    <input id="tax-form-surname" v-model="form.surname" placeholder="Фамилия" class="form-input">
                </div>
            </div>

            <div class="form-group">
                <label>ИИН</label>
                <input id="tax-form-iin" v-model="form.iin" placeholder="ИИН" class="form-input"
                    :class="{ 'form-input--error': !validateIin }">
                <span v-if="!validateIin" class="form-text--error">Неккоректный ИИН</span>
            </div>

            <div class="form-group">
                <label>Режим налогообложения</label>
                <select id="tax-form-regime" v-model="form.regime" placeholder="Режим налогообложения" class="form-input">
                    <option :value="TAX_REGIME.SIMPLIFIED">Упрощённый</option>
                    <option :value="TAX_REGIME.GENERAL">Общеустановленный</option>
                </select>
            </div>

            <div class="form-group">
                <label>Ваш доход за пол года</label>
                <money-input v-model="form.income" placeholder="Доход" class="form-input" :class="{ 'form-input--error': !validateIncome }" />
                <span v-if="!validateIncome" class="form-text--error">
                    Доход не может быть равен нулю и не больше 150 000 000
                </span>
            </div>

            <submit-button class="submit-button" type="submit">
                Рассчитать
            </submit-button>
        </form>
    </div>
</template>

<style scoped>
.submit-button {
    margin-top: auto;
    width: 100%;
}

.view-root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 30px;
}

.form-input {
    border-radius: 3px;
    border: 1px solid #DFE3E6;
    font-size: 0.875rem;
    line-height: 1.5rem;
    padding: 7px 10px;
    background-color: white;
}

.form-input--error {
    border: 1px solid red;
}

.form-text--error {
    color: red;
    margin-top: 4px;
}

select.form-input {
    height: 40px;
}

.form-group {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.form-group>label {
    font-size: 1rem;
    line-height: 1.5rem;
    font-style: italic;
    margin-bottom: 10px;
}

.row {
    display: flex;
    margin-right: -12px;
    margin-left: -12px;
    flex-wrap: wrap;
}

.col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding-right: 12px;
    padding-left: 12px;
    width: 50%;
}
</style>