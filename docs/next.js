document.addEventListener('DOMContentLoaded', function() {
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const data = {};
        for (let [key, value] of params.entries()) {
            data[key] = decodeURIComponent(value);
        }
        return data;
    }

    function fillData(data) {
        const basicFields = ['department', 'grade', 'major', 'class', 'name', 'studentId', 'gender', 'ethnicity', 'phone'];
        basicFields.forEach(field => {
            const element = document.getElementById(field);
            if (element && data[field]) {
                element.textContent = data[field];
            }
        });

        const leaveFields = ['leaveType', 'proxyLeave', 'leaveDays', 'parentKnow', 'parentName', 'parentPhone', 'destinationType', 'destination', 'reason'];
        leaveFields.forEach(field => {
            const element = document.getElementById(field);
            if (element && data[field]) {
                element.textContent = data[field];
            }
        });

        const dateFields = ['applyDate', 'startDate', 'endDate'];
        dateFields.forEach(field => {
            const element = document.getElementById(field);
            if (element && data[field]) {
                element.textContent = data[field];
            }
        });

        if (data.department) {
            const counselorDepartment = document.getElementById('counselorDepartment');
            if (counselorDepartment) {
                counselorDepartment.textContent = data.department;
            }
        }
        if (data.counselorName) {
            const counselorNameDisplay = document.getElementById('counselorNameDisplay');
            if (counselorNameDisplay) {
                counselorNameDisplay.textContent = data.counselorName;
            }
        }
        if (data.applyDate) {
            const counselorDate = document.getElementById('counselorDate');
            if (counselorDate) {
                counselorDate.textContent = data.applyDate;
            }
        }
    }

    const backBtn = document.querySelector('.back-icon');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = '/';
        });
    }

    const backBtn2 = document.querySelector('.btn-back');
    if (backBtn2) {
        backBtn2.addEventListener('click', function() {
            window.location.href = '/';
        });
    }

    const urlParams = getUrlParams();
    fillData(urlParams);
});