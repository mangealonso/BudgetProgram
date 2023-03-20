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
            monthlyIncome: {},

            expensesPosts: [],
            expenseID: 0,
            expenseText: '',
            expenseCategory: '',
            expenseDate: '',
            expenseAmount: '',
            totalExpenses: 0,

            months: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],

            dropDownOptions: [],
            filteredByMonth: [],
            filterMonthlyExpenses: [],
            monthsWithExpenses: [],
            newFilter: [],

            yearAndMonth: '',

            totalBalance: 0,

            perMonth: '',

            monthlyExpenses: 0,
            someStuffExpenses: 0,

            dataLoaded: false,

            picked: 'Year',
            expensesHidden: true
        }
    },

    mounted() {
        const incomePostsFromLocalStorage = JSON.parse(localStorage.getItem('incomePosts'));
        const expensesPostsFromLocalStorage = JSON.parse(localStorage.getItem('expensesPosts'));
        const dataloadedFromLocalStorage = localStorage.getItem('dataLoaded');

        if (incomePostsFromLocalStorage) {
            this.incomePosts = incomePostsFromLocalStorage;
        }

        if (expensesPostsFromLocalStorage) {
            this.expensesPosts = expensesPostsFromLocalStorage;
        }

        if (dataloadedFromLocalStorage) {
            this.dataLoaded = JSON.parse(dataloadedFromLocalStorage);
        }

        this.calculateIncome(this.incomePosts);
        this.calculateExpenses(this.expensesPosts);
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
        toggleExpenses() {

            this.expensesHidden = !this.expensesHidden;
        },
        saveToLocalStorage() {
            localStorage.setItem('incomePosts', JSON.stringify(this.incomePosts));
            localStorage.setItem('expensesPosts', JSON.stringify(this.expensesPosts));
            localStorage.setItem('dataLoaded', JSON.stringify(this.dataLoaded));
        },
        filterByMonth(month) {

            this.filteredByMonth = [];

            if (month != '') {

                let monthToCheck = month.slice(0, -5);

                for (i = 0; i < this.expensesPosts.length; i++) {
                    const d = new Date(this.expensesPosts[i].expenseDate);
                    let test = this.months[d.getMonth()];

                    if (test === monthToCheck) {
                        this.filteredByMonth.push(this.expensesPosts[i]);
                    }
                }

                // if (month != '') {
                //     this.filteredPosts = this.expensesPosts.filter(post => post.expenseDate.includes(month))
                //     //    let expenses = this.monthlyExpenses
                // }

                // else {
                //     this.filteredPosts = []
                // }

            }

            this.monthlyExpenses = 0;

            this.filteredByMonth.forEach(element => {

                this.monthlyExpenses = this.monthlyExpenses + element.expenseAmount;
            });

            //    this.monthlyExpenses = expenses;
        },
        filterByMonthForOptions(month) {
            //TESTING SOME CODE HERE
            this.newFilter = []

            this.someStuffExpenses = 0;

            for (i = 0; i < this.expensesPosts.length; i++) {

                const d = new Date(this.expensesPosts[i].expenseDate);
                let test = this.months[d.getMonth()];
                let amount = this.expensesPosts[i].expenseAmount

                if (test === month.slice(0, -5)) {


                    //DET ÄR DESSA TVÅ SOM TRIGGAR INFINIT LOOP
                    // this.newFilter.push(this.expensesPosts[i]);
                    // this.someStuffExpenses = this.someStuffExpenses + this.expensesPosts[i].expenseAmount;
                }
            }

            // this.getMonthlyExpenses(this.newFilter);
        },
        getMonthlyExpenses(arrayOfPosts) {

            this.monthlyExpenses = 0;

            arrayOfPosts.forEach(element => {

                this.monthlyExpenses = this.monthlyExpenses + element.expenseAmount;
            });
        },
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

            this.saveToLocalStorage();
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

            this.saveToLocalStorage();

            this.checkDropDownObject(expenseObject)

            this.checkMonthsWithExpenses(expenseObject);

        },
        checkMonthsWithExpenses(object) {

            const dd = new Date(object.expenseDate);

            const currentExpenseMonth = this.months[dd.getMonth()];

            let monthsWithExpensesObject = {
                label: currentExpenseMonth
            }

            let alreadyAdded = false;
            for (let i = 0; i < this.monthsWithExpenses.length; i++) {
                if (monthsWithExpensesObject.label === this.monthsWithExpenses[i].label) {
                    alreadyAdded = true;
                    break;
                }
            }

            if (!alreadyAdded) {
                this.monthsWithExpenses.push(monthsWithExpensesObject);
            }
            // if (!this.monthsWithExpenses.some(option =>
            //     option.label === this.monthsWithExpenses.label)) {
            //     this.monthsWithExpenses.push(monthsWithExpensesObject);
            // }
        },
        checkDropDownObject(object) {

            const d = new Date(object.expenseDate);

            let currentExpenseMonth = this.months[d.getMonth()];
            let currentExpenseYear = d.getFullYear().toString();
            this.yearAndMonth = currentExpenseMonth + ' ' + currentExpenseYear;

            let dropDownObject = {
                label: this.yearAndMonth,
                value: this.yearAndMonth
            }

            if (!this.dropDownOptions.some(option =>
                option.value === dropDownObject.value)) {
                this.dropDownOptions.push(dropDownObject);
            }
            // Nedan har jag algt till för att den månatliga sammanfattningen ska uppdateras i realtid. 
            this.filterByMonth(this.perMonth);
        },
        calculateIncome(incomePosts) {
            const monthlyIncome = {};

            incomePosts.forEach(post => {
                const month = new Date(post.incomeDate).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!monthlyIncome[month]) {
                    monthlyIncome[month] = 0;
                }
                monthlyIncome[month] += parseFloat(post.incomeAmount);
            });

            this.totalIncome = Object.values(monthlyIncome).reduce((acc, income) => acc + income, 0);

            //this.totalIncome = incomePosts.reduce((accumulator, incomePosts) => accumulator + incomePosts.incomeAmount, 0);

            this.monthlyIncome = monthlyIncome;
            
            this.saveToLocalStorage();

            this.calculateBalance();

            return monthlyIncome;
        },
        calculateExpenses(expensesPosts) {
            this.totalExpenses = expensesPosts.reduce((accumulator, expense) => accumulator + expense.expenseAmount, 0);

            this.saveToLocalStorage();

            this.calculateBalance();
        },
        calculateBalance() {
            this.totalBalance = this.totalIncome - this.totalExpenses;

            this.saveToLocalStorage();
        },
        clearIncomePosts() {
            this.incomePosts = [];
            this.monthlyIncome = {};
            this.incomeID = 0;
            this.totalIncome = 0;

            this.saveToLocalStorage();

            this.clearBalance();
        },
        clearExpensesPosts() {
            this.expensesPosts = [];
            this.expenseID = 0;
            this.totalExpenses = 0;

            this.saveToLocalStorage();

            this.clearBalance();
        },
        clearBalance() {
            if (this.incomePosts.length === 0) {
                this.totalBalance = - this.totalExpenses;
            }
            else if (this.expensesPosts.length === 0) {
                this.totalBalance = this.totalIncome;
            }
            else {
                this.totalBalance = 0;
            }

            this.saveToLocalStorage();

            this.checkDataLoaded();
        },
        checkDataLoaded() {
            if (this.incomePosts.length === 0 && this.expensesPosts.length === 0 && this.dataLoaded === true) {
                this.clearDataLoaded();
            }
            else {
                return
            }
        },
        clearDataLoaded() {
            this.dataLoaded = false;

            this.saveToLocalStorage();
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
        loadFetchData() {
            if (!this.dataLoaded) {
                this.fetchData();
            }
        },
        fetchData() {
            fetch('start-data.json')
                .then(response => response.json())
                .then(data => {
                    this.incomePosts = [...this.incomePosts, ...data.incomePosts];
                    this.expensesPosts = [...this.expensesPosts, ...data.expensesPosts];
                    this.incomeID = this.incomePosts.length;
                    this.expenseID = this.expensesPosts.length;
                    this.calculateIncome(this.incomePosts);
                    this.calculateExpenses(this.expensesPosts);

                    this.expensesPosts.forEach(expensesPost => {
                        this.checkDropDownObject(expensesPost);
                        this.checkMonthsWithExpenses(expensesPost);
                    });

                    this.dataLoaded = true;

                    this.saveToLocalStorage();
                })
        }
    }
}).mount('#app')