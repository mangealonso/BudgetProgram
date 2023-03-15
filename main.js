Vue.createApp({
    data() {
        return {

            /* selectedOption: '', */

            income: [],
            incomeID: 0,
            incomeText: '',
            incomeCategory: '',
            incomeAmount: '',
            incomeDate: '',
            totalIncome: 0,

            expenses: [],
            expenseID: 0,
            expenseText: '',
            expenseCategory: '',
            expenseDate: '',
            expenseAmount: '',
            totalExpenses: 0,

            totalBalance: 0
        }
    },
    methods: {
        /* budgetPostOption() {
            if (this.selectedOption === 'incomeOption') {
                incomeSection.hidden = false;
            }
            else {
                expenseSection.hidden = false;
            }
        }, */
        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            let incomeObject = {
                incomeID: this.incomeID,
                incomeText: this.incomeText,
                incomeCategory: this.incomeCategory,
                incomeAmount: this.incomeAmount,
                incomeDate: this.incomeDate
            };
            this.income.push(incomeObject);

            this.incomeID++;

            this.incomeText = '',
                this.incomeCategory = '',
                this.incomeAmount = '',
                this.incomeDate = ''

            /* incomeSection.hidden = true; */
        },
        calculateIncome(income) {
            this.totalIncome = income.reduce((accumulator, income) => accumulator + income.incomeAmount, 0);
        },
        addExpensePost() {
            if (this.expenseText.trim() === '' || this.expenseAmount === ''
                || this.expenseCategory === '' || this.expenseDate === '') {
                return;
            }

            let expenseObject = {
                expenseID: this.expenseID,
                expenseText: this.expenseText,
                expenseCategory: this.expenseCategory,
                expenseAmount: this.expenseAmount,
                expenseDate: this.expenseDate,
            };
            this.expenses.push(expenseObject);

            this.expenseID++;

            this.expenseText = '',
                this.expenseCategory = '',
                this.expenseAmount = '',
                this.expenseDate = ''

            /* expenseSection.hidden = true; */
        },
        calculateExpenses(expenses) {
            this.totalExpenses = expenses.reduce((accumulator, expense) => accumulator + expense.expenseAmount, 0);
        },
        calculateBalance(){
            this.totalBalance = this.totalIncome - this.totalExpenses;
        },
        clearExpenses() {
            this.expenses = [];
            this.totalExpenses = 0;
        },
        /* clearExpenseAmounts() {
            this.totalExpenses = 0;
        }, */
        filterExpenses() {

        }
    }
}).mount('#app')