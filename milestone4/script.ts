// HTML elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const resumePhoto = document.createElement('img') as HTMLImageElement; // Create image element for photo
const photoInput = document.getElementById('photo') as HTMLInputElement;

// Helper function to convert file to Base64
async function fileToBase64(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            const result = reader.result;
            if (result) resolve(result as string);
            else reject(new Error("File reading failed"));
        };
        reader.onerror = () => reject(new Error("File could not be read"));
        reader.readAsDataURL(file);
    });
}

// Form submission event listener
form.addEventListener('submit', async (event: Event): Promise<void> => {
    event.preventDefault(); // Prevent page reload

    // Retrieve input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Handle photo file input
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';

    if (photoFile) {
        try {
            // Convert file to Base64
            photoBase64 = await fileToBase64(photoFile);
            resumePhoto.src = photoBase64;
            resumePhoto.style.display = 'block'; // Show the image
        } catch (error) {
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

    // Display the generated resume HTML content
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
        resumeDisplayElement.prepend(resumePhoto); // Add photo at the top of the resume

        // Show edit and download buttons
        const editButton = document.getElementById('edit-button') as HTMLButtonElement;
        const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;
        editButton.style.display = 'block';
        downloadButton.style.display = 'block';
    }
});

// Edit Resume button functionality
const editButton = document.getElementById('edit-button') as HTMLButtonElement;
editButton.addEventListener('click', () => {
    // Reset the form fields
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('phone') as HTMLInputElement).value = '';
    (document.getElementById('education') as HTMLTextAreaElement).value = '';
    (document.getElementById('experience') as HTMLTextAreaElement).value = '';
    (document.getElementById('skills') as HTMLTextAreaElement).value = '';

    // Clear the displayed resume
    resumeDisplayElement.innerHTML = ''; // Clears the resume content

    // Hide photo
    resumePhoto.style.display = 'none'; // Hide the photo if there was one

    // Clear the photo input field
    const photoInput = document.getElementById('photo') as HTMLInputElement;
    if (photoInput) {
        photoInput.value = ''; // Reset the file input
    }

    // Hide buttons (edit and download)
    editButton.style.display = 'none'; // Hide edit button
});


