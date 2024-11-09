"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// HTML elements
const form = document.getElementById('resume-form');
const resumeDisplayElement = document.getElementById('resume-display');
const photoInput = document.getElementById('photo');
// Helper function to convert file to Base64
function fileToBase64(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const result = reader.result;
                if (result)
                    resolve(result);
                else
                    reject(new Error("File reading failed"));
            };
            reader.onerror = () => reject(new Error("File could not be read"));
            reader.readAsDataURL(file);
        });
    });
}
// Form submission event listener
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); // Prevent page reload
    // Clear any previous resume content to avoid leftover elements
    resumeDisplayElement.innerHTML = '';
    // Retrieve input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    // Handle photo file input
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    if (photoFile) {
        try {
            // Convert file to Base64 and create image element
            const photoBase64 = yield fileToBase64(photoFile);
            const resumePhoto = document.createElement("img");
            resumePhoto.src = photoBase64;
            resumePhoto.alt = "Uploaded Profile Photo";
            // Apply styling to make it look nice
            resumePhoto.style.width = "150px";
            resumePhoto.style.height = "150px";
            resumePhoto.style.objectFit = "cover";
            resumePhoto.style.borderRadius = "50%";
            resumePhoto.style.margin = "0 auto";
            resumePhoto.style.display = "block";
            // Append the photo to resume display before other details
            resumeDisplayElement.appendChild(resumePhoto);
        }
        catch (error) {
            console.error("Error converting file to Base64", error);
        }
    }
    // Dynamic generation of resume content
    const resumeHTML = `
        <h2><b>Resume</b></h2>
        <h3>Personal Information</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
    `;
    // Append the generated resume HTML content
    resumeDisplayElement.insertAdjacentHTML("beforeend", resumeHTML);
}));
