// HTML elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
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
form.addEventListener('submit', async (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Retrieve input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Handle photo file input
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';

    if (photoFile) {
        try {
            // Convert file to Base64 and store in localStorage
            photoBase64 = await fileToBase64(photoFile);
            localStorage.setItem("resumePhoto", photoBase64);

            // Update the `src` attribute of the `resumePhoto` image element
            resumePhoto.src = photoBase64;
        } catch (error) {
            console.error("Error converting file to Base64", error);
        }
    }

    
// CSS styling for the resume photo
resumePhoto.style.width = "150px";
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%"; // Circular image
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";

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
    } else {
        console.error("The resume display element is missing.");
    }
});

