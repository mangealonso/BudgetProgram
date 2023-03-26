Vue.createApp({
    data() {
        return {
            incomePosts: [],
            incomeID: 0,
            incomeText: '',
            incomeCategory: '',
            incomeDate: '',
            incomeAmount: '',

            expensesPosts: [],
            expenseID: 0,
            expenseText: '',
            expenseCategory: '',
            expenseDate: '',
            expenseAmount: '',

            filteredPosts: [],

            totalIncome: 0,
            totalExpenses: 0,
            totalBalance: 0,

            years: [],
            selectedYear: 'Year',
            selectedMonth: 'Month',

            months: [
                { id: 0, label: "January", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 1, label: "February", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 2, label: "March", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 3, label: "April", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 4, label: "May", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 5, label: "June", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 6, label: "July", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 7, label: "August", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 8, label: "September", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 9, label: "October", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 10, label: "November", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 },
                { id: 11, label: "December", monthlyExpense: 0, monthlyBalance: 0, monthlyIncome: 0 }
            ]
            ,
            dataLoaded: false,
        }
    },
    mounted() {
        const incomePostsFromLocalStorage = JSON.parse(localStorage.getItem('incomePosts'));
        const expensesPostsFromLocalStorage = JSON.parse(localStorage.getItem('expensesPosts'));
        const incomeIDFromLocalStorage = JSON.parse(localStorage.getItem('incomeID'));
        const expenseIDFromLocalStorage = JSON.parse(localStorage.getItem('expenseID'));
        const dataloadedFromLocalStorage = JSON.parse(localStorage.getItem('dataLoaded'));
        const yearsFromLocalStorage = JSON.parse(localStorage.getItem('years'));

        if (incomePostsFromLocalStorage) {
            this.incomePosts = incomePostsFromLocalStorage;
        }

        if (expensesPostsFromLocalStorage) {
            this.expensesPosts = expensesPostsFromLocalStorage;
        }

        if (incomeIDFromLocalStorage) {
            this.incomeID = incomeIDFromLocalStorage;
        }

        if (expenseIDFromLocalStorage) {
            this.expenseID = expenseIDFromLocalStorage;
        }

        if (dataloadedFromLocalStorage) {
            this.dataLoaded = dataloadedFromLocalStorage;
        }

        if (yearsFromLocalStorage) {
            this.years = yearsFromLocalStorage;
        }

        this.calculateIncome(this.incomePosts);
        this.calculateExpenses(this.expensesPosts);
    },
    computed: {
        hasIncomePosts() {
            return this.incomePosts.length > 0;
        },
        hasExpensesPosts() {
            return this.expensesPosts.length > 0;
        },
        hasIncomeOrExpensesPosts() {
            return this.incomePosts.length > 0 || this.expensesPosts.length > 0;
        },
        selectedMonthExpenses() {
            const selectedMonth = this.months.find(
                month => month.label === this.selectedMonth
            );
            return selectedMonth ? selectedMonth.monthlyExpense : '';
        }
    },
    methods: {
        saveToLocalStorage() {
            localStorage.setItem('incomePosts', JSON.stringify(this.incomePosts));
            localStorage.setItem('expensesPosts', JSON.stringify(this.expensesPosts));
            localStorage.setItem('incomeID', JSON.stringify(this.incomeID));
            localStorage.setItem('expenseID', JSON.stringify(this.expenseID));
            localStorage.setItem('dataLoaded', JSON.stringify(this.dataLoaded));
            localStorage.setItem('years', JSON.stringify(this.years));
        },
        checkForFutureDate(date) {
            const today = new Date().toLocaleDateString();
            const inputDate = new Date(date).toLocaleDateString();

            return inputDate > today;
        },
        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            if (this.checkForFutureDate(this.incomeDate)) {
                alert("Please enter a date that is not in the future.");
                return;
            }

            let incomeObject = {
                incomeText: this.incomeText,
                incomeCategory: this.incomeCategory,
                incomeAmount: this.incomeAmount,
                incomeDate: this.incomeDate,
                isChecked: false,
                incomeID: this.incomeID
            };
            this.incomePosts.push(incomeObject);

            this.sortIncomePosts();

            this.incomeID++;

            this.incomeText = '',
                this.incomeCategory = '',
                this.incomeAmount = '',
                this.incomeDate = ''

            this.calculateIncome(this.incomePosts);
            this.updateMonthlyData();

            this.updateYear(incomeObject, undefined)
            this.saveToLocalStorage();
        },
        addExpensePost() {
            if (this.expenseText.trim() === '' || this.expenseAmount === ''
                || this.expenseCategory === '' || this.expenseDate === '') {
                return;
            }

            if (this.checkForFutureDate(this.expenseDate)) {
                alert("Please enter a date that is not in the future.");
                return;
            }

            let expenseObject = {
                expenseText: this.expenseText,
                expenseCategory: this.expenseCategory,
                expenseAmount: this.expenseAmount,
                expenseDate: this.expenseDate,
                isChecked: false,
                expenseID: this.expenseID
            };
            this.expensesPosts.push(expenseObject);

            this.sortExpensesPosts();

            this.expenseID++;

            this.expenseText = '',
                this.expenseCategory = '',
                this.expenseAmount = '',
                this.expenseDate = ''

            this.calculateExpenses(this.expensesPosts);            
            this.updateMonthlyData();

            this.updateYear(undefined, expenseObject);
            this.saveToLocalStorage();
        },
        sortIncomePosts() {
            this.incomePosts.sort((a, b) => new Date(b.incomeDate) - new Date(a.incomeDate));
        },
        sortExpensesPosts() {
            this.expensesPosts.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));
        },
        //Add year to option-list (year-dropdown)
        updateYear(incomeObject = {}, expenseObject = {}) {

            let temporaryYear = '';

            if ("incomeDate" in incomeObject) {
                temporaryYear = new Date(incomeObject.incomeDate).toLocaleString('default', { year: 'numeric' });
            }
            else if ("expenseDate" in expenseObject) {
                temporaryYear = new Date(expenseObject.expenseDate).toLocaleString('default', { year: 'numeric' });
            }

            let yearObject = {
                label: temporaryYear
            };

            const yearExists = this.years.some((year) => year.label === temporaryYear);
            if (!yearExists) {
                this.years.push(yearObject)
            }

            this.saveToLocalStorage();
        },
        //find the id of the month based on to toLocaleString()
        findMonthIdFromMonthString(MonthString) {
            let monthId = '';

            if (MonthString === "January" || MonthString === "januari") {
                monthId = 0;
            }
            else if (MonthString === "February" || MonthString === "februari") {
                monthId = 1;
            }
            else if (MonthString === "March" || MonthString === "mars") {
                monthId = 2;
            }
            else if (MonthString === "April" || MonthString === "april") {
                monthId = 3;
            }
            else if (MonthString === "May" || MonthString === "maj") {
                monthId = 4;
            }
            else if (MonthString === "June" || MonthString === "juni") {
                monthId = 5;
            }
            else if (MonthString === "July" || MonthString === "juli") {
                monthId = 6;
            }
            else if (MonthString === "August" || MonthString === "augusti") {
                monthId = 7;
            }
            else if (MonthString === "September" || MonthString === "september") {
                monthId = 8;
            }
            else if (MonthString === "October" || MonthString === "oktober") {
                monthId = 9;
            }
            else if (MonthString === "November" || MonthString === "november") {
                monthId = 10;
            }
            else if (MonthString === "December" || MonthString === "december") {
                monthId = 11;
            }
            return monthId;
        },
        //is called each time you switch year in year-dropdown
        computeMonthlySummary() {
            //set all of the actual months expenses to 0 each time method is called
            if (this.selectedYear !== 'Year') {
                this.months.forEach(month => {
                    month.monthlyExpense = 0;
                    month.monthlyIncome = 0;
                    month.monthlyBalance = 0;
                })

                let currentYear = this.selectedYear;
                let year = '';

                let expensesMonthId = '';
                // get year and month from each expense and add to the actual months expenses
                this.expensesPosts.forEach(post => {
                    year = new Date(post.expenseDate).toLocaleString('default', { year: 'numeric' });

                    if (year === currentYear) {
                        const expensesMonthString = new Date(post.expenseDate).toLocaleString('default', { month: 'long' });

                        //get the month-id from the actual expense
                        expensesMonthId = this.findMonthIdFromMonthString(expensesMonthString);

                        this.months[expensesMonthId].monthlyExpense += post.expenseAmount;
                    }
                })

                let incomeMonthId = '';
                //  get year and month from each income and add to the actual months income
                this.incomePosts.forEach(post => {
                    year = new Date(post.incomeDate).toLocaleString('default', { year: 'numeric' });

                    if (year === currentYear) {
                        const incomeMonthString = new Date(post.incomeDate).toLocaleString('default', { month: 'long' });

                        //get the month-id from the actual income
                        incomeMonthId = this.findMonthIdFromMonthString(incomeMonthString);

                        this.months[incomeMonthId].monthlyIncome += post.incomeAmount;
                    }
                })
                //calculate balance for each month
                this.months.forEach(post => {
                    post.monthlyBalance = post.monthlyIncome - post.monthlyExpense;
                })
            }
        },
        //calculate total income
        calculateIncome(incomePosts) {
            this.totalIncome = incomePosts.reduce((accumulator, incomePost) => accumulator + incomePost.incomeAmount, 0);

            this.calculateBalance();
            this.saveToLocalStorage();
        },
        //calculate total expenses
        calculateExpenses(expensesPosts) {
            this.totalExpenses = expensesPosts.reduce((accumulator, expensesPost) => accumulator + expensesPost.expenseAmount, 0);

            this.calculateBalance();
            this.saveToLocalStorage();
        },
        //calculate the total balance
        calculateBalance() {
            this.totalBalance = this.totalIncome - this.totalExpenses;

            this.saveToLocalStorage();
        },
        //will run when "delete all income posts" is clicked
        clearIncomePosts() {
            this.incomePosts = [];
            this.incomeID = 0;
            this.totalIncome = 0;

            this.clearBalance();

            this.years.forEach((year, index) => {
                const matchFound = this.expensesPosts.some(post => post.expenseDate.slice(0, 4) === year.label);

                if (!matchFound) {
                    // If no match found, remove the object from years
                    this.years.splice(index, 1);
                }
            });

            this.updateAllMonthlyData();
            this.saveToLocalStorage();
        },
        //will run when "delete all expense posts" is clicked
        clearExpensesPosts() {
            this.expensesPosts = [];
            this.expenseID = 0;
            this.totalExpenses = 0;

            this.clearBalance();

            this.years.forEach((year, index) => {
                const matchFound = this.incomePosts.some(post => post.incomeDate.slice(0, 4) === year.label);

                if (!matchFound) {
                    // If no match found, remove the object from years
                    this.years.splice(index, 1);
                }
            });

            this.updateAllMonthlyData();
            this.saveToLocalStorage();
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

            this.checkDataLoaded();
            this.saveToLocalStorage();
        },
        checkDataLoaded() {
            if (this.incomePosts.length === 0 && this.expensesPosts.length === 0 && this.dataLoaded === true) {
                this.dataLoaded = false;

                this.saveToLocalStorage();
            }
            else {
                return
            }
        },
        deleteExpensePost(indexToDelete) {
            let thisPost = this.expensesPosts[indexToDelete];
            const currentYear = new Date(thisPost.expenseDate).toLocaleString('default', { year: 'numeric' });

            this.expensesPosts.splice(indexToDelete, 1);

            this.calculateExpenses(this.expensesPosts);

            this.checkRemoveYear(currentYear);

            this.updateMonthlyData();

            this.saveToLocalStorage();
        },
        deleteIncomePost(indexToDelete) {
            let thisPost = this.incomePosts[indexToDelete];
            const currentYear = new Date(thisPost.incomeDate).toLocaleString('default', { year: 'numeric' });

            this.incomePosts.splice(indexToDelete, 1);

            this.calculateIncome(this.incomePosts);

            this.checkRemoveYear(currentYear);

            this.updateMonthlyData();

            this.saveToLocalStorage();
        },
        //check if year needs to be removed from dropdown when you delete a single post
        checkRemoveYear(currentYear) {
            let counter = 0

            if (this.expensesPosts.length !== 0) {
                this.expensesPosts.forEach(post => {
                    const year = new Date(post.expenseDate).toLocaleString('default', { year: 'numeric' });

                    if (year === currentYear) {

                        counter++;
                    }
                })
            }

            if (this.incomePosts.length !== 0) {
                this.incomePosts.forEach(post => {
                    const year = new Date(post.incomeDate).toLocaleString('default', { year: 'numeric' });

                    if (year === currentYear) {

                        counter++;
                    }
                })
            }

            if (counter === 0) {
                this.years = this.years.filter(obj => obj.label !== currentYear);
            }
        },
        updateMonthlyData() {
            this.computeMonthlySummary();
            this.filteredPosts = this.selectedMonth === 'Month' ? [] : this.getFilteredPosts();
        },
        updateAllMonthlyData() {
            this.computeMonthlySummary();
            this.filteredPosts = this.selectedMonth === 'Month' ? [] : this.getFilteredPosts();
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
            else{
                return;
            }
        },
        fetchData() {
            fetch('start-data.json')
                .then(response => response.json())
                .then(data => {
                    data.incomePosts.forEach(post => {
                        post.isChecked = false;
                        post.incomeID = this.incomeID++;
                        this.incomePosts.push(post);
                    });

                    data.expensesPosts.forEach(post => {
                        post.isChecked = false;
                        post.expenseID = this.expenseID++;
                        this.expensesPosts.push(post);
                    });

                    this.sortIncomePosts();
                    this.sortExpensesPosts();

                    this.calculateIncome(this.incomePosts);
                    this.calculateExpenses(this.expensesPosts);

                    this.incomePosts.forEach(incomePost => {
                        this.updateYear(incomePost, undefined)
                    });

                    this.expensesPosts.forEach(expensesPost => {
                        this.updateYear(undefined, expensesPost)
                    });

                    this.dataLoaded = true;

                    this.saveToLocalStorage();
                })
        }
    }
}).mount('#app')