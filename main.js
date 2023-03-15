Vue.createApp({
    data() {
        return {
            incomePosts: [],
            incomeID: 0,
            incomeText: '',
            incomeCategory: '',
            incomeAmount: '',
            incomeDate: '',
            totalIncome: 0,

            expensesPosts: [],
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
        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            let incomeObject = {
                isChecked: false,
                hasCheckbox: true,
                incomeID: this.incomeID,
                incomeText: this.incomeText,
                incomeCategory: this.incomeCategory,
                incomeAmount: this.incomeAmount,
                incomeDate: this.incomeDate,
                hasButton: false
            };
            this.incomePosts.push(incomeObject);

            this.incomeID++;

            this.incomeText = '',
                this.incomeCategory = '',
                this.incomeAmount = '',
                this.incomeDate = ''

            this.calculateIncome(this.incomePosts);
        },
        addExpensePost() {
            if (this.expenseText.trim() === '' || this.expenseAmount === ''
                || this.expenseCategory === '' || this.expenseDate === '') {
                return;
            }

            let expenseObject = {
                isChecked: false,
                hasCheckbox: true,
                expenseID: this.expenseID,
                expenseText: this.expenseText,
                expenseCategory: this.expenseCategory,
                expenseAmount: this.expenseAmount,
                expenseDate: this.expenseDate,
                hasButton: false
            };
            this.expensesPosts.push(expenseObject);

            this.expenseID++;

            this.expenseText = '',
                this.expenseCategory = '',
                this.expenseAmount = '',
                this.expenseDate = ''

            this.calculateExpenses(this.expensesPosts);
        },
        calculateIncome(incomePosts) {
            this.totalIncome = incomePosts.reduce((accumulator, incomePosts) => accumulator + incomePosts.incomeAmount, 0);

            this.calculateBalance();
        },        
        calculateExpenses(expensesPosts) {
            this.totalExpenses = expensesPosts.reduce((accumulator, expense) => accumulator + expense.expenseAmount, 0);

            this.calculateBalance();
        },
        calculateBalance() {
            this.totalBalance = this.totalIncome - this.totalExpenses;
        },
        deletePost(){
            
        },
        /* clearExpenses() {
            this.expensesPosts = [];
            this.totalExpenses = 0;
        }, */
        /* clearExpenseAmounts() {
            this.totalExpenses = 0;
        }, */
        /* filterExpenses() {

        } */
    }
}).mount('#app')