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
            monthlyExpenses:0,
        }
    },

    // computed: {
    //     incomeCategoryPay() {
    //         return this.incomePosts.filter(incomePosts => incomePosts.incomeCategory === 'Pay')
    //     }
    // },

    methods: {

        filterByMonth(month) {
           this.filteredPosts = this.expensesPosts.filter(post => post.expenseDate.includes(month))
        //    let expenses = this.monthlyExpenses

           this.filteredPosts.forEach(element => {
            
            this.monthlyExpenses = this.monthlyExpenses + element.expenseAmount;
           });

        //    this.monthlyExpenses = expenses;
        },


        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            let incomeObject = {
                isChecked: false,
                incomeID: this.incomeID,
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
                expenseID: this.expenseID,
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
            fetch('start-data.json')
                .then(response => response.json())
                .then(data => {
                    this.incomePosts = data.incomePosts;
                    this.expensesPosts = data.expensesPosts;
                    // this.incomeID = this.incomeID;
                    this.expenseID = data.expenseID;
                    // this.totalIncome = data.totalIncome;
                    // this.totalExpenses = data.totalExpenses;
                    // this.totalBalance = data.totalBalance;
                    this.calculateIncome(this.incomePosts);
                    this.calculateExpenses(this.expensesPosts);
                    this.incomeID++;
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