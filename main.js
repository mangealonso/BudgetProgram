Vue.createApp({
    data() {
        return {

            filteredPosts: [],

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

            totalBalance: 0,

            perMonth: '',
            
            monthlyExpenses: 0,

            dataLoaded: false
        }
    },

    computed: {

            // hiddenPerMonth() {
            //   return this.perMonth ? '' : 'hidden';
            // },

        hasIncomePosts() {
            return this.incomePosts.length > 0;
        },

        hasExpensePosts() {
            return this.expensesPosts.length > 0;
        }

        //     incomeCategoryPay() {
        //         return this.incomePosts.filter(incomePosts => incomePosts.incomeCategory === 'Pay')
        //     }
    },

    methods: {

        filterByMonth(month) {
            this.filteredPosts = this.expensesPosts.filter(post => post.expenseDate.includes(month))
            //    let expenses = this.monthlyExpenses

            this.filteredPosts.forEach(element => {

                this.monthlyExpenses = this.monthlyExpenses + element.expenseAmount;
            });

            //    this.monthlyExpenses = expenses;
        },

        // shouldDisplayOption(optionValue) {
        //     if (optionValue === this.perMonth) {
        //         return 'none';
        //     }
        //     else {
        //         return 'block';
        //     }
        //     },


        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            let incomeObject = {
                isChecked: false,
                incomeID: this.incomePosts.length + 1,
                incomeText: this.incomeText,
                incomeCategory: this.incomeCategory,
                incomeAmount: this.incomeAmount,
                incomeDate: this.incomeDate,
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
                expenseID: this.expensesPosts.length + 1,
                expenseText: this.expenseText,
                expenseCategory: this.expenseCategory,
                expenseAmount: this.expenseAmount,
                expenseDate: this.expenseDate,
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
        deleteExpensePost(indexToDelete) {
            this.expensesPosts.splice(indexToDelete, 1)

            this.calculateExpenses(this.expensesPosts)
        },
        deleteIncomePost(indexToDelete) {
            this.incomePosts.splice(indexToDelete, 1)

            this.calculateIncome(this.incomePosts)
        },
        showIncomeDeleteButton(index) {
            return this.incomePosts[index].isChecked;
        },
        showExpenseDeleteButton(index) {
            return this.expensesPosts[index].isChecked;
        },
        fetchData() {
            if (this.dataLoaded) {
                return
            }
            fetch('start-data.json')
                .then(response => response.json())
                .then(data => {
                    this.incomePosts = [...this.incomePosts, ...data.incomePosts];
                    this.expensesPosts = [...this.expensesPosts, ...data.expensesPosts];
                    this.incomeID = this.incomePosts.length;
                    this.expenseID = this.expensesPosts.length;
                    this.calculateIncome(this.incomePosts);
                    this.calculateExpenses(this.expensesPosts);
                    this.dataLoaded = true;
                })
        }
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