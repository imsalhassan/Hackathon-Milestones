declare const html2pdf: any;

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const resumePhoto = document.getElementById('resumePhoto') as HTMLImageElement; 

form.addEventListener('submit', (event: Event): void => {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const photoInput = document.getElementById('photo') as HTMLInputElement;

    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';
    if (photoFile) {
        const reader = new FileReader();
        reader.onloadend = (): void => {
            photoBase64 = reader.result as string;
            const resumeData = { username, name, email, phone, education, experience, skills, photo: photoBase64 };
            localStorage.setItem(username, JSON.stringify(resumeData));

            generateResume(resumeData);
        };
        reader.readAsDataURL(photoFile);
    } else {
        const resumeData = { username, name, email, phone, education, experience, skills };
        localStorage.setItem(username, JSON.stringify(resumeData));
        generateResume(resumeData);
    }
});

function generateResume(resumeData: { username: string; name: string; email: string; phone: string; education: string; experience: string; skills: string; photo?: string }): void {
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

downloadPdfButton.addEventListener('click', (): void => {
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

window.addEventListener('DOMContentLoaded', (): void => {
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
