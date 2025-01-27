function openPage(url) {
	event.stopPropagation();
    window.location.href = url;
}

function saveProfile(event) {
	event.preventDefault();
    const name = document.getElementById('profile-name').value;
    const biography = document.getElementById('profile-biography').value;
    const dob = document.getElementById('profile-dob').value;
    const gender = document.querySelector('input[name="profile-gender"]:checked');
    const hobbies = Array.from(document.querySelectorAll('input[name="profile-hobbies"]:checked')).map(hobby => hobby.value);
    const color = document.getElementById('profile-color').value;

    let isValid = true;

    document.getElementById('profile-name').style.border = '';
    document.getElementById('profile-dob').style.border = '';
    document.querySelectorAll('input[name="profile-gender"]').forEach(input => input.parentNode.style.border = '');

    if (!name) {
        document.getElementById('profile-name').style.border = '2px solid red';
        isValid = false;
    }
    if (!dob) {
        document.getElementById('profile-dob').style.border = '2px solid red';
        isValid = false;
    }
    if (!gender) {
        document.querySelectorAll('input[name="profile-gender"]').forEach(input => input.parentNode.style.border = '2px solid red');
        isValid = false;
    }

    if (!isValid) {
        alert('Please fill in all the required fields.');
        return;
    }

    const profile = {
        name,
        biography,
        dob,
        gender: gender.value,
        hobbies,
        color
    };

    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));

	window.location.href = `index.html`
}

function editProfile(event) {
	event.preventDefault();
    const name = document.getElementById('profile-name').value;
    const dob = document.getElementById('profile-dob').value;
    const gender = document.querySelector('input[name="profile-gender"]:checked');

    let isValid = true;

    document.getElementById('profile-name').style.border = '';
    document.getElementById('profile-dob').style.border = '';
    document.querySelectorAll('input[name="profile-gender"]').forEach(input => input.parentNode.style.border = '');

    if (!name) {
        document.getElementById('profile-name').style.border = '2px solid red';
        isValid = false;
    }
    if (!dob) {
        document.getElementById('profile-dob').style.border = '2px solid red';
        isValid = false;
    }
    if (!gender) {
        document.querySelectorAll('input[name="profile-gender"]').forEach(input => input.parentNode.style.border = '2px solid red');
        isValid = false;
    }

    if (!isValid) {
        alert('Please fill in all the required fields.');
        return;
    }
	
	const updatedProfile = {
		name: document.getElementById('profile-name').value,
		biography: document.getElementById('profile-biography').value,
		dob: document.getElementById('profile-dob').value,
		gender: document.querySelector('input[name="profile-gender"]:checked')?.value || '',
		hobbies: Array.from(document.querySelectorAll('input[name="profile-hobbies"]:checked')).map(hobby => hobby.value),
		color: document.getElementById('profile-color').value
	};

	profiles[index] = updatedProfile;
	localStorage.setItem('profiles', JSON.stringify(profiles));
	window.location.href = `profile.html?index=${index}`;
}

function loadProfiles() {
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const profileList = document.getElementById('saved-profiles');
	let index = 0

    profiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile-card');
		profileDiv.setAttribute('onclick', `openPage("profile.html?index=${index}")`);
        profileDiv.innerHTML = `
            <div class="profile-image-container" style="position: relative;">
                <img src="${'profile.jpg'}" alt="Profile Image" />
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
					border-radius: 50%;
                    background-color: ${profile.color || 'transparent'};
                    mix-blend-mode: multiply;
                    pointer-events: none;
                "></div>
            </div>
            <span class="profile-name">${profile.name}</span>
			<div class="profile-actions">
                <button class="edit-btn" onclick="openPage('edit-profile.html?index=${index}')">Edit</button>
                <button class="delete-btn" onclick="deleteProfile(${index})">Delete</button>
            </div>
        `;

        profileList.appendChild(profileDiv);
		index = index+1;
    });
}

function deleteProfile(index) {
	event.stopPropagation();
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profiles.splice(index, 1);
    localStorage.setItem('profiles', JSON.stringify(profiles));
	location.reload();
}

function displayProfile(){
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('index');
        const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

        if (index !== null && profiles[index]) {
            const profile = profiles[index];

            document.getElementById('profile-name').textContent = profile.name || 'No name provided';
            document.getElementById('profile-biography').textContent = profile.biography || 'No biography available';
            document.getElementById('profile-dob').textContent = profile.dob || 'No date of birth available';
            document.getElementById('profile-gender').textContent = profile.gender || 'Not specified';
            const hobbiesList = document.getElementById('profile-hobbies').querySelector('ul');
            if (profile.hobbies && profile.hobbies.length > 0) {
                profile.hobbies.forEach(hobby => {
                    const li = document.createElement('li');
                    li.textContent = hobby;
                    hobbiesList.appendChild(li);
                });
            } else {
                hobbiesList.innerHTML = '<li>No hobbies listed</li>';
            }
			document.body.style.backgroundColor = profile.color;
			
        } else {
            alert('Profile not found or invalid index!');
        }
}