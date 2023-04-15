import { reactive, ref, computed } from 'vue'

export const TAX_REGIME = {
    GENERAL: 'GENERAL',
    SIMPLIFIED: 'SIMPLIFIED',
}

export const TAXES = [
    {
        name: "ИПН",
        type: "ipn",
        text: '(3% от дохода)',
        calculate: (income) => income * 0.03,
    },
    {
        name: 'СО',
        type: 'so',
        text: '(3,5% от дохода, но не меньше 5 000  ₸)',
        calculate: (income) => Math.max(income * 0.035, 5000),
    },
    {
        name: 'ОПВ',
        type: 'opv',
        text: '(10% от дохода)',
        calculate: (income) => income * 0.1,
    },
    {
        name: 'ВОСМС',
        type: 'vosms',
        text: '(5% от дохода)',
        calculate: (income) => income * 0.05,
    }
];

const form = reactive({});
const selectedTaxes = ref([]);

export function useTaxForm() {
    const initialState = {
        income: 0,
        iin: '',
        name: '',
        surname: '',
        regime: TAX_REGIME.GENERAL,
    };

    function reset() {
        Object.assign(form, initialState);
        selectedTaxes.value = [];
    }

    if (Object.keys(form).length === 0) reset();

    function selectTax(type) {
        const tax = TAXES.find(tax => tax.type === type);
        if (!tax) return;

        selectedTaxes.value.push(tax);
    }

    function deselectTax(type) {
        selectedTaxes.value = selectedTaxes.value.filter(tax => tax.type !== type);
    }

    function hasSelected(type) {
        return selectedTaxes.value.some(tax => tax.type === type);
    }

    const total = computed(() => {
        return selectedTaxes.value.reduce((acc, tax) => {
            return acc + tax.calculate(form.income);
        }, 0);
    });

    return {
        form,
        reset,
        selectedTaxes,
        selectTax,
        deselectTax,
        hasSelected,
        total,
    }
}