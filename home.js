document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const startTimeInput = document.getElementById('startDate');
    const endTimeInput = document.getElementById('endDate');
    const daysContent = document.getElementById('leaveDays');

    function validateAndCalculateDays() {
        if (startTimeInput && endTimeInput && daysContent) {
            if (startTimeInput.value && endTimeInput.value) {
                const start = new Date(startTimeInput.value);
                const end = new Date(endTimeInput.value);
                
                if (end < start) {
                    alert('"结束时间"不能小于"开始时间"！');
                    endTimeInput.value = startTimeInput.value;
                    daysContent.textContent = '1 天';
                    return;
                }
                
                const diffTime = end - start;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                daysContent.textContent = diffDays + " 天";
            } else {
                daysContent.textContent = '';
            }
        }
    }

    if (startTimeInput) {
        startTimeInput.addEventListener('change', validateAndCalculateDays);
    }
    if (endTimeInput) {
        endTimeInput.addEventListener('change', validateAndCalculateDays);
    }

    function getRadioValue(name) {
        const radios = document.querySelectorAll('input[name="' + name + '"]');
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return '';
    }

    function setRadioValue(name, value) {
        const radios = document.querySelectorAll('input[name="' + name + '"]');
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].value === value) {
                radios[i].checked = true;
            }
        }
    }

    function saveFormData() {
        const formData = {
            department: document.getElementById('department')?.value || '',
            grade: document.getElementById('grade')?.value || '',
            major: document.getElementById('major')?.value || '',
            class: document.getElementById('class')?.value || '',
            name: document.getElementById('name')?.value || '',
            studentId: document.getElementById('studentId')?.value || '',
            gender: getRadioValue('gender'),
            ethnicity: document.getElementById('ethnicity')?.value || '',
            applyDate: document.getElementById('applyDate')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            leaveType: getRadioValue('leaveType'),
            proxyLeave: getRadioValue('proxyLeave'),
            startDate: document.getElementById('startDate')?.value || '',
            endDate: document.getElementById('endDate')?.value || '',
            parentKnow: getRadioValue('parentKnow'),
            parentName: document.getElementById('parentName')?.value || '',
            parentPhone: document.getElementById('parentPhone')?.value || '',
            destinationType: document.getElementById('destinationType')?.value || '',
            destination: document.getElementById('destination')?.value || '',
            reason: document.getElementById('reason')?.value || '',
            counselorName: document.getElementById('counselorName')?.value || ''
        };
        localStorage.setItem('leaveFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('leaveFormData');
        if (!savedData) return;
        
        try {
            const formData = JSON.parse(savedData);
            
            const textFields = ['department', 'grade', 'major', 'class', 'name', 'studentId', 'ethnicity', 'applyDate', 'phone', 'parentName', 'parentPhone', 'destination', 'reason', 'counselorName'];
            textFields.forEach(field => {
                const element = document.getElementById(field);
                if (element && formData[field]) {
                    element.value = formData[field];
                }
            });
            
            const radioFields = ['gender', 'leaveType', 'proxyLeave', 'parentKnow'];
            radioFields.forEach(field => {
                if (formData[field]) {
                    setRadioValue(field, formData[field]);
                }
            });
            
            const destinationTypeEl = document.getElementById('destinationType');
            if (destinationTypeEl && formData.destinationType) {
                destinationTypeEl.value = formData.destinationType;
            }
            
            const startDateEl = document.getElementById('startDate');
            const endDateEl = document.getElementById('endDate');
            if (startDateEl && formData.startDate) {
                startDateEl.value = formData.startDate;
            }
            if (endDateEl && formData.endDate) {
                endDateEl.value = formData.endDate;
            }
            
            if (formData.startDate && formData.endDate) {
                validateAndCalculateDays();
            }
        } catch (e) {
            console.error('加载表单数据失败', e);
        }
    }

    const inputElements = document.querySelectorAll('input[type="text"], input[type="date"], select');
    inputElements.forEach(el => {
        if (el.type === 'date') {
            el.addEventListener('change', saveFormData);
        } else {
            el.addEventListener('input', saveFormData);
        }
    });
    
    const radioElements = document.querySelectorAll('input[type="radio"]');
    radioElements.forEach(el => {
        el.addEventListener('change', saveFormData);
    });

    const nextBtn = document.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const formData = {
                department: document.getElementById('department')?.value || '',
                grade: document.getElementById('grade')?.value || '',
                major: document.getElementById('major')?.value || '',
                class: document.getElementById('class')?.value || '',
                name: document.getElementById('name')?.value || '',
                studentId: document.getElementById('studentId')?.value || '',
                gender: getRadioValue('gender'),
                ethnicity: document.getElementById('ethnicity')?.value || '',
                applyDate: document.getElementById('applyDate')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                leaveType: getRadioValue('leaveType'),
                proxyLeave: getRadioValue('proxyLeave'),
                startDate: document.getElementById('startDate')?.value || '',
                endDate: document.getElementById('endDate')?.value || '',
                leaveDays: document.getElementById('leaveDays')?.textContent || '',
                parentKnow: getRadioValue('parentKnow'),
                parentName: document.getElementById('parentName')?.value || '',
                parentPhone: document.getElementById('parentPhone')?.value || '',
                destinationType: document.getElementById('destinationType')?.value || '',
                destination: document.getElementById('destination')?.value || '',
                reason: document.getElementById('reason')?.value || '',
                counselorName: document.getElementById('counselorName')?.value || '',
                counselorOpinion: document.getElementById('counselorOpinion')?.textContent || ''
            };

            const requiredFields = [
                { name: '院系', value: formData.department },
                { name: '年级', value: formData.grade },
                { name: '专业', value: formData.major },
                { name: '班级', value: formData.class },
                { name: '姓名', value: formData.name },
                { name: '学号', value: formData.studentId },
                { name: '性别', value: formData.gender },
                { name: '民族', value: formData.ethnicity },
                { name: '申请日期', value: formData.applyDate },
                { name: '联系方式', value: formData.phone },
                { name: '请假类型', value: formData.leaveType },
                { name: '是否代请假', value: formData.proxyLeave },
                { name: '请假开始时间', value: formData.startDate },
                { name: '请假结束时间', value: formData.endDate },
                { name: '家长是否知晓', value: formData.parentKnow },
                { name: '请假去向类型', value: formData.destinationType },
                { name: '请假去向（具体地点）', value: formData.destination },
                { name: '请假事由', value: formData.reason },
                { name: '辅导员姓名', value: formData.counselorName }
            ];
            let missingFields = [];
            for (let i = 0; i < requiredFields.length; i++) {
                if (!requiredFields[i].value) {
                    missingFields.push(requiredFields[i].name);
                }
            }
            if (missingFields.length > 0) {
                alert('请填写以下必填字段：' + missingFields.join('、'));
                return;
            }

            saveFormData();

            const params = new URLSearchParams();
            for (let key in formData) {
                if (formData[key]) {
                    params.append(key, encodeURIComponent(formData[key]));
                }
            }

            window.location.href = 'next.html?' + params.toString();
        });
    }

    const backBtn = document.querySelector('.back-icon');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }

    loadFormData();
});