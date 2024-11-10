"use strict";
const form = document.getElementById('resume-form');
const resumeDisplayElement = document.getElementById('resume-display');
const shareableLinkContainer = document.getElementById('shareable-link-container');
const shareableLinkElement = document.getElementById('shareable-link');
const downloadPdfButton = document.getElementById('download-pdf');
const resumePhoto = document.getElementById('resumePhoto');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';
    if (photoFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            photoBase64 = reader.result;
            const resumeData = { username, name, email, phone, education, experience, skills, photo: photoBase64 };
            localStorage.setItem(username, JSON.stringify(resumeData));
            generateResume(resumeData);
        };
        reader.readAsDataURL(photoFile);
    }
    else {
        const resumeData = { username, name, email, phone, education, experience, skills };
        localStorage.setItem(username, JSON.stringify(resumeData));
        generateResume(resumeData);
    }
});
function generateResume(resumeData) {
    const resumeHTML = `
    <h2>Shareable Resume Builder</h2>
    ${resumeData.photo ? `<img src="${resumeData.photo}" alt="Resume Photo" class="resume-photo" />` : ''}
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
    <p><b>Phone:</b> <span contenteditable="true">${resumeData.phone}</span></p>
    <h3>Education</h3>
    <p contenteditable="true">${resumeData.education}</p>
    <h3>Experience</h3>
    <p contenteditable="true">${resumeData.experience}</p>
    <h3>Skills</h3>
    <p contenteditable="true">${resumeData.skills}</p>
    `;
    resumeDisplayElement.innerHTML = resumeHTML;
    const shareableURL = `${window.location.href.split('?')[0]}?username=${encodeURIComponent(resumeData.username)}`;
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
}
downloadPdfButton.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }
    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf()
        .from(resumeDisplayElement)
        .set(resumeOptions)
        .save();
});
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            generateResume(resumeData);
        }
    }
});
