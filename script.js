document.getElementById('toggleInfo').addEventListener('click', function() {
    var moreInfo = document.getElementById('moreInfo');
    if (moreInfo.classList.contains('hidden')) {
        moreInfo.classList.remove('hidden');
    } else {
        moreInfo.classList.add('hidden');
    }
});

/* result page */


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resultForm');
    const resultDisplay = document.getElementById('resultDisplay');
    const semesterList = document.getElementById('semesterList');

    // Mock data for declared semesters
    const declaredSemesters = ['Semester 1', 'Semester 2'];

    // Update declared semesters list
    declaredSemesters.forEach(semester => {
        const listItem = document.createElement('li');
        listItem.textContent = semester;
        semesterList.appendChild(listItem);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const rollNo = document.getElementById('rollNo').value;
        const semester = document.getElementById('semester').value;

        // Function to simulate fetching the result from a database or API
        const fetchResult = async (rollNo, semester) => {
            // Simulate fetching the result (replace with actual API call)
            if (rollNo === '210954106109' && semester === '2') {
                return {
                    name: 'Vinay',
                    rollNo: '210954106109',
                    semester: '2',
                    marks: {
                        subject1: 85,
                        subject2: 78,
                        subject3: 90,
                        // Add more subjects as needed
                    }
                };
            } else {
                return null;
            }
        };

        try {
            const result = await fetchResult(rollNo, semester);

            if (result) {
                // Display the result
                resultDisplay.innerHTML = `
                    <h3>Result for ${result.name}</h3>
                    <p>Roll No: ${result.rollNo}</p>
                    <p>Semester: ${result.semester}</p>
                    <h4>Marks:</h4>
                    <ul>
                        <li>Subject 1: ${result.marks.subject1}</li>
                        <li>Subject 2: ${result.marks.subject2}</li>
                        <li>Subject 3: ${result.marks.subject3}</li>
                        <!-- Add more subjects as needed -->
                    </ul>
                `;
            } else {
                // Display a message if the entered details do not match
                resultDisplay.innerHTML = 'No result found for the entered details. Please try again.';
            }
        } catch (error) {
            console.error('Error fetching result:', error);
            resultDisplay.innerHTML = 'An error occurred while fetching the result. Please try again later.';
        }
    });
});

/* students section */


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.querySelector('.container');
    const resultList = document.getElementById('resultList');
    const noticeList = document.getElementById('noticeList');
    const errorMessage = document.getElementById('errorMessage');

    // Dummy data for results and notices
    const resultsData = [
        { semester: '1', subject: 'C', marks: '85' },
        { semester: '1', subject: 'Maths', marks: '78' },
        { semester: '2', subject: 'Java', marks: '90' },
        // Add more results as needed
    ];

    const noticesData = [
        { title: 'Exam Schedule', content: 'schedule to be updated soon' },
        { title: 'Holiday Notice', content: 'holiday will be on -' },
        // Add more notices as needed
    ];

    // Function to display results
    const displayResults = () => {
        resultList.innerHTML = '';
        resultsData.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `Semester ${result.semester}: ${result.subject} - ${result.marks}`;
            resultList.appendChild(listItem);
        });
    };

    // Function to display notices
    const displayNotices = () => {
        noticeList.innerHTML = '';
        noticesData.forEach(notice => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${notice.title}</strong>: ${notice.content}`;
            noticeList.appendChild(listItem);
        });
    };

    // Function to authenticate user
    const authenticateUser = (username, password) => {
        return username === 'vinay' && password === '1111';
    };

    // Handle form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (authenticateUser(username, password)) {
            // Store authentication flag in localStorage
            localStorage.setItem('isLoggedIn', 'true');

            // Display dashboard content
            dashboard.style.display = 'block';
            displayResults();
            displayNotices();
        } else {
            // Display error message
            errorMessage.textContent = 'Invalid username or password. Please try again.';
        }
    });

    // Check if user is authenticated
    const isAuthenticated = () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    };

    // Redirect to login page if not authenticated
    if (!isAuthenticated()) {
        dashboard.style.display = 'none';
    } else {
        dashboard.style.display = 'block';
        displayResults();
        displayNotices();
    }

    // Logout functionality
    const logoutLink = document.querySelector('.logout');
    logoutLink.addEventListener('click', () => {
        // Clear authentication flag in localStorage
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'index.html';
    });
});


