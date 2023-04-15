<script setup>
import { useTaxForm, TAXES } from "@/store/useTaxForm";
import { toCurrency } from "@/utils/format";
import TaxCard from "@/components/TaxCard.vue";
import BackButton from "@/components/BackButton.vue";
import SubmitButton from '@/components/SubmitButton.vue';

const { form, selectedTaxes, selectTax, deselectTax, hasSelected, total } = useTaxForm();
</script>

<template>
    <main class="view-container">
        <div class="header">
            <router-link to="/?select=tax">
                <back-button />
            </router-link>
            <span class="text-large">Заплатить налоги за ИП</span>
        </div>

        <div class="row">
            <div style="width: 200px" class="text-large">
                Ваш доход за полугодие:
            </div>
            <div class="text-large">
                {{ toCurrency(form.income) }}
            </div>
        </div>

        <div class="tax-card-container">
            <TaxCard v-for="tax in TAXES" :key="tax.type" :tax="tax" :value="tax.calculate(form.income ?? 0)"
                :selected="hasSelected(tax.type)"
                @select="(value) => value ? selectTax(tax.type) : deselectTax(tax.type)" />
        </div>

        <div style="margin-top: auto; padding-top: 32px">
            <div class="row">
                <div style="width: 200px" class="text-large">
                    Итого к оплате за полугодие:
                </div>
                <div class="text-large">
                    {{ toCurrency(total) }}
                </div>
            </div>

            <router-link v-if="selectedTaxes.length > 0" to="tax-success">
                <submit-button class="submit-button">
                    Оплатить
                </submit-button>
            </router-link>
        </div>
    </main>
</template>

<style scoped>
.view-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 25px;
    height: 100%;
}

.tax-card-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 32px;
}

.header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
}

.text-large {
    font-size: 1.5rem;
    font-style: italic;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.submit-button {
    width: 100%;
    margin-top: 32px;
}
</style>