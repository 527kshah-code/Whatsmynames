let age = 0;
let name = "";
let updateMonthLabel = "January";
let qualities = [];

function getyoungestName() {
    if (age > 26) {
        return "hyung/unnie";
    } else {
        return "maknae";
    }
}

function getfirstName() {
    const femaleNames = [ "Kyung-mi", "Ji-woo", "Min-seo", "Su-bin", "Hye-jin", "Ye-jin", "Eun-joo","Sun-hee", "So-ra", "Do-hee", "Jung-hee", "Hye-won", "Seul-gi", "So-yoon", "Yu-na", "Ha-kyung"];
    const maleNames = [ "Seungmin", "Jiwon", "Seungwoo", "Jaehyun", "Kiho", "Jungwoo", "Jihoon", "Eunwoo", "Woojin", "Seungwon", "Taeho", "Kijoon", "Juhyun", "Minhyun", "Jinseok", "Minseok"];
    
    if (name.startsWith("A") || name.startsWith("B") || name.startsWith("C") || name.startsWith("D") || name.startsWith("E") || name.startsWith("F") || name.startsWith("G") || name.startsWith("H") || name.startsWith("I") || name.startsWith("J") || name.startsWith("K") || name.startsWith("L") || name.startsWith("M")) {
        const randomIndex = Math.floor(Math.random() * femaleNames.length);
        return femaleNames[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * maleNames.length);
        return maleNames[randomIndex];
    }
}

function getlastName() {
    const lastNames = ["Kim", "Lee", "Park", "Choi", "Jung", "Kang", "Jo", "Yoon", "Im", "Shin", "Han", "Oh", "Seo", "Hwang", "Song"];
    const randomIndex = Math.floor(Math.random() * lastNames.length);
    return lastNames[randomIndex];
}
 function getGroupRole() {
    const monthIndex = parseInt(updateMonthLabel);
    if (monthIndex >= 1 && monthIndex <= 4) {
        return "Rapper";
    } else if (monthIndex >= 5 && monthIndex <= 8) {
        return "Vocalist";
    } else {
        return "Dancer";
    }
}

function getanimal() {
    if (!qualities || qualities.length === 0) return "Kitty";
    
    const q1 = qualities[0];
    const q2 = qualities[1];
    
    // Check both permutations of the two qualities
    const pair = [q1, q2].sort().join("|");
    
    const animalMap = {
        "confident|energetic": "Tiger",
        "charming|confident": "Lion",
        "confident|hardworking": "Eagle",
        "chaotic|energetic": "Cheetah",
        "kind|soft": "Rabbit",
        "loyal|soft": "Deer",
        "kind|loyal": "Golden Retriever",
        "creative|soft": "Swan",
        "creative|mysterious": "Black Cat",
        "charming|mysterious": "Fox",
        "creative|soft": "Butterfly",
        "loyal|mysterious": "Wolf",
        "chaotic|stupid": "Snake",
        "charming|stupid": "Otter",
        "energetic|stupid": "Puppy",
        "chaotic|charming": "Raccoon",
        "hardworking|loyal": "Horse",
        "hardworking|kind": "Ferret",
        "creative|hardworking": "Quokka"
    };
    
    return animalMap[pair] || "Kitty";
}
function makeName() {
    const answer = getyoungestName() + " " + getfirstName() + " " + getlastName() + ", the " + getGroupRole() + " who's representitive animal is a(n) " + getanimal() + ".";
    return answer;
}

// Event Handlers
function updateMonthLabelHandler(value) {
    updateMonthLabel = value;
}

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const q1 = document.getElementById('q1');
    const q2 = document.getElementById('q2');
    const q3 = document.getElementById('q3');
    const q4 = document.getElementById('q4');
    const generateBtn = document.getElementById('generateBtn');
    const profileNameDisplay = document.getElementById('profileName');
    
    // Update month label handler
    q4.addEventListener('input', function() {
        updateMonthLabel = this.value;
    });
    
    // Handle form submission
    generateBtn.addEventListener('click', function() {
        // Get age from birth date
        const birthDate = new Date(q3.value);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Get name
        name = q2.value.trim();
        if (!name) {
            alert('Please enter your first name');
            return;
        }
        
        // Get selected qualities
        qualities = [];
        const qualityCheckboxes = document.querySelectorAll('.form-check-input:checked');
        qualityCheckboxes.forEach(checkbox => {
            const id = checkbox.id;
            const quality = id.replace('q5_', '');
            qualities.push(quality);
        });
        
        if (qualities.length < 2) {
            alert('Please select 2 qualities');
            return;
        }
        if (qualities.length > 2) {
            qualities = qualities.slice(0, 2);
        }
        
        // Generate and display name
        const generatedName = makeName();
        profileNameDisplay.textContent = generatedName;
    });
});