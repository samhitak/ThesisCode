function saveUserInfoFromForm() {
    var form = document.getElementById('infoform');
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();

        document.getElementById("errorMessage").style.color = "red";
        document.getElementById("errorMessage").innerHTML = "Full name is required.";
    } else {
        var userHash = document.getElementById("nameInput").value.hashCode().toString();
        chrome.storage.sync.set({'userHash': document.getElementById("nameInput").value}, function() {});
    
        var gender = document.getElementById("gender-select").value;
        if (gender.length == 0) {gender = "NULL";}
        chrome.storage.sync.set({'gender': gender}, function() {});

        var language1 = document.getElementById("language1Input").value;
        if (language1.length == 0) {language1 = "NULL";}
        chrome.storage.sync.set({'language1': language1}, function() {});
        var language2 = document.getElementById("language2Input").value;
        if (language2.length == 0) {language2 = "NULL";}
        chrome.storage.sync.set({'language2': language2}, function() {});
        var language3 = document.getElementById("language3Input").value;
        if (language3.length == 0) {language3 = "NULL";}
        chrome.storage.sync.set({'language3': language3}, function() {});
        
        var currentLocation = document.getElementById("currentLocationName").value;
        if (currentLocation.length == 0) {currentLocation = "NULL";}
        chrome.storage.sync.set({'currentLocation': currentLocation}, function() {});
        var hometownLocation = document.getElementById("hometownLocationName").value;
        if (hometownLocation.length == 0) {hometownLocation = "NULL";}
        chrome.storage.sync.set({'hometownLocation': hometownLocation}, function() {});
        var otherLocation1 = document.getElementById("otherLocation1Name").value;
        if (otherLocation1.length == 0) {otherLocation1 = "NULL";}
        chrome.storage.sync.set({'otherLocation1': otherLocation1}, function() {});
        var otherLocation2 = document.getElementById("otherLocation2Name").value;
        if (otherLocation2.length == 0) {otherLocation2 = "NULL";}
        chrome.storage.sync.set({'otherLocation2': otherLocation2}, function() {});
        
        var education1Name = document.getElementById("education1Name").value;
        if (education1Name.length == 0) {education1Name = "NULL";}
        chrome.storage.sync.set({'education1Name': education1Name}, function() {});
        var education1Location = document.getElementById("education1Location").value;
        if (education1Location.length == 0) {education1Location = "NULL";}
        chrome.storage.sync.set({'education1Location': education1Location}, function() {});
        var education2Name = document.getElementById("education2Name").value;
        if (education2Name.length == 0) {education2Name = "NULL";}
        chrome.storage.sync.set({'education2Name': education2Name}, function() {});
        var education2Location = document.getElementById("education2Location").value;
        if (education2Location.length == 0) {education2Location = "NULL";}
        chrome.storage.sync.set({'education2Location': education2Location}, function() {});
        var education3Name = document.getElementById("education3Name").value;
        if (education3Name.length == 0) {education3Name = "NULL";}
        chrome.storage.sync.set({'education3Name': education3Name}, function() {});
        var education3Location = document.getElementById("education3Location").value;
        if (education3Location.length == 0) {education3Location = "NULL";}
        chrome.storage.sync.set({'education3Location': education3Location}, function() {});

        var company1Name = document.getElementById("company1Name").value;
        if (company1Name.length == 0) {company1Name = "NULL";}
        chrome.storage.sync.set({'company1Name': company1Name}, function() {});
        var company1Location = document.getElementById("company1Location").value;
        if (company1Location.length == 0) {company1Location = "NULL";}
        chrome.storage.sync.set({'company1Location': company1Location}, function() {});
        var company1Role = document.getElementById("company1Role").value;
        if (company1Role.length == 0) {company1Role = "NULL";}
        chrome.storage.sync.set({'company1Role': company1Role}, function() {});
        var company2Name = document.getElementById("company2Name").value;
        if (company2Name.length == 0) {company2Name = "NULL";}
        chrome.storage.sync.set({'company2Name': company2Name}, function() {});
        var company2Location = document.getElementById("company2Location").value;
        if (company2Location.length == 0) {company2Location = "NULL";}
        chrome.storage.sync.set({'company2Location': company2Location}, function() {});
        var company2Role = document.getElementById("company2Role").value;
        if (company2Role.length == 0) {company2Role = "NULL";}
        chrome.storage.sync.set({'company2Role': company2Role}, function() {});
        var company3Name = document.getElementById("company3Name").value;
        if (company3Name.length == 0) {company3Name = "NULL";}
        chrome.storage.sync.set({'company3Name': company3Name}, function() {});
        var company3Location = document.getElementById("company3Location").value;
        if (company3Location.length == 0) {company3Location = "NULL";}
        chrome.storage.sync.set({'company3Location': company3Location}, function() {});
        var company3Role = document.getElementById("company3Role").value;
        if (company3Role.length == 0) {company3Role = "NULL";}
        chrome.storage.sync.set({'company3Role': company3Role}, function() {});
        var company4Name = document.getElementById("company4Name").value;
        if (company4Name.length == 0) {company4Name = "NULL";}
        chrome.storage.sync.set({'company4Name': company4Name}, function() {});
        var company4Location = document.getElementById("company4Location").value;
        if (company4Location.length == 0) {company4Location = "NULL";}
        chrome.storage.sync.set({'company4Location': company4Location}, function() {});
        var company4Role = document.getElementById("company4Role").value;
        if (company4Role.length == 0) {company4Role = "NULL";}
        chrome.storage.sync.set({'company4Role': company4Role}, function() {});

        var data = {
            userHash: userHash,
            gender: gender,
            language1: language1,
            language2: language2,
            language3: language3,
            currentLocation: currentLocation,
            hometown: hometownLocation,
            otherLocation1: otherLocation1,
            otherLocation2: otherLocation2,
            education1name: education1Name,
            education1location: education1Location,
            education2name: education2Name,
            education2location: education2Location,
            education3name: education3Name,
            education3location: education3Location,
            work1name: company1Name,
            work1location: company1Location,
            work1role: company1Role,
            work2name: company2Name,
            work2location: company2Location,
            work2role: company2Role,
            work3name: company3Name,
            work3location: company3Location,
            work3role: company3Role,
            work4name: company4Name,
            work4location: company4Location,
            work4role: company4Role
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://42n13klu0d.execute-api.us-east-2.amazonaws.com/test/usersres', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));

        document.getElementById("errorMessage").style.color = "green";
        document.getElementById("errorMessage").innerHTML = "Profile information updated.";
    }
    form.classList.add('was-validated');
    
  }


// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    document.getElementById('saveInfo').addEventListener('click', saveUserInfoFromForm);
    chrome.storage.sync.get(function(items) {
        if (items.userHash) {
            if (items.userHash != 'NULL') {document.getElementById("nameInput").value = items.userHash;}
        }
        if (items.gender) {
            if (items.gender != 'NULL') {document.getElementById("gender-select").value = items.gender;}
        }
        if (items.language1) {
            if (items.language1 != 'NULL') {document.getElementById("language1Input").value = items.language1;}
        }
        if (items.language2) {
            if (items.language2 != 'NULL') {document.getElementById("language2Input").value = items.language2;}
        }
        if (items.language3) {
            if (items.language3 != 'NULL') {document.getElementById("language3Input").value = items.language3;}
        }
        if (items.currentLocation) {
            if (items.currentLocation != 'NULL') {document.getElementById("currentLocationName").value = items.currentLocation;}
        }
        if (items.hometownLocation) {
            if (items.hometownLocation != 'NULL') {document.getElementById("hometownLocationName").value = items.hometownLocation;}
        }
        if (items.otherLocation1) {
            if (items.otherLocation1 != 'NULL') {document.getElementById("otherLocation1Name").value = items.otherLocation1;}
        }
        if (items.otherLocation2) {
            if (items.otherLocation2 != 'NULL') {document.getElementById("otherLocation2Name").value = items.otherLocation2;}
        }
        if (items.education1Name) {
            if (items.education1Name != 'NULL') {document.getElementById("education1Name").value = items.education1Name;}
        }
        if (items.education1Location) {
            if (items.education1Location != 'NULL') {document.getElementById("education1Location").value = items.education1Location;}
        }
        if (items.education2Name) {
            if (items.education2Name != 'NULL') {document.getElementById("education2Name").value = items.education2Name;}
        }
        if (items.education2Location) {
            if (items.education2Location != 'NULL') {document.getElementById("education2Location").value = items.education2Location;}
        }
        if (items.education3Name) {
            if (items.education3Name != 'NULL') {document.getElementById("education3Name").value = items.education3Name;}
        }
        if (items.education3Location) {
            if (items.education3Location != 'NULL') {document.getElementById("education3Location").value = items.education3Location;}
        }
        if (items.company1Name) {
            if (items.company1Name != 'NULL') {document.getElementById("company1Name").value = items.company1Name;}
        }
        if (items.company1Location) {
            if (items.company1Location != 'NULL') {document.getElementById("company1Location").value = items.company1Location;}
        }
        if (items.company1Role) {
            if (items.company1Role != 'NULL') {document.getElementById("company1Role").value = items.company1Role;}
        }
        if (items.company2Name) {
            if (items.company2Name != 'NULL') {document.getElementById("company2Name").value = items.company2Name;}
        }
        if (items.company2Location) {
            if (items.company2Location != 'NULL') {document.getElementById("company2Location").value = items.company2Location;}
        }
        if (items.company2Role) {
            if (items.company2Role != 'NULL') {document.getElementById("company2Role").value = items.company2Role;}
        }
        if (items.company3Name) {
            if (items.company3Name != 'NULL') {document.getElementById("company3Name").value = items.company3Name;}
        }
        if (items.company3Location) {
            if (items.company3Location != 'NULL') {document.getElementById("company3Location").value = items.company3Location;}
        }
        if (items.company3Role) {
            if (items.company3Role != 'NULL') {document.getElementById("company3Role").value = items.company3Role;}
        }
        if (items.company4Name) {
            if (items.company4Name != 'NULL') {document.getElementById("company4Name").value = items.company4Name;}
        }
        if (items.company4Location) {
            if (items.company4Location != 'NULL') {document.getElementById("company4Location").value = items.company4Location;}
        }
        if (items.company4Role) {
            if (items.company4Role != 'NULL') {document.getElementById("company4Role").value = items.company4Role;}
        }
    })
});



// from: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}