Vue.createApp({
    data() {
        return {
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
            totalExpenses: 0
        }
    },
    methods: {
        addIncome() {
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
        },
        addIncomeAmounts(income){
            this.totalIncome = income.reduce((accumulator, income) => accumulator + income.incomeAmount, 0);
        },
        addExpense() {
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
        },        
        addExpenseAmounts(expenses) {
            this.totalExpenses = expenses.reduce((accumulator, expense) => accumulator + expense.expenseAmount, 0);
        },
        clearExpenses() {
            this.expenses = [];
            this.totalExpenses = 0;
        },
        clearExpenseAmounts() {
            this.totalExpenses = 0;
        },
        filterExpenses() {

        }
    }
}).mount('#app')